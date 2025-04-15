import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from dotenv import load_dotenv

from app.routers import materials, chat, templates, colab_code
from app.core.config import settings

# Load environment variables
load_dotenv()

# Check if OpenAI API key is set
if not os.getenv("OPENAI_API_KEY"):
    print("Warning: OPENAI_API_KEY environment variable not set.")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("Starting up EasyMatter API...")
    yield
    # Shutdown
    print("Shutting down EasyMatter API...")

# Create FastAPI app
app = FastAPI(
    title="EasyMatter API",
    description="API for EasyMatter, a web app that makes MatterGen accessible to non-scientists.",
    version="0.1.0",
    lifespan=lifespan,
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(materials.router, prefix="/api/materials", tags=["materials"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])
app.include_router(templates.router, prefix="/api/templates", tags=["templates"])
app.include_router(colab_code.router, prefix="/api/colab-code", tags=["colab-code"])

@app.get("/", tags=["health"])
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "EasyMatter API is running"}

@app.get("/api/info", tags=["info"])
async def api_info():
    """API information endpoint"""
    return {
        "app_name": "EasyMatter",
        "version": app.version,
        "description": app.description,
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)