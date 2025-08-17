import { Footer } from "@/modules/home/ui/components/footer";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <main className="flex flex-col min-h-screen max-h-screen justify-center items-center">
      <div className="flex flex-1">{children}</div>
      <Footer />
    </main>
  );
};

export default Layout;
