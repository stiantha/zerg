export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {children}
    </div>
  );
} 