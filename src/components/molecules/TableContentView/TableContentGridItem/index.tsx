import React from "react";
import { Card } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import BusinessIcon from "@mui/icons-material/Business";

import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";
import Theme from "../../../../lib/Theme";
import ItemMenu from "../ItemMenu";
import { styled } from "@mui/material/styles";
import { UserListObj } from "../../../../@types/models/apps/UserList";

const GridCard = styled(Card)(({ theme }) => {
  return {
    borderRadius: 16,
    border: `solid 1px ${theme.palette.grey[300]}`,
    position: "relative",
    padding: 16,
    cursor: "pointer",
    height: "100%",
    [theme.breakpoints.up("md")]: {
      padding: 20,
    },
    "&:hover": {
      "& .conActionHoverRoot": {
        opacity: 1,
        visibility: "visible",
        right: 0,
      },
      "& .conActionHoverHideRoot": {
        opacity: 0,
        visibility: "hidden",
      },
    },
  };
});

interface TableContentGridItemProps {
  user: UserListObj;
  onChangeCheckedContacts: (event: any, id: number) => void;
  checkedContacts: number[];
  onSelectContactsForDelete: (contactIds: number[]) => void;
  onOpenEditUser: (user: UserListObj) => void;
  onViewContactDetail: (user: UserListObj) => void;

  [x: string]: any;
}

const TableContentGridItem: React.FC<TableContentGridItemProps> = ({
  user,
  onChangeCheckedContacts,
  checkedContacts,
  onChangeStarred,
  onSelectContactsForDelete,
  onOpenEditUser,
  onViewContactDetail,
}) => {
  return null;
  // <GridCard
  //   className="card-hover"
  //   onClick={() => onViewContactDetail(user)}
  // >
  //   <Box
  //     sx={{
  //       mb: 1,
  //       mt: -3,
  //       display: "flex",
  //       justifyContent: "space-between",
  //     }}
  //   >
  //     <Box
  //       sx={{
  //         ml: -2,
  //       }}
  //       component="span"
  //       onClick={(event: any) => event.stopPropagation()}
  //     >
  //       <Checkbox
  //         checked={checkedContacts.includes(user.id)}
  //         onChange={(event) =>
  //           onChangeCheckedContacts(event, user.id)
  //         }
  //         color="primary"
  //       />
  //     </Box>

  //     <ItemMenu
  //       user={user}
  //       onOpenEditUser={onOpenEditUser}
  //       onSelectContactsForDelete={onSelectContactsForDelete}
  //     />
  //   </Box>

  //   <Box
  //     sx={{
  //       mb: { xs: 3, lg: 4, xl: 5 },
  //       display: "flex",
  //       alignItems: "center",
  //     }}
  //   >
  //     {user.image ? (
  //       <Avatar
  //         sx={{
  //           width: 46,
  //           height: 46,
  //           backgroundColor: blue[500],
  //         }}
  //         src={user.image}
  //       />
  //     ) : (
  //       <Avatar
  //         sx={{
  //           width: 46,
  //           height: 46,
  //           backgroundColor: blue[500],
  //         }}
  //       >
  //         {user.name[0].toUpperCase()}
  //       </Avatar>
  //     )}
  //     <Box
  //       sx={{
  //         ml: 4,
  //         width: "calc(100% - 65px)",
  //       }}
  //     >
  //       <Box
  //         component="p"
  //         sx={{
  //           fontWeight: Theme.fonts.fontWeight.MEDIUM,
  //           fontSize: 14,
  //         }}
  //       >
  //         {user.name}
  //       </Box>
  //       <Box
  //         component="p"
  //         sx={{
  //           fontSize: 14,
  //           color: "text.secondary",
  //           overflow: "hidden",
  //           textOverflow: "ellipsis",
  //           whiteSpace: "nowrap",
  //         }}
  //       >
  //         {user.email ? user.email : null}
  //       </Box>
  //     </Box>
  //   </Box>

  //   <Box
  //     sx={{
  //       pt: 2,
  //       fontSize: 13,
  //       borderTop: (theme) => `1px solid ${theme.palette.divider}`,
  //     }}
  //   >
  //     <Box
  //       sx={{
  //         py: 2,
  //         display: "flex",
  //         alignItems: "center",
  //       }}
  //     >
  //       <BusinessIcon
  //         sx={{
  //           fontSize: 20,
  //         }}
  //       />
  //       <Box
  //         sx={{
  //           ml: 3.5,
  //         }}
  //         component="p"
  //       >
  //         {user.company ? (
  //           user.company
  //         ) : (
  //           <IntlMessages id="common.na" />
  //         )}
  //       </Box>
  //     </Box>
  //     <Box
  //       sx={{
  //         pt: 2,
  //         display: "flex",
  //         alignItems: "center",
  //       }}
  //     >
  //       <PhoneOutlinedIcon
  //         sx={{
  //           fontSize: 20,
  //         }}
  //       />
  //       <Box
  //         sx={{
  //           ml: 3.5,
  //         }}
  //         component="p"
  //       >
  //         {user.contact}
  //       </Box>
  //     </Box>
  //   </Box>
  // </GridCard>
};

export default TableContentGridItem;
