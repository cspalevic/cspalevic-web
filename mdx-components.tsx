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
import { cn } from "cnfast";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,

    h1: ({ className, ...props }) => (
      <h1
        className={cn(
          "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
          className,
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          "mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0",
          className,
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
          className,
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn(
          "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
          className,
        )}
        {...props}
      />
    ),
    h5: ({ className, ...props }) => (
      <h5
        className={cn(
          "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
          className,
        )}
        {...props}
      />
    ),
    h6: ({ className, ...props }) => (
      <h6
        className={cn(
          "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
          className,
        )}
        {...props}
      />
    ),
    a: ({ className, ...props }) => (
      <a
        className={cn("font-medium underline underline-offset-4", className)}
        {...props}
      />
    ),
    p: ({ className, ...props }) => (
      <p
        className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
        {...props}
      />
    ),
    ul: ({ className, ...props }) => (
      <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
    ),
    ol: ({ className, ...props }) => (
      <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
    ),
    li: ({ className, ...props }) => (
      <li className={cn("mt-2", className)} {...props} />
    ),
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
          className,
        )}
        {...props}
      />
    ),

    pre: ({ className, ...props }) => (
      <pre
        className={cn(
          "mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4",
          className,
        )}
        {...props}
      />
    ),
    code: ({ className, ...props }) => (
      <code
        className={cn(
          "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
          className,
        )}
        {...props}
      />
    ),
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
          className,
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
          className,
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
      // oxlint-disable-next-line nextjs/no-img-element
      <img
        className={cn("rounded-md cursor-pointer", className)}
        alt={alt}
        {...props}
      />
    ),
    // Custom wrapper using Tailwind Typography
    wrapper: ({ children }: { children: React.ReactNode }) => (
      <>
        {children}
        <Lightbox />
      </>
    ),
  };
}
