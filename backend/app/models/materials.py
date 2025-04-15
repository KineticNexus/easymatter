from typing import List, Optional, Dict, Any, Union
from pydantic import BaseModel, Field


class MaterialBase(BaseModel):
    """Base model for material data"""
    name: str
    formula: str
    cost: float = Field(ge=0.0, description="Cost in $/g")
    availability: str = Field(description="Availability description (e.g., 'Abundant', 'Rare')")


class MaterialCreate(MaterialBase):
    """Model for creating a new material"""
    pass


class MaterialUpdate(MaterialBase):
    """Model for updating an existing material"""
    name: Optional[str] = None
    formula: Optional[str] = None
    cost: Optional[float] = None
    availability: Optional[str] = None


class Material(MaterialBase):
    """Complete material model with ID"""
    id: int
    elements: List[str] = Field(description="List of chemical elements in the material")

    class Config:
        orm_mode = True


class MaterialDataset(BaseModel):
    """Model for a complete material dataset"""
    materials: List[Material]
    metadata: Dict[str, Any] = {}


class MaterialProperty(BaseModel):
    """Model for material property"""
    name: str
    value: Union[float, str]
    unit: Optional[str] = None
    description: Optional[str] = None


class MaterialDesignGoal(BaseModel):
    """Model for a material design goal"""
    type: str = Field(description="Type of goal (new_material, catalyst, modified_material)")
    name: str
    description: str
    target_properties: List[MaterialProperty]
    material_constraints: List[str] = Field(
        description="List of material formulas to use as constraints"
    )
    
    
class MaterialDesignResult(BaseModel):
    """Model for a material design result"""
    design_id: str
    goal: MaterialDesignGoal
    properties: List[MaterialProperty]
    materials_used: List[str]
    colab_code: str
    created_at: str