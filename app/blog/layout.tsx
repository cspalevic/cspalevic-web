export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="text-left">{children}</div>;
}
