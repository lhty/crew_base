import Header from "../components/header/Header";
import { ReactElement } from "react";

interface Props {
  children?: ReactElement;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
