import React, { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import LeftSidebar from "@/components/_App/LeftSidebar";

const Layout = ({ children }) => {
  const router = useRouter();

  const [active, setActive] = useState(false);

  const toogleActive = () => {
    setActive(!active);
  };

  return (
    <>
      <Head>
        <title>
          Controle vendas e estoque
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className={`main-wrapper-content ${active && "active"}`}>
        <LeftSidebar toogleActive={toogleActive} />
        <div className="main-content">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
