import os
import json
import pandas as pd
import csv
import uuid
from typing import List, Dict, Any, Optional
from pathlib import Path
from datetime import datetime

from app.models.materials import (
    Material,
    MaterialCreate,
    MaterialUpdate,
    MaterialDataset,
    MaterialDesignGoal,
    MaterialDesignResult,
    MaterialProperty
)
from app.services.openai_service import OpenAIService


class MaterialService:
    """Service for handling materials and datasets"""
    
    def __init__(self, openai_service: OpenAIService, upload_dir: str):
        """Initialize the material service"""
        self.openai_service = openai_service
        self.upload_dir = upload_dir
        self.materials_dir = os.path.join(upload_dir, "materials")
        self.datasets_dir = os.path.join(upload_dir, "datasets")
        self.designs_dir = os.path.join(upload_dir, "designs")
        
        # Create directories if they don't exist
        os.makedirs(self.materials_dir, exist_ok=True)
        os.makedirs(self.datasets_dir, exist_ok=True)
        os.makedirs(self.designs_dir, exist_ok=True)
        
        # Initialize materials database (in-memory for now)
        self.materials_db = []
        self.next_id = 1
        
        # Load any existing materials
        self._load_materials()
    
    def _load_materials(self):
        """Load materials from the materials directory"""
        for material_file in Path(self.materials_dir).glob("*.json"):
            try:
                with open(material_file, "r") as f:
                    material_data = json.load(f)
                    
                    # Make sure the ID is set
                    if "id" not in material_data:
                        material_data["id"] = self.next_id
                        self.next_id += 1
                    else:
                        self.next_id = max(self.next_id, material_data["id"] + 1)
                    
                    material = Material(**material_data)
                    self.materials_db.append(material)
            except Exception as e:
                # Log error but continue
                print(f"Error loading material {material_file}: {str(e)}")
    
    async def get_materials(self, skip: int = 0, limit: int = 100) -> List[Material]:
        """Get a list of materials"""
        return self.materials_db[skip:skip + limit]
    
    async def create_material(self, material: MaterialCreate) -> Material:
        """Create a new material"""
        # Create a Material object
        material_id = self.next_id
        self.next_id += 1
        
        # Parse the formula to extract elements
        elements = self._extract_elements_from_formula(material.formula)
        
        new_material = Material(
            id=material_id,
            name=material.name,
            formula=material.formula,
            cost=material.cost,
            availability=material.availability,
            elements=elements
        )
        
        # Add to database
        self.materials_db.append(new_material)
        
        # Save to file
        material_path = Path(self.materials_dir) / f"{material_id}.json"
        with open(material_path, "w") as f:
            json.dump(new_material.dict(), f, indent=2)
        
        return new_material
    
    async def get_material(self, material_id: int) -> Optional[Material]:
        """Get a specific material by ID"""
        for material in self.materials_db:
            if material.id == material_id:
                return material
        return None
    
    async def update_material(self, material_id: int, material_update: MaterialUpdate) -> Optional[Material]:
        """Update a material"""
        for i, material in enumerate(self.materials_db):
            if material.id == material_id:
                # Update the material
                update_data = material_update.dict(exclude_unset=True)
                
                # If the formula is updated, re-extract elements
                if "formula" in update_data:
                    update_data["elements"] = self._extract_elements_from_formula(update_data["formula"])
                
                updated_material = Material(
                    **{**material.dict(), **update_data}
                )
                
                # Update in database
                self.materials_db[i] = updated_material
                
                # Save to file
                material_path = Path(self.materials_dir) / f"{material_id}.json"
                with open(material_path, "w") as f:
                    json.dump(updated_material.dict(), f, indent=2)
                
                return updated_material
        
        return None
    
    async def delete_material(self, material_id: int) -> bool:
        """Delete a material"""
        for i, material in enumerate(self.materials_db):
            if material.id == material_id:
                # Remove from database
                del self.materials_db[i]
                
                # Remove file
                material_path = Path(self.materials_dir) / f"{material_id}.json"
                if material_path.exists():
                    material_path.unlink()
                
                return True
        
        return False
    
    async def process_dataset(self, dataset_path: str) -> MaterialDataset:
        """Process a material dataset CSV file"""
        try:
            # Read the CSV file
            df = pd.read_csv(dataset_path)
            
            # Validate required columns
            required_columns = ["Material", "Formula", "Cost", "Availability"]
            missing_columns = [col for col in required_columns if col not in df.columns]
            if missing_columns:
                raise ValueError(f"Missing required columns: {', '.join(missing_columns)}")
            
            # Process materials
            materials = []
            
            for _, row in df.iterrows():
                # Extract elements from formula
                elements = self._extract_elements_from_formula(row["Formula"])
                
                # Create material
                material_id = self.next_id
                self.next_id += 1
                
                material = Material(
                    id=material_id,
                    name=row["Material"],
                    formula=row["Formula"],
                    cost=float(row["Cost"]),
                    availability=row["Availability"],
                    elements=elements
                )
                
                # Add to database
                self.materials_db.append(material)
                
                # Save to file
                material_path = Path(self.materials_dir) / f"{material_id}.json"
                with open(material_path, "w") as f:
                    json.dump(material.dict(), f, indent=2)
                
                materials.append(material)
            
            # Save the dataset
            dataset_id = str(uuid.uuid4())
            dataset_path = Path(self.datasets_dir) / f"{dataset_id}.csv"
            df.to_csv(dataset_path, index=False)
            
            # Create metadata
            metadata = {
                "id": dataset_id,
                "filename": os.path.basename(dataset_path),
                "num_materials": len(materials),
                "created_at": datetime.now().isoformat()
            }
            
            return MaterialDataset(
                materials=materials,
                metadata=metadata
            )
        
        except Exception as e:
            raise Exception(f"Error processing dataset: {str(e)}")
    
    async def design_material(self, goal: MaterialDesignGoal) -> MaterialDesignResult:
        """Design a material based on specified goals and constraints"""
        try:
            # Generate a unique ID for this design
            design_id = str(uuid.uuid4())
            
            # In a real application, this would call MatterGen
            # For this example, we'll simulate it with some placeholder data
            
            # Save the design
            design_path = Path(self.designs_dir) / f"{design_id}.json"
            
            # Generate Colab code
            colab_code = self._generate_colab_code(goal)
            
            # Create design result
            result = MaterialDesignResult(
                design_id=design_id,
                goal=goal,
                properties=goal.target_properties,
                materials_used=goal.material_constraints,
                colab_code=colab_code,
                created_at=datetime.now().isoformat()
            )
            
            # Save to file
            with open(design_path, "w") as f:
                json.dump(result.dict(), f, indent=2)
            
            return result
        
        except Exception as e:
            raise Exception(f"Error designing material: {str(e)}")
    
    def _extract_elements_from_formula(self, formula: str) -> List[str]:
        """Extract elements from a chemical formula"""
        # Simple parser for chemical formulas
        # In a real application, this would be more sophisticated
        
        elements = []
        current_element = ""
        
        for char in formula:
            if char.isupper():
                if current_element:
                    elements.append(current_element)
                current_element = char
            elif char.islower():
                current_element += char
            elif char.isdigit() or char in "()[]{}":
                # Skip numbers and brackets
                if current_element and current_element not in elements:
                    elements.append(current_element)
                    current_element = ""
        
        # Add the last element
        if current_element and current_element not in elements:
            elements.append(current_element)
        
        return elements
    
    def _generate_colab_code(self, goal: MaterialDesignGoal) -> str:
        """Generate Colab code for a material design goal"""
        # This is a simplified version of what would be a more sophisticated template system
        
        # Get property parameters
        property_params = []
        for prop in goal.target_properties:
            property_params.append(f"{prop.name}={prop.value}")
        
        property_params_str = ", ".join(property_params)
        
        # Get material constraints
        materials_str = ", ".join([f'"{m}"' for m in goal.material_constraints])
        
        # Generate the code
        code = f"""
# EasyMatter Generated Colab Code
# Design Goal: {goal.name} ({goal.type})
# Description: {goal.description}

# Check and install dependencies
import pkg_resources
required = {{"torch", "mattergen", "git-lfs"}}
installed = {{pkg.key for pkg in pkg_resources.working_set}}
missing = required - installed
if missing:
    !pip install {{" ".join(missing)}}
!apt-get install git-lfs

# Load MatterGen model
from mattergen import MatterGen
model = MatterGen.load_from_checkpoint("pretrained.ckpt")

# Set up material constraints
elements = [{materials_str}]

# Generate material with specified properties
structure = model.generate(
    elements=elements,
    {property_params_str}
)

# Save the structure
structure.save("{goal.name.lower().replace(' ', '_')}.cif")

print("Done! Your material design has been saved.")
print("Warning: Colab's free GPU may disconnect after ~4-12 hours. Save your results often!")
"""
        
        return code