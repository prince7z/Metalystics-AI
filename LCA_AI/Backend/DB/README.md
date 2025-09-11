# LCA Database Schema Documentation

This directory contains the modular MongoDB schema definitions for the Life Cycle Assessment (LCA) project.

## File Structure

```
DB/
├── schemas/
│   ├── common.ts          # Common schemas (EnergySource, Chemical, Material, Emissions)
│   ├── extraction.ts      # Extraction process schema
│   ├── transportation.ts  # Transportation schema
│   ├── refining.ts        # Refining process schema
│   ├── smelting.ts        # Smelting process schema
│   ├── casting.ts         # Casting process schema
│   ├── recycling.ts       # Recycling process schema
│   ├── results.ts         # Results and reports schema
│   ├── inventory.ts       # Complete inventory data schema
│   ├── project.ts         # Main LCA project schema
│   └── index.ts           # Export barrel file
├── MDB.ts                 # MongoDB connection and main exports
├── services.ts            # Database service layer
├── types.ts               # TypeScript type definitions
└── validation.ts          # Validation utilities
```

## Schema Overview

### Common Schemas (`common.ts`)
- **EnergySourceSchema**: Energy source types and percentages
- **ChemicalSchema**: Chemical usage in processes
- **MaterialSchema**: Material specifications
- **EmissionsSchema**: CO2, NOx, SOx emissions

### Process Schemas
- **ExtractionSchema**: Metal extraction/mining data
- **TransportationSchema**: Transportation between stages
- **RefiningSchema**: Metal refining processes
- **SmeltingSchema**: Smelting operations
- **CastingSchema**: Casting and forming processes
- **RecyclingSchema**: Recycling and end-of-life processing

### Data Organization
- **InventoryDataSchema**: Combines all process stages
- **ResultsSchema**: Environmental impact and circularity metrics
- **LCAProjectSchema**: Main project container

## Usage

### Importing Schemas

```typescript
// Import specific schemas
import { ExtractionSchema, TransportationSchema } from './schemas';

// Import the main model
import { LCAProject } from './schemas/project';

// Import all schemas
import * as Schemas from './schemas';
```

### Creating a New Project

```typescript
import { LCAProjectService } from './services';

const projectData = {
  projectName: "Aluminum Production LCA",
  metalType: "Aluminium",
  goal: "Assess environmental impact",
  systemBoundary: "Cradle-to-Gate",
  meta: {
    createdBy: "user_id_here"
  }
};

const result = await LCAProjectService.createProject(projectData);
```

### Updating Inventory Data

```typescript
const extractionData = {
  processId: "ext_001",
  description: "Bauxite extraction",
  data: {
    metal: "Aluminium",
    region: "Australia",
    method: "Open-pit Mining",
    // ... other fields
  }
};

await LCAProjectService.updateInventoryStage(
  projectId, 
  'extraction', 
  extractionData
);
```

## Validation

Use the validation utilities to ensure data integrity:

```typescript
import { LCAProjectValidator } from './validation';

const errors = LCAProjectValidator.validateProject(projectData);
if (errors.length > 0) {
  console.error('Validation errors:', errors);
}
```

## Benefits of Modular Structure

1. **Maintainability**: Each schema is in its own file, making updates easier
2. **Reusability**: Common schemas can be reused across different processes
3. **Type Safety**: Better TypeScript support with modular imports
4. **Performance**: Only import what you need
5. **Testing**: Individual schemas can be tested in isolation
6. **Collaboration**: Multiple developers can work on different schemas simultaneously

## Environment Variables

Set up your MongoDB connection:

```env
MONGODB_URI=mongodb://localhost:27017/Matalstics
```

## Migration from Monolithic Schema

The previous single-file schema has been split into logical components:
- All functionality remains the same
- Import paths have changed (use the new modular imports)
- The main `LCAProject` model is still available from `./schemas/project`
