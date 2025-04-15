from fastapi import APIRouter, HTTPException, UploadFile, File, Form, Depends, Query
from fastapi.responses import FileResponse
from typing import List, Optional
import os
import csv
import pandas as pd
import tempfile
from pathlib import Path

from app.models.materials import (
    Material,
    MaterialCreate,
    MaterialUpdate,
    MaterialDataset,
    MaterialDesignGoal,
    MaterialDesignResult
)
from app.core.config import settings
from app.services.material_service import MaterialService
from app.core.dependencies import get_material_service


router = APIRouter()


@router.get("/", response_model=List[Material])
async def get_materials(
    skip: int = 0, 
    limit: int = 100,
    material_service: MaterialService = Depends(get_material_service)
):
    """
    Get a list of materials
    """
    try:
        materials = await material_service.get_materials(skip, limit)
        return materials
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving materials: {str(e)}")


@router.post("/", response_model=Material)
async def create_material(
    material: MaterialCreate,
    material_service: MaterialService = Depends(get_material_service)
):
    """
    Create a new material
    """
    try:
        created_material = await material_service.create_material(material)
        return created_material
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error creating material: {str(e)}")


@router.get("/{material_id}", response_model=Material)
async def get_material(
    material_id: int,
    material_service: MaterialService = Depends(get_material_service)
):
    """
    Get a specific material by ID
    """
    try:
        material = await material_service.get_material(material_id)
        if material is None:
            raise HTTPException(status_code=404, detail="Material not found")
        return material
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving material: {str(e)}")


@router.put("/{material_id}", response_model=Material)
async def update_material(
    material_id: int,
    material: MaterialUpdate,
    material_service: MaterialService = Depends(get_material_service)
):
    """
    Update a material
    """
    try:
        updated_material = await material_service.update_material(material_id, material)
        if updated_material is None:
            raise HTTPException(status_code=404, detail="Material not found")
        return updated_material
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error updating material: {str(e)}")


@router.delete("/{material_id}")
async def delete_material(
    material_id: int,
    material_service: MaterialService = Depends(get_material_service)
):
    """
    Delete a material
    """
    try:
        success = await material_service.delete_material(material_id)
        if not success:
            raise HTTPException(status_code=404, detail="Material not found")
        return {"detail": "Material deleted successfully"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error deleting material: {str(e)}")


@router.post("/upload-dataset", response_model=MaterialDataset)
async def upload_dataset(
    file: UploadFile = File(...),
    material_service: MaterialService = Depends(get_material_service)
):
    """
    Upload a material dataset (CSV format)
    """
    try:
        # Check file extension
        if not file.filename.endswith('.csv'):
            raise HTTPException(status_code=400, detail="Only CSV files are allowed")
        
        # Save file to temporary location
        with tempfile.NamedTemporaryFile(delete=False, suffix='.csv') as temp:
            contents = await file.read()
            temp.write(contents)
            temp_path = temp.name
        
        # Process the dataset
        dataset = await material_service.process_dataset(temp_path)
        
        # Clean up temporary file
        os.unlink(temp_path)
        
        return dataset
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing dataset: {str(e)}")


@router.post("/design", response_model=MaterialDesignResult)
async def design_material(
    goal: MaterialDesignGoal,
    material_service: MaterialService = Depends(get_material_service)
):
    """
    Design a material based on specified goals and constraints
    """
    try:
        result = await material_service.design_material(goal)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error designing material: {str(e)}")


@router.get("/template-dataset", response_model=str)
async def get_template_dataset():
    """
    Get a template dataset CSV
    """
    template_path = Path("app/templates/datasets/template_dataset.csv")
    if not template_path.exists():
        raise HTTPException(status_code=404, detail="Template dataset not found")
    
    return FileResponse(
        path=template_path,
        filename="template_dataset.csv",
        media_type="text/csv"
    )