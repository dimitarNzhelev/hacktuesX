export default function CleanLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center overflow-x-clip p-6">
      {children}
    </main>
  );
}
