---
children_hash: d77ee1087c1fe9fdcef34c814e14feb123d940a3eb3a7b52c4a60cc6ab78c709
compression_ratio: 0.8641304347826086
condensation_order: 1
covers: [interactive_timeline_redesign.md]
covers_token_total: 368
summary_level: d1
token_count: 318
type: summary
---
# Project Management: Website Redesign

This domain tracks the ongoing structural and aesthetic evolution of the website. Key developments are currently centered on the transition to an immersive, performance-focused layout.

## Interactive Timeline Redesign
The primary focus is the migration of the site architecture to a performance-optimized, scroll-driven experience. 

*   **Architectural Shift**: Transitioned to a Next.js 15, Tailwind, and shadcn/ui stack, explicitly removing heavy WebGPU and three.js dependencies to improve load times.
*   **Key Components**: 
    *   `components/timeline.tsx`: Implements scroll-triggered animations via the Intersection Observer API.
    *   `components/cloudinary-image.tsx`: Manages optimized media delivery.
    *   `components/header.tsx`: Updated layout logic (`justify-between`).
*   **Interaction Model**: The timeline utilizes a scroll-based flow where Intersection Observer triggers CSS transitions (scale 0.92 to 1 and opacity fade-in) upon element entry.
*   **Resources**: Updated site-wide resume availability at `public/charlie-spalevic-resume.pdf`.

For specific implementation details regarding the scroll-animation logic or component configurations, refer to the full `interactive_timeline_redesign.md` entry.