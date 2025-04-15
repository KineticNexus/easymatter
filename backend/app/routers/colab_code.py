from fastapi import APIRouter, HTTPException, Depends, Query, File, UploadFile
from fastapi.responses import FileResponse
from typing import List, Optional
import os
import tempfile
from pathlib import Path

from app.models.colab import (
    ColabCodeRequest,
    ColabCodeResponse,
    ColabNotebook
)
from app.services.colab_service import ColabService
from app.core.dependencies import get_colab_service


router = APIRouter()


@router.post("/generate", response_model=ColabCodeResponse)
async def generate_colab_code(
    request: ColabCodeRequest,
    colab_service: ColabService = Depends(get_colab_service)
):
    """
    Generate Colab code for material design
    """
    try:
        response = await colab_service.generate_code(request)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating Colab code: {str(e)}")


@router.post("/notebook", response_model=str)
async def generate_notebook(
    request: ColabCodeRequest,
    colab_service: ColabService = Depends(get_colab_service)
):
    """
    Generate a complete Colab notebook
    """
    try:
        # Generate notebook and return the file path
        notebook_path = await colab_service.generate_notebook(request)
        
        # Return the notebook file as a download
        return FileResponse(
            path=notebook_path,
            filename="material_design.ipynb",
            media_type="application/octet-stream"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating notebook: {str(e)}")


@router.get("/templates", response_model=List[str])
async def get_colab_templates(
    colab_service: ColabService = Depends(get_colab_service)
):
    """
    Get a list of available Colab code templates
    """
    try:
        templates = await colab_service.get_templates()
        return templates
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving templates: {str(e)}")


@router.get("/templates/{template_name}", response_model=str)
async def get_colab_template(
    template_name: str,
    colab_service: ColabService = Depends(get_colab_service)
):
    """
    Get a specific Colab code template
    """
    try:
        template = await colab_service.get_template(template_name)
        if template is None:
            raise HTTPException(status_code=404, detail="Template not found")
        return template
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving template: {str(e)}")


@router.post("/dataset-to-colab", response_model=str)
async def convert_dataset_to_colab(
    file: UploadFile = File(...),
    include_fine_tuning: bool = True,
    colab_service: ColabService = Depends(get_colab_service)
):
    """
    Convert a dataset CSV to Colab code for fine-tuning
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
        
        # Generate Colab code for the dataset
        notebook_path = await colab_service.dataset_to_notebook(temp_path, include_fine_tuning)
        
        # Clean up temporary file
        os.unlink(temp_path)
        
        # Return the notebook file as a download
        return FileResponse(
            path=notebook_path,
            filename="dataset_processing.ipynb",
            media_type="application/octet-stream"
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error converting dataset to Colab: {str(e)}")