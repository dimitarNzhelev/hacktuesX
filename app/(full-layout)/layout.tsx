import { Footer } from "../components/footer";
import { Header } from "../components/header/header";
import { Separator } from "../components/ui/separator";
import { Toaster } from "../components/ui/toaster";

export default function FullLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex h-full flex-1 flex-col items-center justify-start overflow-x-clip p-6">
        {children}
      </main>
      <Toaster />
      <Separator />
      <Footer />
    </div>
  );
}
