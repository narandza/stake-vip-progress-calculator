import { Footer } from "@/modules/home/ui/components/footer";
import { Header } from "@/modules/home/ui/components/header";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <main className="flex flex-col min-h-screen bg-background text-foreground gap-y-10">
      <Header />
      <div className="flex-1 flex justify-center">
        <div className="w-full max-w-xs">{children}</div>
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
