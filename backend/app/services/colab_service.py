import os
import json
import tempfile
import pandas as pd
from typing import List, Dict, Any, Optional
from pathlib import Path
import uuid
import jinja2

from app.models.colab import (
    ColabCodeRequest,
    ColabCodeResponse,
    ColabNotebook,
    ColabNotebookSection,
    ColabCodeType
)
from app.services.openai_service import OpenAIService
from app.services.material_service import MaterialService


class ColabService:
    """Service for generating Colab code"""
    
    def __init__(
        self, 
        openai_service: OpenAIService, 
        material_service: MaterialService,
        templates_dir: str
    ):
        """Initialize the Colab service"""
        self.openai_service = openai_service
        self.material_service = material_service
        self.templates_dir = templates_dir
        
        # Create templates directory if it doesn't exist
        colab_templates_dir = Path(templates_dir)
        os.makedirs(colab_templates_dir, exist_ok=True)
        
        # Initialize template environment
        self.template_env = jinja2.Environment(
            loader=jinja2.FileSystemLoader(templates_dir),
            autoescape=jinja2.select_autoescape(['html', 'xml']),
            trim_blocks=True,
            lstrip_blocks=True
        )
        
        # Create default templates if they don't exist
        self._create_default_templates(colab_templates_dir)
    
    def _create_default_templates(self, templates_dir: Path):
        """Create default Colab templates if they don't exist"""
        # Template for dependencies
        dependencies_template = """# Install dependencies
import pkg_resources
required = {"torch", "mattergen", "git-lfs"}
installed = {pkg.key for pkg in pkg_resources.working_set}
missing = required - installed
if missing:
    !pip install {" ".join(missing)}
!apt-get install git-lfs

# Check if GPU is available
import torch
print(f"GPU available: {torch.cuda.is_available()}")
if torch.cuda.is_available():
    print(f"GPU device: {torch.cuda.get_device_name(0)}")
else:
    print("Warning: No GPU detected. Processing will be much slower.")
    print("Consider enabling GPU in Runtime > Change runtime type > Hardware accelerator > GPU")
"""

        # Template for loading MatterGen
        mattergen_template = """# Load MatterGen model
from mattergen import MatterGen
model = MatterGen.load_from_checkpoint("pretrained.ckpt")
"""

        # Template for generating a new material
        new_material_template = """# Set up material constraints
elements = [{% for material in materials %}"{{ material }}"{% if not loop.last %}, {% endif %}{% endfor %}]

# Generate material with specified properties
structure = model.generate(
    elements=elements,
    {% for prop in properties %}{{ prop.name }}={{ prop.value }}{% if not loop.last %},
    {% endif %}{% endfor %}
)

# Save the structure
structure.save("{{ output_name }}.cif")

print("Done! Your material design has been saved.")
"""

        # Template for dataset fine-tuning
        fine_tuning_template = """# Load dataset
import pandas as pd
dataset = pd.read_csv("user_materials.csv")

# Prepare dataset for fine-tuning
from mattergen.data import MaterialDataset
train_dataset = MaterialDataset(dataset)

# Fine-tune model
model.finetune(
    train_dataset,
    cost_weight=0.7,
    properties=[{% for prop in properties %}"{{ prop.name }}"{% if not loop.last %}, {% endif %}{% endfor %}],
    epochs=10,
    learning_rate=1e-4
)

print("Fine-tuning complete!")
"""

        # Template for warnings and notes
        warnings_template = """# Important notes
print("---------- IMPORTANT NOTES ----------")
print("1. Colab's free GPU may disconnect after ~4-12 hours. Save your results often!")
print("2. For large datasets or complex models, consider upgrading to Colab Pro ($9.99/month).")
print("3. This design is theoretical - consult with a materials scientist for practical synthesis.")
print("------------------------------------")
"""

        # Save templates
        templates = {
            "dependencies.py": dependencies_template,
            "mattergen_load.py": mattergen_template,
            "new_material.py": new_material_template,
            "fine_tuning.py": fine_tuning_template,
            "warnings.py": warnings_template
        }
        
        for filename, content in templates.items():
            template_path = templates_dir / filename
            if not template_path.exists():
                with open(template_path, "w") as f:
                    f.write(content)
    
    async def generate_code(self, request: ColabCodeRequest) -> ColabCodeResponse:
        """Generate Colab code for material design"""
        try:
            # Load templates
            dependencies_template = self.template_env.get_template("dependencies.py")
            mattergen_template = self.template_env.get_template("mattergen_load.py")
            warnings_template = self.template_env.get_template("warnings.py")
            
            # Generate code sections
            code_sections = []
            
            # Add dependencies section
            code_sections.append(dependencies_template.render())
            
            # Add MatterGen loading section
            code_sections.append(mattergen_template.render())
            
            # Add fine-tuning section if requested
            if request.include_fine_tuning:
                fine_tuning_template = self.template_env.get_template("fine_tuning.py")
                code_sections.append(fine_tuning_template.render(
                    properties=request.properties
                ))
            
            # Add material generation section based on code type
            if request.code_type == ColabCodeType.NEW_MATERIAL:
                new_material_template = self.template_env.get_template("new_material.py")
                code_sections.append(new_material_template.render(
                    materials=request.materials,
                    properties=request.properties,
                    output_name=request.additional_options.get("output_name", "new_material")
                ))
            elif request.code_type == ColabCodeType.CATALYST:
                # Custom template for catalyst
                new_material_template = self.template_env.get_template("new_material.py")
                code_sections.append(new_material_template.render(
                    materials=request.materials,
                    properties=request.properties,
                    output_name=request.additional_options.get("output_name", "catalyst")
                ))
            elif request.code_type == ColabCodeType.MODIFIED_MATERIAL:
                # Custom template for modified material
                new_material_template = self.template_env.get_template("new_material.py")
                code_sections.append(new_material_template.render(
                    materials=request.materials,
                    properties=request.properties,
                    output_name=request.additional_options.get("output_name", "modified_material")
                ))
            
            # Add warnings section
            code_sections.append(warnings_template.render())
            
            # Combine code sections
            code = "\n\n".join(code_sections)
            
            # Estimate execution time based on code type and options
            execution_time = self._estimate_execution_time(request)
            
            # Estimate memory requirements
            memory_requirements = self._estimate_memory_requirements(request)
            
            # Prepare warnings
            warnings = []
            if not request.materials:
                warnings.append("No materials specified. Using default materials may not give optimal results.")
            
            # Prepare tips
            tips = [
                "Save your generated material files immediately after they're created.",
                "For better results, consider fine-tuning the model with your specific materials dataset.",
                "Experiment with different property values to see how they affect the generated material."
            ]
            
            return ColabCodeResponse(
                code=code,
                execution_time_estimate=execution_time,
                memory_requirements=memory_requirements,
                warnings=warnings,
                tips=tips
            )
            
        except Exception as e:
            raise Exception(f"Error generating Colab code: {str(e)}")
    
    async def generate_notebook(self, request: ColabCodeRequest) -> str:
        """Generate a complete Colab notebook"""
        try:
            # Generate code
            code_response = await self.generate_code(request)
            
            # Create notebook JSON structure
            notebook = {
                "nbformat": 4,
                "nbformat_minor": 0,
                "metadata": {
                    "colab": {
                        "name": "EasyMatter Material Design.ipynb",
                        "provenance": [],
                        "collapsed_sections": []
                    },
                    "kernelspec": {
                        "name": "python3",
                        "display_name": "Python 3"
                    },
                    "language_info": {
                        "name": "python"
                    },
                    "accelerator": "GPU"
                },
                "cells": []
            }
            
            # Add markdown header
            notebook["cells"].append({
                "cell_type": "markdown",
                "metadata": {},
                "source": [
                    "# EasyMatter Material Design\n",
                    "\n",
                    f"This notebook was generated for a {request.code_type.value} design.\n",
                    "\n",
                    "## Execution Information\n",
                    f"- Estimated execution time: {code_response.execution_time_estimate}\n",
                    f"- Memory requirements: {code_response.memory_requirements}\n",
                    "\n",
                    "## Important Notes\n",
                    "".join([f"- {warning}\n" for warning in code_response.warnings]),
                    "\n",
                    "## Tips\n",
                    "".join([f"- {tip}\n" for tip in code_response.tips])
                ]
            })
            
            # Split code into sections and add to notebook
            code_sections = code_response.code.split("\n\n")
            for i, section in enumerate(code_sections):
                # Add a markdown header for each major section
                if i > 0:
                    # Extract section title from comments
                    title = "Code Section"
                    if section.strip().startswith("#"):
                        title_line = section.strip().split("\n")[0]
                        title = title_line.lstrip("# ")
                    
                    notebook["cells"].append({
                        "cell_type": "markdown",
                        "metadata": {},
                        "source": [f"## {title}"]
                    })
                
                notebook["cells"].append({
                    "cell_type": "code",
                    "metadata": {},
                    "source": [section],
                    "execution_count": None,
                    "outputs": []
                })
            
            # Save notebook to temporary file
            with tempfile.NamedTemporaryFile(suffix=".ipynb", delete=False) as f:
                json.dump(notebook, f, indent=2)
                notebook_path = f.name
            
            return notebook_path
            
        except Exception as e:
            raise Exception(f"Error generating notebook: {str(e)}")
    
    async def get_templates(self) -> List[str]:
        """Get a list of available Colab code templates"""
        templates_path = Path(self.templates_dir)
        return [f.stem for f in templates_path.glob("*.py")]
    
    async def get_template(self, template_name: str) -> Optional[str]:
        """Get a specific Colab code template"""
        template_path = Path(self.templates_dir) / f"{template_name}.py"
        if not template_path.exists():
            return None
        
        with open(template_path, "r") as f:
            return f.read()
    
    async def dataset_to_notebook(self, dataset_path: str, include_fine_tuning: bool = True) -> str:
        """Convert a dataset CSV to Colab code for fine-tuning"""
        try:
            # Read the dataset to extract properties
            df = pd.read_csv(dataset_path)
            
            # Extract property columns (skip Material, Formula, Cost, Availability)
            property_columns = [col for col in df.columns if col not in ["Material", "Formula", "Cost", "Availability"]]
            
            # Create properties list
            properties = [
                {"name": col, "value": df[col].mean()} 
                for col in property_columns
            ]
            
            # Create request
            request = ColabCodeRequest(
                code_type=ColabCodeType.FINE_TUNING,
                properties=properties,
                materials=[],  # Will be loaded from dataset
                dataset_path="user_materials.csv",  # User will upload this
                include_fine_tuning=include_fine_tuning
            )
            
            # Generate notebook
            return await self.generate_notebook(request)
            
        except Exception as e:
            raise Exception(f"Error converting dataset to notebook: {str(e)}")
    
    def _estimate_execution_time(self, request: ColabCodeRequest) -> str:
        """Estimate execution time based on request parameters"""
        base_time = 5  # minutes
        
        # Add time for fine-tuning
        if request.include_fine_tuning:
            base_time += 30
        
        # Add time based on number of properties
        base_time += len(request.properties) * 2
        
        # Add time based on code type
        if request.code_type == ColabCodeType.NEW_MATERIAL:
            base_time += 10
        elif request.code_type == ColabCodeType.CATALYST:
            base_time += 15
        elif request.code_type == ColabCodeType.MODIFIED_MATERIAL:
            base_time += 12
        
        # Format the time
        if base_time < 60:
            return f"{base_time} minutes"
        else:
            hours = base_time // 60
            minutes = base_time % 60
            return f"{hours} hours, {minutes} minutes"
    
    def _estimate_memory_requirements(self, request: ColabCodeRequest) -> str:
        """Estimate memory requirements based on request parameters"""
        ram = 4  # GB
        gpu = 8  # GB
        
        # Add memory for fine-tuning
        if request.include_fine_tuning:
            ram += 2
            gpu += 4
        
        # Add memory based on number of properties
        ram += len(request.properties) * 0.5
        
        # Format the requirements
        return f"{ram:.1f} GB RAM, {gpu:.1f} GB GPU memory"