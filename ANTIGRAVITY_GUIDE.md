# Antigravity Project Guide

This guide outlines the mandatory workflow, architecture, and coding standards for this project. Antigravity must follow these rules to ensure consistency and high quality.

## 1. Core Philosophy

- **Modular Architecture:** The project is strictly modular. Features are encapsulated in modules (e.g., `auth`, `chat`, `admin`).
- **Planned Approach:** **ALL** tasks must begin with a detailed `implementation_plan.md`. No code is written without an approved plan.
- **Aesthetic Excellence:** The UI must be premium, modern, and polished. "Basic" or "functional" designs are unacceptable. Use glassmorphism, smooth transitions, and curated color palettes.

## 2. Directory Structure & Architecture

### Application Code

All feature code resides in `imports/ui/modules/`.

```
imports/ui/modules/
├── [module_name]/          # e.g., auth, chat
│   ├── components/         # Reusable components specific to this module
│   │   ├── [Component].tsx
│   ├── pages/              # Page components (views)
│   │   ├── [Page].tsx
│   ├── routes.tsx          # Route definitions for this module
│   └── index.ts            # (Optional) Public API of the module
```

### Shared Resources

- `imports/ui/shared/`: Generic, reusable components used across multiple modules.

### Styling (SCSS)

Styles are located in `client/styles/`. We do **NOT** use CSS-in-JS or Tailwind unless explicitly requested.

```
client/styles/
├── components/             # Styles for specific components
│   ├── _[component].scss
├── pages/                  # Styles for specific pages
│   ├── _[page].scss
├── mix/                    # Mixins and variables
│   ├── _variables.scss     # Global variables (colors, fonts, etc.)
│   ├── _mixins.scss
└── main.scss               # Main entry point (imports all others)
```

**Conventions:**

- Use BEM (Block Element Modifier) naming convention where possible.
- Use variables from `_variables.scss` for colors, spacing, and fonts to ensure consistency.
- **Note:** Component styles should be imported in `client/main.scss` or the relevant parent file, not in the component TSX itself (Meteor handles SCSS compilation globally).

## 3. Workflow

1.  **Understand the Goal:** Read the user request and context thoroughly.
2.  **Create Implementation Plan:**
    - Create `implementation_plan.md`.
    - Outline the goal, user review items, and proposed changes (file by file).
    - **WAIT** for user approval.
3.  **Execute:**
    - Create/Update module directories (`imports/ui/modules/...`).
    - Create/Update component and page files.
    - Create/Update SCSS files in `client/styles/`.
4.  **Verify:**
    - Ensure the build passes.
    - Verify the UI looks premium and matches the design intent.

## 4. Key Implementation Details

- **Routing:** Each module has its own `routes.tsx`. The main `App.tsx` imports these routes.
- **State Management:** Use React Context or standard React state for now. Keep it simple but scalable.
- **Icons:** Use SVG icons (e.g., Lucide, Heroicons) directly or via a wrapper.
