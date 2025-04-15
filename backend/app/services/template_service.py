import os
import json
from typing import List, Dict, Any, Optional
from pathlib import Path

from app.models.templates import DesignTemplate, TemplateResponse


class TemplateService:
    """Service for handling material design templates"""
    
    def __init__(self, templates_dir: str):
        """Initialize the template service"""
        self.templates_dir = templates_dir
        self.templates_cache = {}
        self.categories_cache = set()
        self._load_templates()
    
    def _load_templates(self):
        """Load all templates from the templates directory"""
        templates_path = Path(self.templates_dir) / "material_templates"
        
        # Create templates directory if it doesn't exist
        os.makedirs(templates_path, exist_ok=True)
        
        # If no templates exist, load default templates
        if not list(templates_path.glob("*.json")):
            self._create_default_templates(templates_path)
        
        # Load all templates
        for template_file in templates_path.glob("*.json"):
            try:
                with open(template_file, "r") as f:
                    template_data = json.load(f)
                    template = DesignTemplate(**template_data)
                    self.templates_cache[template.id] = template
                    self.categories_cache.add(template.category)
            except Exception as e:
                # Log error but continue
                print(f"Error loading template {template_file}: {str(e)}")
    
    def _create_default_templates(self, templates_path: Path):
        """Create default templates if none exist"""
        default_templates = [
            {
                "id": "battery_material",
                "name": "battery_material",
                "display_name": "Battery Material",
                "description": "Design a material for battery applications with high conductivity and stability.",
                "category": "energy",
                "icon": "battery",
                "default_properties": [
                    {
                        "name": "band_gap",
                        "value": 0.5,
                        "unit": "eV",
                        "description": "Low band gap for good electronic conductivity"
                    },
                    {
                        "name": "density",
                        "value": 3.0,
                        "unit": "g/cm³",
                        "description": "Moderate density for a balance of energy density and weight"
                    },
                    {
                        "name": "thermal_stability",
                        "value": 500,
                        "unit": "°C",
                        "description": "High thermal stability for safety"
                    }
                ],
                "suggested_elements": ["Li", "Co", "Mn", "Ni", "O"],
                "property_explanations": {
                    "band_gap": "How well the material conducts electricity. Lower values mean better conductivity, like copper.",
                    "density": "How heavy the material is. Lower values mean lighter, like aluminum vs. lead.",
                    "thermal_stability": "How well the material handles heat without breaking down. Higher values mean more stable, like ceramic vs. plastic."
                },
                "prompts": {
                    "band_gap": "How conductive should your battery material be? Metals are very conductive, while ceramics are usually not.",
                    "density": "How lightweight should your battery material be? This affects how portable your battery will be.",
                    "thermal_stability": "How heat-resistant should your battery be? This affects safety and where it can be used."
                },
                "examples": [
                    {
                        "name": "High-performance lithium battery",
                        "properties": {
                            "band_gap": 0.3,
                            "density": 2.5,
                            "thermal_stability": 600
                        },
                        "materials": ["LiCoO2", "Li2O"]
                    }
                ]
            },
            {
                "id": "solar_material",
                "name": "solar_material",
                "display_name": "Solar Panel Material",
                "description": "Design a material for solar energy conversion with optimal light absorption.",
                "category": "energy",
                "icon": "sun",
                "default_properties": [
                    {
                        "name": "band_gap",
                        "value": 1.5,
                        "unit": "eV",
                        "description": "Optimal band gap for solar spectrum absorption"
                    },
                    {
                        "name": "optical_absorption",
                        "value": 10000,
                        "unit": "cm⁻¹",
                        "description": "High optical absorption for efficient light harvesting"
                    },
                    {
                        "name": "carrier_lifetime",
                        "value": 1.0,
                        "unit": "µs",
                        "description": "Long carrier lifetime for efficient charge extraction"
                    }
                ],
                "suggested_elements": ["Si", "Ga", "As", "Cd", "Te", "Se"],
                "property_explanations": {
                    "band_gap": "How much energy is needed to generate electricity from sunlight. Around 1.5 eV is ideal for solar cells.",
                    "optical_absorption": "How well the material absorbs sunlight. Higher is better, like dark colors absorb more light than light colors.",
                    "carrier_lifetime": "How long the electric charges last before disappearing. Longer is better for collecting the electricity."
                },
                "prompts": {
                    "band_gap": "What kind of light do you want your solar material to absorb best? Visible light, infrared, ultraviolet?",
                    "optical_absorption": "How efficiently should your material absorb light? More absorption means thinner panels.",
                    "carrier_lifetime": "How quickly does your material need to convert light to electricity? Faster conversion usually means higher efficiency."
                },
                "examples": [
                    {
                        "name": "High-efficiency solar cell",
                        "properties": {
                            "band_gap": 1.4,
                            "optical_absorption": 15000,
                            "carrier_lifetime": 2.0
                        },
                        "materials": ["GaAs", "CdTe"]
                    }
                ]
            },
            {
                "id": "catalyst",
                "name": "catalyst",
                "display_name": "Chemical Catalyst",
                "description": "Design a catalyst to speed up a specific chemical reaction.",
                "category": "chemistry",
                "icon": "flask",
                "default_properties": [
                    {
                        "name": "adsorption_energy",
                        "value": -0.5,
                        "unit": "eV",
                        "description": "Moderate adsorption energy for optimal catalytic activity"
                    },
                    {
                        "name": "surface_area",
                        "value": 100,
                        "unit": "m²/g",
                        "description": "High surface area for maximum contact with reactants"
                    },
                    {
                        "name": "stability",
                        "value": 500,
                        "unit": "°C",
                        "description": "High stability for durability under reaction conditions"
                    }
                ],
                "suggested_elements": ["Pt", "Pd", "Rh", "Ni", "Fe", "Co", "Cu", "Zn"],
                "property_explanations": {
                    "adsorption_energy": "How strongly the material holds onto the chemicals it's helping to react. Not too tight, not too loose is best.",
                    "surface_area": "How much working surface the catalyst has. More surface area means more places for reactions to happen.",
                    "stability": "How well the catalyst holds up during use without breaking down. Higher values mean longer-lasting catalysts."
                },
                "prompts": {
                    "adsorption_energy": "What chemicals should your catalyst interact with? This helps determine the ideal binding strength.",
                    "surface_area": "Does your catalyst need to process large amounts of material quickly, or is it for specialized smaller-scale reactions?",
                    "stability": "In what environment will your catalyst operate? High temperatures, acidic conditions, etc.?"
                },
                "examples": [
                    {
                        "name": "CO2 reduction catalyst",
                        "properties": {
                            "adsorption_energy": -0.4,
                            "surface_area": 150,
                            "stability": 450
                        },
                        "materials": ["Cu2O", "ZnO"]
                    }
                ]
            },
            {
                "id": "structural_material",
                "name": "structural_material",
                "display_name": "Structural Material",
                "description": "Design a strong, durable material for construction or manufacturing.",
                "category": "construction",
                "icon": "building",
                "default_properties": [
                    {
                        "name": "bulk_modulus",
                        "value": 100,
                        "unit": "GPa",
                        "description": "High bulk modulus for resistance to compression"
                    },
                    {
                        "name": "shear_modulus",
                        "value": 80,
                        "unit": "GPa",
                        "description": "High shear modulus for strength"
                    },
                    {
                        "name": "density",
                        "value": 5.0,
                        "unit": "g/cm³",
                        "description": "Moderate density for a balance of strength and weight"
                    }
                ],
                "suggested_elements": ["Fe", "C", "Si", "Al", "Ti", "Mg"],
                "property_explanations": {
                    "bulk_modulus": "How resistant the material is to being compressed, like how hard it is to squash a block of the material.",
                    "shear_modulus": "How resistant the material is to changing shape, like how hard it is to bend or twist.",
                    "density": "How heavy the material is for its size. Steel is dense, aluminum is less dense, and wood is even less dense."
                },
                "prompts": {
                    "bulk_modulus": "How strong under compression should your material be? Like concrete (very strong) or wood (less strong)?",
                    "shear_modulus": "How resistant to bending and twisting should your material be? Like steel (very resistant) or plastic (less resistant)?",
                    "density": "How lightweight does your material need to be? This affects portability and fuel efficiency in vehicles."
                },
                "examples": [
                    {
                        "name": "Lightweight structural alloy",
                        "properties": {
                            "bulk_modulus": 70,
                            "shear_modulus": 60,
                            "density": 3.0
                        },
                        "materials": ["Al2O3", "MgO", "SiC"]
                    }
                ]
            }
        ]
        
        # Save default templates
        for template_data in default_templates:
            template_path = templates_path / f"{template_data['id']}.json"
            with open(template_path, "w") as f:
                json.dump(template_data, f, indent=2)
    
    async def get_templates(self, category: Optional[str] = None, skip: int = 0, limit: int = 100) -> TemplateResponse:
        """Get a list of templates, optionally filtered by category"""
        templates = list(self.templates_cache.values())
        
        # Filter by category if specified
        if category:
            templates = [t for t in templates if t.category == category]
        
        # Apply pagination
        total = len(templates)
        templates = templates[skip:skip + limit]
        
        return TemplateResponse(
            templates=templates,
            total=total,
            categories=list(self.categories_cache)
        )
    
    async def get_template(self, template_id: str) -> Optional[DesignTemplate]:
        """Get a specific template by ID"""
        return self.templates_cache.get(template_id)
    
    async def get_categories(self) -> List[str]:
        """Get a list of all template categories"""
        return list(self.categories_cache)
    
    async def get_popular_templates(self, limit: int = 5) -> List[DesignTemplate]:
        """Get the most popular templates"""
        # In a real application, this would be based on usage statistics
        # For now, return the first few templates
        return list(self.templates_cache.values())[:limit]
    
    async def get_template_examples(self, template_id: str) -> List[dict]:
        """Get examples for a specific template"""
        template = self.templates_cache.get(template_id)
        if not template:
            return []
        
        return template.examples