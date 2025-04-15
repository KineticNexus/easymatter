from typing import List, Optional, Dict, Any, Union
from pydantic import BaseModel, Field
from enum import Enum


class MessageRole(str, Enum):
    """Enum for chat message roles"""
    SYSTEM = "system"
    USER = "user"
    ASSISTANT = "assistant"


class ChatMessage(BaseModel):
    """Model for a chat message"""
    role: MessageRole
    content: str


class ChatHistory(BaseModel):
    """Model for a chat conversation history"""
    messages: List[ChatMessage]
    metadata: Dict[str, Any] = {}


class PropertyInterpretation(BaseModel):
    """Model for property interpretation from natural language"""
    property_name: str
    technical_value: Union[float, str]
    unit: Optional[str] = None
    confidence: float = Field(ge=0.0, le=1.0)
    source_text: str
    explanation: str


class ChatToMatterGenRequest(BaseModel):
    """Request model for chat-to-MatterGen conversion"""
    chat_history: ChatHistory
    current_goal: str = Field(description="Current material design goal")
    current_property: str = Field(description="Current property being discussed")


class ChatToMatterGenResponse(BaseModel):
    """Response model for chat-to-MatterGen conversion"""
    interpretations: List[PropertyInterpretation]
    suggested_mattergen_params: Dict[str, Any]
    explanation: str


class UserQuery(BaseModel):
    """Model for a user query"""
    text: str
    context: Optional[Dict[str, Any]] = None


class AssistantResponse(BaseModel):
    """Model for assistant response"""
    text: str
    interpretations: Optional[List[PropertyInterpretation]] = None
    mattergen_params: Optional[Dict[str, Any]] = None