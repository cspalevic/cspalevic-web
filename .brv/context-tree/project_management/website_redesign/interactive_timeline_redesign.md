---
title: Interactive Timeline Redesign
tags: []
keywords: []
importance: 50
recency: 1
maturity: draft
createdAt: '2026-03-10T19:42:52.592Z'
updatedAt: '2026-03-10T19:42:52.592Z'
---
## Raw Concept
**Task:**
Redesign cspalevic.com to immersive scroll timeline

**Changes:**
- Removed WebGPU earth (three.js uninstalled)
- Added interactive timeline with Intersection Observer
- Updated header layout to justify-between
- Integrated Cloudinary for profile images

**Files:**
- components/timeline.tsx
- components/cloudinary-image.tsx
- components/header.tsx
- public/charlie-spalevic-resume.pdf

**Flow:**
scroll -> intersection observer -> trigger visibility -> transition opacity/scale

**Timestamp:** 2026-03-10

**Author:** charlie-spalevic

## Narrative
### Structure
Next.js 15, Tailwind, shadcn/ui. Immersive timeline uses Intersection Observer and React state for scroll-triggered animations.

### Dependencies
Cloudinary for image hosting, Intersection Observer API.

### Highlights
Removed heavy WebGPU components for better performance. Added smooth scroll animations (scale/fade). Resume available at /public/charlie-spalevic-resume.pdf.

### Rules
Timeline transitions: scale 0.92 to 1 on entry, fade in.

## Facts
- **tech_stack**: Redesign uses Next.js 15, Tailwind, and shadcn/ui [project]
- **removed_dependencies**: WebGPU earth and three.js removed [project]
- **timeline_implementation**: Timeline uses Intersection Observer for animations [project]
