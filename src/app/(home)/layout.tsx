interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return <main className="">{children}</main>;
};

export default Layout;
