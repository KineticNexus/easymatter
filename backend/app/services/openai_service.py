import os
import json
from typing import List, Dict, Any, Optional
import openai
from openai import OpenAI

from app.models.chat import (
    ChatMessage,
    ChatHistory,
    AssistantResponse,
    PropertyInterpretation,
    ChatToMatterGenResponse
)


class OpenAIService:
    """Service for interacting with OpenAI API"""
    
    def __init__(self, api_key: str, model: str = "gpt-4o"):
        """Initialize the OpenAI service"""
        self.api_key = api_key
        self.model = model
        self.client = OpenAI(api_key=api_key)
    
    async def process_query(self, query: str, context: Optional[Dict[str, Any]] = None) -> AssistantResponse:
        """Process a user query and return a response"""
        messages = [
            {"role": "system", "content": self._get_system_prompt(context)},
            {"role": "user", "content": query}
        ]
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.7,
            )
            
            assistant_message = response.choices[0].message.content
            
            # Check if we need to extract MatterGen parameters
            mattergen_params = None
            interpretations = None
            
            if context and context.get("extract_params", False):
                # Additional call to extract structured parameters
                extraction_messages = messages + [
                    {"role": "assistant", "content": assistant_message},
                    {"role": "user", "content": "Based on our conversation, extract the material properties and parameters that should be used for MatterGen. Return as JSON with 'mattergen_params' and 'interpretations' fields."}
                ]
                
                extraction_response = self.client.chat.completions.create(
                    model=self.model,
                    messages=extraction_messages,
                    temperature=0.2,
                    response_format={"type": "json_object"}
                )
                
                try:
                    extracted_content = json.loads(extraction_response.choices[0].message.content)
                    mattergen_params = extracted_content.get("mattergen_params")
                    
                    # Convert interpretations to PropertyInterpretation objects
                    if "interpretations" in extracted_content:
                        interpretations = [
                            PropertyInterpretation(**interp) 
                            for interp in extracted_content.get("interpretations", [])
                        ]
                except json.JSONDecodeError:
                    # If parsing fails, just continue without the structured data
                    pass
            
            return AssistantResponse(
                text=assistant_message,
                interpretations=interpretations,
                mattergen_params=mattergen_params
            )
        
        except Exception as e:
            # Handle errors (log them, etc.)
            raise Exception(f"Error calling OpenAI API: {str(e)}")
    
    async def interpret_chat_for_mattergen(
        self, 
        chat_history: ChatHistory,
        current_goal: str,
        current_property: str
    ) -> ChatToMatterGenResponse:
        """Interpret chat history and convert to MatterGen parameters"""
        
        # Prepare the prompt
        system_prompt = f"""
        You are an expert in materials science and computational materials design.
        Your task is to interpret a conversation about designing a {current_goal} 
        and extract meaningful material property parameters for the MatterGen AI system.
        
        The conversation is specifically discussing the '{current_property}' property.
        
        Extract:
        1. Specific numerical values for material properties mentioned
        2. Translate layman descriptions like "hard as diamond" to technical parameters
        3. Provide confidence scores for your interpretations
        
        Format your response as JSON with:
        - interpretations: array of property interpretations
        - suggested_mattergen_params: key-value map of parameters for MatterGen
        - explanation: brief explanation of your reasoning
        """
        
        # Convert chat history to format expected by OpenAI
        messages = [
            {"role": "system", "content": system_prompt}
        ]
        
        # Add chat history messages
        for msg in chat_history.messages:
            messages.append({"role": msg.role, "content": msg.content})
        
        # Add final instruction
        messages.append({
            "role": "user", 
            "content": "Based on this conversation, extract the material property parameters that should be used for MatterGen."
        })
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.3,
                response_format={"type": "json_object"}
            )
            
            response_content = response.choices[0].message.content
            
            # Parse JSON response
            result = json.loads(response_content)
            
            # Convert interpretations to PropertyInterpretation objects
            interpretations = [
                PropertyInterpretation(**interp) 
                for interp in result.get("interpretations", [])
            ]
            
            return ChatToMatterGenResponse(
                interpretations=interpretations,
                suggested_mattergen_params=result.get("suggested_mattergen_params", {}),
                explanation=result.get("explanation", "")
            )
            
        except Exception as e:
            # Handle errors
            raise Exception(f"Error interpreting chat for MatterGen: {str(e)}")
    
    async def continue_conversation(self, history: ChatHistory) -> List[ChatMessage]:
        """Continue a conversation based on chat history"""
        
        # Convert chat history to format expected by OpenAI
        messages = []
        
        for msg in history.messages:
            messages.append({"role": msg.role, "content": msg.content})
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.7,
            )
            
            assistant_message = response.choices[0].message.content
            
            # Create new message
            new_message = ChatMessage(role="assistant", content=assistant_message)
            
            return [new_message]
            
        except Exception as e:
            # Handle errors
            raise Exception(f"Error continuing conversation: {str(e)}")
    
    async def get_property_guidance(self, property_name: str, user_level: str = "beginner") -> AssistantResponse:
        """Get guidance for explaining a specific material property"""
        
        # Prepare the prompt
        system_prompt = f"""
        You are an expert materials scientist helping explain material properties to a {user_level}-level user.
        Provide clear, accurate information about the requested property with appropriate analogies.
        
        For beginners: Use everyday analogies and simple explanations.
        For intermediate: Include some technical details but keep explanations accessible.
        For advanced: Provide detailed technical information with relevant equations or units.
        """
        
        user_prompt = f"Explain the material property '{property_name}' in a way that's appropriate for someone at a {user_level} level."
        
        messages = [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ]
        
        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=messages,
                temperature=0.5,
            )
            
            assistant_message = response.choices[0].message.content
            
            return AssistantResponse(text=assistant_message)
            
        except Exception as e:
            # Handle errors
            raise Exception(f"Error getting property guidance: {str(e)}")
    
    def _get_system_prompt(self, context: Optional[Dict[str, Any]] = None) -> str:
        """Generate a system prompt based on the context"""
        
        # Default system prompt
        system_prompt = """
        You are an expert materials scientist and chemist specialized in using the MatterGen AI system to design new materials.
        Your job is to help users with no scientific background to understand material properties and design goals in simple terms.
        Use everyday analogies to explain complex properties, e.g., "hardness like diamond" instead of "high bulk modulus".
        """
        
        # Add context-specific instructions if available
        if context:
            if context.get("goal"):
                system_prompt += f"\nThe user's current goal is to design a {context['goal']}."
            
            if context.get("current_property"):
                system_prompt += f"\nYou are currently discussing the '{context['current_property']}' property."
            
            if context.get("available_materials"):
                materials_list = ", ".join(context["available_materials"])
                system_prompt += f"\nThe user has the following materials available: {materials_list}."
        
        return system_prompt