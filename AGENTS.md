# Project Context: Production Next.js & Vercel Application

## Tech Stack & Architecture
- **Framework:** Next.js (App Router preferred, using React Server Components architecture).
- **Styling:** Tailwind CSS using utility classes. Keep layouts clean, fluid, and responsive.
- **Deployment & Hosting:** Optimized explicitly for Vercel. Keep functions lightweight to minimize edge runtime and serverless cold starts.
- **Data Handling:** Strict client/server separation. Use 'use client' directives only when event listeners, browser APIs, or state tracking are explicitly required.

## AI Agent Rules & Constraints
- **Code Generation:** When modifying code, prioritize performance-focused patterns. Provide only the changed or refactored blocks rather than outputting entire intact code files.
- **Environment Safety:** Never hardcode environment variables (`.env`). Always utilize `process.env.NEXT_PUBLIC_*` for client-facing keys or hidden backend variables.
- **Refactoring & Clean UI:** Ensure any text alignments, grid structures, or padding match modern UX standards. Avoid unnecessary dependency tracking or heavy external libraries for animations.