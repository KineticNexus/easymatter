from fastapi import APIRouter, HTTPException, Depends, Query
from typing import List, Optional

from app.models.templates import DesignTemplate, TemplateResponse
from app.services.template_service import TemplateService
from app.core.dependencies import get_template_service


router = APIRouter()


@router.get("/", response_model=TemplateResponse)
async def get_templates(
    category: Optional[str] = None,
    skip: int = 0,
    limit: int = 100,
    template_service: TemplateService = Depends(get_template_service)
):
    """
    Get a list of design templates
    """
    try:
        templates_response = await template_service.get_templates(category, skip, limit)
        return templates_response
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving templates: {str(e)}")


@router.get("/{template_id}", response_model=DesignTemplate)
async def get_template(
    template_id: str,
    template_service: TemplateService = Depends(get_template_service)
):
    """
    Get a specific template by ID
    """
    try:
        template = await template_service.get_template(template_id)
        if template is None:
            raise HTTPException(status_code=404, detail="Template not found")
        return template
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving template: {str(e)}")


@router.get("/categories", response_model=List[str])
async def get_categories(
    template_service: TemplateService = Depends(get_template_service)
):
    """
    Get a list of all template categories
    """
    try:
        categories = await template_service.get_categories()
        return categories
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving categories: {str(e)}")


@router.get("/popular", response_model=List[DesignTemplate])
async def get_popular_templates(
    limit: int = 5,
    template_service: TemplateService = Depends(get_template_service)
):
    """
    Get the most popular templates
    """
    try:
        popular_templates = await template_service.get_popular_templates(limit)
        return popular_templates
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving popular templates: {str(e)}")


@router.get("/{template_id}/examples", response_model=List[dict])
async def get_template_examples(
    template_id: str,
    template_service: TemplateService = Depends(get_template_service)
):
    """
    Get examples for a specific template
    """
    try:
        examples = await template_service.get_template_examples(template_id)
        return examples
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error retrieving template examples: {str(e)}")