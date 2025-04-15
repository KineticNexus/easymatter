from fastapi import Depends

from app.services.openai_service import OpenAIService
from app.services.material_service import MaterialService
from app.services.template_service import TemplateService
from app.services.colab_service import ColabService
from app.core.config import settings


# OpenAI Service singleton
_openai_service = None

def get_openai_service():
    """Dependency to get OpenAI service instance"""
    global _openai_service
    if _openai_service is None:
        _openai_service = OpenAIService(
            api_key=settings.OPENAI_API_KEY,
            model=settings.OPENAI_MODEL
        )
    return _openai_service


# Material Service singleton
_material_service = None

def get_material_service(openai_service: OpenAIService = Depends(get_openai_service)):
    """Dependency to get Material service instance"""
    global _material_service
    if _material_service is None:
        _material_service = MaterialService(
            openai_service=openai_service,
            upload_dir=settings.UPLOAD_DIR
        )
    return _material_service


# Template Service singleton
_template_service = None

def get_template_service():
    """Dependency to get Template service instance"""
    global _template_service
    if _template_service is None:
        _template_service = TemplateService(
            templates_dir=settings.TEMPLATES_DIR
        )
    return _template_service


# Colab Service singleton
_colab_service = None

def get_colab_service(
    openai_service: OpenAIService = Depends(get_openai_service),
    material_service: MaterialService = Depends(get_material_service)
):
    """Dependency to get Colab service instance"""
    global _colab_service
    if _colab_service is None:
        _colab_service = ColabService(
            openai_service=openai_service,
            material_service=material_service,
            templates_dir=settings.COLAB_TEMPLATES_DIR
        )
    return _colab_service