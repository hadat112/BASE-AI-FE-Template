---
name: responsive
description: "Add responsive support to an existing component. Use when asked to make a component responsive, add mobile/tablet support, or adapt layout for different screen sizes."
metadata:
  author: lab3
  version: "1.0.0"
  argument-hint: <component-path>
---

# Responsive Update Task

Add full responsive support to an existing large-screen component for all screen sizes.

## Guidelines

- **Prioritize using Tailwind breakpoints:**
  - `md:` - Medium screens
  - `lg:` - Large screens
  - `xl:` - Extra large screens
  - `2xl:` - Ultra wide screens
- **Device ranges:**
  - **Mobile:** smaller than `md`
  - **Tablet (vertical):** smaller than `lg`
  - **Tablet (horizontal):** smaller than `xl`
  - **Desktop:** `xl` and above

## Breakpoint Reference (Based on Designer Notes)

| Device Type                   | Tailwind Screen | Width (px) | Frame Size | Description          |
| ----------------------------- | --------------- | ---------- | ---------- | -------------------- |
| Desktop (Landing / Dashboard) | `2xl`           | >=1536     | 1920x1200  | Graphic-heavy layout |
| Desktop (Default Project)     | `2xl`           | >=1536     | 1600x1000  | Recommended default  |
| Desktop (Simple App)          | `2xl`           | >=1536     | 1440x910   | Clean app layout     |
| Laptop                        | `xl`            | >=1280     | 1280x810   | Common laptop screen |
| Tablet (Horizontal)           | `lg`            | >=1024     | 1024x768   | Horizontal tablet    |
| Tablet (Vertical)             | `md`            | >=768      | 768x1024   | Vertical tablet      |
| Mobile (Portrait)             | `sm`            | >=640      | 375x812    | Standard mobile      |

## Spacing Rules

- **Tablet:** Minimum **24px** padding from screen edge
- **Mobile:** Minimum **16px** padding from screen edge

## Implementation Notes

- **Primary method:** Use **Tailwind responsive utilities** for layout, spacing, and typography.
- **Alternative method:** If Tailwind doesn't fully cover your use case, use the **`useViewSize.ts`** hook to detect screen width and apply conditional styles or layouts.

## Reference

Refer to the provided **Figma links** for visual layouts, spacing, and component structure.
