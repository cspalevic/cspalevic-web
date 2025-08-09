import type { MDXComponents } from "mdx/types";
import { Lightbox } from "@/components/lightbox";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Custom shadcn table components to override prose defaults
    table: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableElement>) => (
      <div className="my-6">
        <Table className={className} {...props} />
      </div>
    ),
    thead: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <TableHeader className={className} {...props} />
    ),
    tbody: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableSectionElement>) => (
      <TableBody className={className} {...props} />
    ),
    th: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableCellElement>) => (
      <TableHead
        className={cn(
          "[&[align=center]]:text-center [&[align=right]]:text-right",
          className
        )}
        {...props}
      />
    ),
    td: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableCellElement>) => (
      <TableCell
        className={cn(
          "[&[align=center]]:text-center [&[align=right]]:text-right",
          className
        )}
        {...props}
      />
    ),
    tr: ({
      className,
      ...props
    }: React.HTMLAttributes<HTMLTableRowElement>) => (
      <TableRow className={className} {...props} />
    ),
    // Custom separator to override prose hr
    hr: ({ ...props }) => <Separator className="my-4 md:my-8" {...props} />,
    // Custom image styling to preserve cursor pointer for lightbox
    img: ({
      className,
      alt,
      ...props
    }: React.ImgHTMLAttributes<HTMLImageElement>) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        className={cn("rounded-md cursor-pointer", className)}
        alt={alt}
        {...props}
      />
    ),
    // Custom wrapper using Tailwind Typography
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <article className="flex w-full h-full flex-col">
        <div className="prose dark:prose-invert max-w-none">{children}</div>
        <Lightbox />
      </article>
    ),
  };
}
