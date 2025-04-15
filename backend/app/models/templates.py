from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

from app.models.materials import MaterialProperty


class TemplateBase(BaseModel):
    """Base template model"""
    name: str
    display_name: str
    description: str
    category: str = Field(description="Category of template (e.g., 'battery', 'solar', 'catalyst')")
    icon: Optional[str] = None


class DesignTemplate(TemplateBase):
    """Model for a material design template"""
    id: str
    default_properties: List[MaterialProperty] = Field(
        description="Default properties for this template"
    )
    suggested_elements: List[str] = Field(
        description="Suggested elements for this template", 
        default=[]
    )
    property_explanations: Dict[str, str] = Field(
        description="Plain-language explanations for each property",
        default={}
    )
    prompts: Dict[str, str] = Field(
        description="Conversational prompts for each property",
        default={}
    )
    examples: List[Dict[str, Any]] = Field(
        description="Example material designs for this template",
        default=[]
    )


class TemplateResponse(BaseModel):
    """Response model for templates"""
    templates: List[DesignTemplate]
    total: int
    categories: List[str]