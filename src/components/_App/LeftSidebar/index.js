import React, { useState, useEffect } from 'react';
import {
  Box
} from "@mui/material";
import { styled } from "@mui/material/styles";
import styles from "@/components/_App/LeftSidebar/SubMenu.module.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SellIcon from '@mui/icons-material/Sell';
import { useRouter } from "next/router";
import Link from 'next/link';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';

const SidebarNav = styled("nav")(({ theme }) => ({
  background: '#fff',
  boxShadow: "0px 4px 20px rgba(47, 143, 232, 0.07)",
  width: '300px',
  padding: '30px 10px',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  position: 'fixed',
  top: 0,
  left: 0,
  transition: '350ms',
  zIndex: '10',
  overflowY: 'auto'
}));
 
const SidebarWrap = styled("div")(({ theme }) => ({
  width: '100%'
}));

const SidebarLabel = styled("span")(({ theme }) => ({
  position: "relative",
  top: "-3px",
}));

const Sidebar = ({ toogleActive }) => {
  const showSubnav = () => setSubnav(!subnav);
  const [currentPath, setCurrentPath] = useState("");
  const router = useRouter();
  // console.log(router.asPath)
  const SidebarData = [
    {
      title: "Produtos",
      path: "/",
      icon: <ShoppingCartIcon />,
    },
    {
      title: "Vendas",
      path: "/sales/",
      icon: <SellIcon />,
  
    },
  ];

  useEffect(() => {
    setCurrentPath(router.asPath);
  }, [router]);
  return (
    <>
        <SidebarNav className="LeftSidebarNav">
          <SidebarWrap>
            <Box 
              sx={{ 
                mb: '20px',
                px: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >

              <IconButton 
                onClick={toogleActive} 
                size="small"
                sx={{
                  background: 'rgb(253, 237, 237)',
                  display: { lg: 'none' }
                }}
              >
                <ClearIcon />
              </IconButton>
            </Box>

            {SidebarData.map((item) => {
                return (
                  <>
                    <Link
                      href={item.path}
                      onClick={item.subNav && showSubnav}
                      className={`${styles.sidebarLink} ${
                        currentPath == item.path && "sidebarLinkActive"
                      }`}
                    >
                      <div>
                        {item.icon}
                        <SidebarLabel className="ml-1">{item.title}</SidebarLabel>
                      </div>
                      <div>
                        {item.subNav && subnav
                          ? item.iconOpened
                          : item.subNav
                          ? item.iconClosed
                          : null}
                      </div>
                    </Link>
                  </>
                );
            })}
          </SidebarWrap>
        </SidebarNav>
    </>
  );
};

export default Sidebar;
