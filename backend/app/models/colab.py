from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field
from enum import Enum

from app.models.materials import MaterialProperty


class ColabCodeType(str, Enum):
    """Types of Colab code generation"""
    NEW_MATERIAL = "new_material"
    CATALYST = "catalyst"
    MODIFIED_MATERIAL = "modified_material"
    FINE_TUNING = "fine_tuning"


class ColabCodeRequest(BaseModel):
    """Request model for Colab code generation"""
    code_type: ColabCodeType
    properties: List[MaterialProperty]
    materials: List[str] = Field(
        description="List of material formulas to use as constraints"
    )
    dataset_path: Optional[str] = Field(
        description="Path to dataset CSV for fine-tuning",
        default=None
    )
    include_fine_tuning: bool = Field(
        description="Whether to include fine-tuning code",
        default=False
    )
    additional_options: Dict[str, Any] = Field(
        description="Additional options for code generation",
        default={}
    )


class ColabCodeResponse(BaseModel):
    """Response model for Colab code generation"""
    code: str
    execution_time_estimate: str = Field(
        description="Estimated execution time (e.g., '30 minutes')"
    )
    memory_requirements: str = Field(
        description="Estimated memory requirements (e.g., '10 GB RAM, 16 GB GPU memory')"
    )
    warnings: List[str] = Field(
        description="Warnings about potential issues",
        default=[]
    )
    tips: List[str] = Field(
        description="Tips for execution",
        default=[]
    )


class ColabNotebookSection(BaseModel):
    """Model for a section of a Colab notebook"""
    title: str
    code: str
    markdown: str


class ColabNotebook(BaseModel):
    """Model for a complete Colab notebook"""
    title: str
    sections: List[ColabNotebookSection]
    metadata: Dict[str, Any] = {}