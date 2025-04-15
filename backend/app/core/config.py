import os
from typing import List
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Settings(BaseSettings):
    # API settings
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "EasyMatter"
    
    # CORS settings
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "http://localhost:8000"]
    
    # OpenAI API settings
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    OPENAI_MODEL: str = os.getenv("OPENAI_MODEL", "gpt-4o")
    
    # File upload settings
    UPLOAD_DIR: str = "data/uploads"
    MAX_UPLOAD_SIZE: int = 5 * 1024 * 1024  # 5 MB
    
    # Security settings
    SECRET_KEY: str = os.getenv("SECRET_KEY", "insecure-secret-key-for-dev-only")
    
    # Development settings
    DEBUG: bool = os.getenv("DEBUG", "False").lower() == "true"
    
    # Template settings
    TEMPLATES_DIR: str = "app/templates"
    
    # Colab code settings
    COLAB_TEMPLATES_DIR: str = "app/templates/colab"
    
    class Config:
        env_file = ".env"
        case_sensitive = True

# Create settings instance
settings = Settings()

# Ensure upload directory exists
os.makedirs(os.path.join(os.path.dirname(__file__), "..", "..", settings.UPLOAD_DIR), exist_ok=True)