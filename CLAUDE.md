# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build production application
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Project Architecture

This is Charlie Spalevic's personal website built with **Next.js 15** (App Router), **React 19**, TypeScript, and Tailwind CSS.

### Key Architectural Patterns

**Content Management System**: The site uses a pluggable content architecture with two implementations:

- **LocalContentServer** (development) - Reads markdown files from `content/blog/` directory
- **RemoteContentServer** (production) - Fetches content via GitHub API using Vercel environment variables

Content switching happens automatically in `lib/content/index.ts` based on `NODE_ENV`.

**Theme System**: Implements server-side theme detection with client-side toggle:

- Theme detection logic in `lib/theme/detection.ts`
- Theme toggle component updates cookies and applies CSS classes
- Uses Tailwind's dark mode with `dark:` prefix classes

**Blog System**:

- Blog posts stored as markdown in `content/blog/[slug]/index.md`
- Frontmatter metadata extracted for listings
- Markdown converted to HTML with syntax highlighting via highlight.js
- Dynamic routing via `app/blog/[slug]/page.tsx`

### File Organization

- `app/` - Next.js App Router pages and layouts
- `components/` - Reusable React components
- `lib/` - Utility functions and business logic
- `content/blog/` - Markdown blog posts (development)
- `types/` - TypeScript type definitions

### Dependencies Notes

- Uses **@vercel/analytics** and **@vercel/speed-insights** for monitoring
- **@octokit/rest** for GitHub API integration
- **marked** + **dompurify** + **highlight.js** for markdown processing
- **dayjs** for date handling
- **yet-another-react-lightbox** for image galleries

### Environment Behavior

Production builds automatically use GitHub API to fetch content, leveraging Vercel's built-in environment variables (`VERCEL_GIT_REPO_OWNER`, `VERCEL_GIT_REPO_SLUG`, `VERCEL_GIT_COMMIT_REF`).
