import { Hidden } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { UserListObj } from "../../../@types/models/apps/UserList";
import AppGrid from "../../atoms/AppGrid";
import AppList from "../../atoms/AppList";
import ListEmptyResult from "../../atoms/AppList/ListEmptyResult";
import TableListSkeleton from "../../atoms/AppSkeleton/TableListSkeleton";
import TableContentGridItem from "./TableContentGridItem";
import TableContentListItem from "./TableContentListItem";
import TableContentListItemMobile from "./TableContentListItem/TableContentListItemMobile";

interface TableContentViewProps {
  userList: UserListObj[];
  pageView: string;
  loading: boolean;
  handleAddUserOpen: () => void;
  onChangeCheckedUsers: (event: any, id: number) => void;
  checkedUsers: number[];
  onSelectUsersForDelete: (userIds: number[]) => void;
  onOpenEditUser: (user: UserListObj) => void;
  onViewUserDetail: (user: UserListObj) => void;
}

const TableContentView = ({
  userList,
  pageView,
  loading,
  handleAddUserOpen,
  onChangeCheckedUsers,
  checkedUsers,
  onSelectUsersForDelete,
  onOpenEditUser,
  onViewUserDetail,
}: TableContentViewProps) => {
  return (
    <>
      {pageView === "list" ? (
        <>
          <Hidden smDown>
            <AppList
              data={userList}
              animation="transition.slideUpIn"
              sx={{
                pt: 0,
                pb: 0,
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
              // 데이터 없을때 : 랜더링되는 컴포넌트 (로딩중일때도 포함)
              ListEmptyComponent={
                <ListEmptyResult
                  loading={loading}
                  actionTitle={"유저 생성하기"}
                  onClick={handleAddUserOpen}
                  placeholder={<TableListSkeleton />}
                />
              }
              // 데이터 있을때 : 랜더링되는 컴포넌트, 아래 화살표 함수가 하나의 row를 구성함
              renderRow={(user) => (
                <TableContentListItem
                  key={user.id}
                  user={user}
                  onChangeCheckedUsers={onChangeCheckedUsers}
                  checkedUsers={checkedUsers}
                  onSelectUsersForDelete={onSelectUsersForDelete}
                  onViewUserDetail={onViewUserDetail}
                  onOpenEditUser={onOpenEditUser}
                />
              )}
            />
          </Hidden>

          <Hidden smUp>
            <AppList
              data={userList}
              animation="transition.slideUpIn"
              sx={{
                pt: 0,
                pb: 0,
                flex: 1,
                display: "flex",
                flexDirection: "column",
              }}
              ListEmptyComponent={
                <ListEmptyResult
                  loading={loading}
                  actionTitle={"유저 생성하기"}
                  onClick={handleAddUserOpen}
                  placeholder={<TableListSkeleton />}
                />
              }
              renderRow={(user) => (
                <TableContentListItemMobile
                  key={user.id}
                  user={user}
                  checkedUsers={checkedUsers}
                  onViewUserDetail={onViewUserDetail}
                  onOpenEditUser={onOpenEditUser}
                />
              )}
            />
          </Hidden>
        </>
      ) : (
        <Box
          sx={{
            px: 5,
            pt: 0.5,
            pb: 3,
          }}
        >
          <AppGrid
            responsive={{
              xs: 1,
              sm: 2,
              md: 3,
              lg: 2,
              xl: 3,
            }}
            data={userList}
            renderRow={(user) => (
              <TableContentGridItem
                key={user.id}
                user={user}
                onChangeCheckedUsers={onChangeCheckedUsers}
                checkedUsers={checkedUsers}
                onSelectUsersForDelete={onSelectUsersForDelete}
                onViewUserDetail={onViewUserDetail}
                onOpenEditUser={onOpenEditUser}
              />
            )}
          />
        </Box>
      )}
    </>
  );
};

export default TableContentView;
