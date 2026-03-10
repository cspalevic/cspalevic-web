---
children_hash: 7f945c2a76cccba4fd512796a411f8c2ec0d8dc4014f0f5aea33af0311863b50
compression_ratio: 0.7135416666666666
condensation_order: 2
covers: [website_redesign/_index.md]
covers_token_total: 384
summary_level: d2
token_count: 274
type: summary
---
# Project Management: Website Redesign

This domain tracks the structural and aesthetic evolution of the website, focusing on a transition to a performance-optimized, scroll-driven architecture.

## Interactive Timeline Redesign
The core project entails migrating the site to a Next.js 15, Tailwind, and shadcn/ui stack, prioritizing lightweight performance by removing heavy WebGPU and three.js dependencies.

* Architectural Shift: Implementation centers on scroll-triggered animations using the Intersection Observer API.
* Key Components:
    * `components/timeline.tsx`: Manages scroll-based animation logic.
    * `components/cloudinary-image.tsx`: Handles optimized media delivery.
    * `components/header.tsx`: Standardized layout logic for improved responsiveness.
* Interaction Model: Elements transition via scale and opacity changes triggered by Intersection Observer entry.
* Resources: Updated resume available at `public/charlie-spalevic-resume.pdf`.

For detailed implementation logic and specific component configurations, refer to the full Interactive Timeline Redesign entry.