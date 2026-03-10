---
children_hash: ceac0286114459add043edecee1083eb41e1df298f3151c79d398a8db88831b6
compression_ratio: 0.7869822485207101
condensation_order: 3
covers: [project_management/_index.md]
covers_token_total: 338
summary_level: d3
token_count: 266
type: summary
---
# Project Management: Website Redesign (Summary Level D3)

This domain encompasses the architectural migration of the web portfolio to a Next.js 15, Tailwind, and shadcn/ui stack. The primary objective is performance optimization through the removal of high-overhead dependencies (WebGPU/three.js) in favor of native browser APIs.

### Architecture and Implementation
The redesign replaces complex rendering engines with an interaction model driven by the Intersection Observer API. This approach manages scroll-based animations (scale/opacity transitions) to maintain lightweight performance.

### Key Components
* `components/timeline.tsx`: Core logic for scroll-triggered animation sequences.
* `components/cloudinary-image.tsx`: Optimized media delivery interface.
* `components/header.tsx`: Standardized, responsive layout management.

### Resources and Assets
* Resume: `public/charlie-spalevic-resume.pdf`

For granular implementation details, component-level configurations, and specific animation logic, refer to the Interactive Timeline Redesign entry.