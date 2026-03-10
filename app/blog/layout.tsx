export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container py-6 text-left">{children}</div>;
}
