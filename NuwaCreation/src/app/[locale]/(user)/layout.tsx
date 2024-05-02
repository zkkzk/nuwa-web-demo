export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-screen h-screen bg-black">
      {children}
    </main>
  );
}
