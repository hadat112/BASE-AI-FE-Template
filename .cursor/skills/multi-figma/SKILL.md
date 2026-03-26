---
name: multi-figma
description: "Generate React components from multiple Figma design links sequentially using Figma MCP. Use when given a list of Figma links to convert to components."
metadata:
  author: lab3
  version: "1.0.0"
  argument-hint: <figma-links>
---

# Figma-to-Component Generation Task (Multiple)

Generate React components from a list of Figma design links using Figma MCP.

## Workflow

1. **Process each Figma link in sequence:**
   - Read the **first link**, generate its component.
   - Then move to the **next link**, generate the next component.
   - Continue until all Figma links are completed.

## Development Requirements

### Styling
- Use **color variables** (`background`, `border`, `text`, etc.) defined in `tailwind.config.js`.
- Use **font size classes** defined in `tailwind.config.js` (e.g., `text-display-lg`, `text-heading-md`, `text-body-sm`, etc.) for typography styling.

### UI Components
- If the design includes **common UI patterns**, check the `src/components/ui` directory.
- **Reuse existing components** from `src/components` wherever possible to maintain consistency.

### Icons
- Check if icons from the Figma design already exist in the `src/components/icons` folder.
- If icons exist, import and use them from the icons index file (e.g., `import { GoogleIcon, MailIcon } from "@/components/icons";`).
- If icons don't exist, download SVGs from Figma and add them to the `src/components/icons` folder, then run:
  ```bash
  node scripts/update-icons.js && node scripts/generate-icons.js
  ```
  - `update-icons.js`: normalizes SVGs (width/height → `1em`, single-color fill/stroke → `currentColor`)
  - `generate-icons.js`: auto-generates `index.tsx` barrel exports from all `.svg` files
- **DO NOT** manually edit `src/components/icons/index.tsx` — always use the script.
- If icons can't be downloaded, create placeholder SVG files with appropriate names and run the scripts above.

## Output

For each Figma link:
- Generate a **separate, reusable React component**.
- Each component must be:
  - **Cleanly structured**
  - **Aligned with the design system** (fonts, colors, spacing)
  - **Responsive** and consistent with the design system
- Follow the existing **project folder conventions** (e.g., `components/[category]/[ComponentName].tsx`).
