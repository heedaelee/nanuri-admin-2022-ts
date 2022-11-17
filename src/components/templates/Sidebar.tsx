import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, Fab, Hidden } from "@mui/material";
import { useEffect } from "react";
import useBoolean from "../../hooks/useBoolean";
import SidebarTemplate from "./SidebarTemplate";

const Sidebar = () => {
  const handleToggleDrawer = () => {
    console.log("핸들 토글 호출");
    setOpenDrawer(!openDrawer);
  };

  const [openDrawer, setOpenDrawer] = useBoolean(false);

  return (
    <>
      {/* 1200<= 일때 아래걸 숨겨라! */}
      <Hidden lgUp>
        <>
          <Fab
            color="secondary"
            sx={{
              position: "absolute",
              top: 30,
              left: 30,
            }}
            className="menu-btn"
            aria-label="open drawer"
            onClick={() => handleToggleDrawer()}
            size="large"
          >
            <MenuIcon
              sx={{
                width: 35,
                height: 35,
              }}
            />
          </Fab>
          <Drawer
            anchor="left"
            open={openDrawer}
            onClose={() => handleToggleDrawer()}
            sx={{
              display: "flex",
              flex: "0.5 250px",
              height: "100%",
            }}
          >
            <SidebarTemplate
              handleToggleDrawer={handleToggleDrawer}
            />
          </Drawer>
        </>
      </Hidden>

      {/* 1200 > 일때 아래걸 숨겨라 */}
      <Hidden lgDown>
        <SidebarTemplate />
      </Hidden>
    </>
  );
};

export default Sidebar;
