import { Footer } from "@/modules/home/ui/components/footer";
import { Header } from "@/modules/home/ui/components/header";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <main className="flex flex-col min-h-screen items-center justify-center gap-y-10">
      <Header />
      <div className="flex flex-1">{children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
