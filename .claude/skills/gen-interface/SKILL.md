---
name: gen-interface
description: "Generate TypeScript interfaces from an API response. Use when asked to create types/interfaces from API data, JSON responses, or backend payloads."
metadata:
  author: lab3
  version: "1.0.0"
  argument-hint: <api-response-json>
---

# Interface Generation Task

Generate TypeScript interfaces based on the provided API response.

## Requirements

- Define all interfaces inside the `src/interfaces/` folder.
- If a **suitable file** already exists for this type of data, **add the new interfaces there**.
- If **no appropriate file** exists, **create a new file** with a clear and descriptive name.
- Ensure interface names follow **PascalCase** conventions.
- Use **explicit typing** (`string`, `number`, `boolean`, etc.) and include **optional fields** (`?`) where applicable.

## Example Structure

```
src/interfaces/
  user.interface.ts
  product.interface.ts
  order.interface.ts
```

## Steps

1. Read the provided API response JSON.
2. Check `src/interfaces/` for existing files that match the data domain.
3. Generate interfaces with proper typing.
4. Export new interfaces and update `src/interfaces/index.ts` barrel export.
