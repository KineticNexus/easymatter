from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional

from app.models.chat import (
    UserQuery, 
    AssistantResponse, 
    ChatHistory,
    ChatMessage,
    ChatToMatterGenRequest,
    ChatToMatterGenResponse
)
from app.services.openai_service import OpenAIService
from app.core.dependencies import get_openai_service


router = APIRouter()


@router.post("/query", response_model=AssistantResponse)
async def chat_query(
    query: UserQuery,
    openai_service: OpenAIService = Depends(get_openai_service)
):
    """
    Process a user query and return a response
    """
    try:
        # Process the user's query with OpenAI
        response = await openai_service.process_query(query.text, query.context)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")


@router.post("/interpret", response_model=ChatToMatterGenResponse)
async def interpret_chat(
    request: ChatToMatterGenRequest,
    openai_service: OpenAIService = Depends(get_openai_service)
):
    """
    Interpret chat history and convert to MatterGen parameters
    """
    try:
        # Interpret the chat history and convert to MatterGen parameters
        interpretation = await openai_service.interpret_chat_for_mattergen(
            request.chat_history,
            request.current_goal,
            request.current_property
        )
        return interpretation
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error interpreting chat: {str(e)}")


@router.post("/continue", response_model=List[ChatMessage])
async def continue_conversation(
    history: ChatHistory,
    openai_service: OpenAIService = Depends(get_openai_service)
):
    """
    Continue a conversation based on chat history
    """
    try:
        # Continue the conversation based on chat history
        continued_messages = await openai_service.continue_conversation(history)
        return continued_messages
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error continuing conversation: {str(e)}")


@router.post("/property-guidance", response_model=AssistantResponse)
async def get_property_guidance(
    property_name: str,
    user_level: str = "beginner",
    openai_service: OpenAIService = Depends(get_openai_service)
):
    """
    Get guidance for explaining a specific material property
    """
    try:
        # Get guidance for a specific material property
        guidance = await openai_service.get_property_guidance(property_name, user_level)
        return guidance
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting property guidance: {str(e)}")