import MenuIcon from "@mui/icons-material/Menu";
import { Drawer, Fab, Hidden } from "@mui/material";
import { flexbox } from "@mui/system";
import useBoolean from "../../hooks/useBoolean";
import SidebarTemplate from "./SidebarTemplate";

interface SidebarProps {}

const Sidebar = () => {
  const handleToggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const [openDrawer, setOpenDrawer] = useBoolean(false);

  return (
    <>
      {/* 1200<= 일때 서랍 아이콘 보여주고, 사이드메뉴 숨기기 */}
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
                // border: "1px solid",
              }}
            />
          </Fab>
          <Drawer
            anchor="left"
            open={openDrawer}
            onClick={() => handleToggleDrawer()}
            onClose={() => handleToggleDrawer()}
            sx={{
              display: "flex",
              flex: "0.5 250px",
              height: "100%",
            }}
          >
            <SidebarTemplate />
          </Drawer>
        </>
      </Hidden>

      {/* 1200 > 일때 서랍 없애고 사이드 메뉴 보여주기 */}
      <Hidden lgDown>
        <SidebarTemplate />
      </Hidden>
    </>
  );
};

export default Sidebar;
