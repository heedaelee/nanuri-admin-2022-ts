import { Hidden } from "@mui/material";
import React from "react";
import { UserListObj } from "../../../@types/models/apps/UserList";
import AppList from "../../atoms/AppList";
import ListEmptyResult from "../../atoms/AppList/ListEmptyResult";
import TableListSkeleton from "../../atoms/AppSkeleton/TableListSkeleton";
import PostListTableItem from "./PostListTableItem";
import PostListTableItemMobile from "./PostListTableItem/PostListTableItemMobile";
import UserListTableItem from "./UserListTableItem";
import UserListTableItemMobile from "./UserListTableItem/UserListTableItemMobile";

interface TableContentViewProps {
  list: any[];
  loading: boolean;
  handleAddModalOpen: () => void;
  onChangeCheckedUsers?: (event: any, id: number) => void;
  onChangeCheckedPosts?: (event: any, id: string) => void;
  checkedItems: any[];
  onSelectItemsForDelete: (itemIds: any[]) => void;
  onOpenEditItem: (item: UserListObj | any) => void;
  onViewItemDetail: (item: any) => void;
  type: "USERLIST" | "POSTLIST";
}

const TableContentView = ({
  type,
  list,
  loading,
  handleAddModalOpen,
  onChangeCheckedUsers,
  onChangeCheckedPosts,
  checkedItems,
  onSelectItemsForDelete,
  onOpenEditItem,
  onViewItemDetail,
}: TableContentViewProps) => {
  return (
    <>
      <Hidden smDown>
        <AppList
          data={list}
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
              onClick={handleAddModalOpen}
              placeholder={<TableListSkeleton />}
            />
          }
          // 데이터 있을때 : 랜더링되는 컴포넌트, 아래 화살표 함수가 하나의 row를 구성함
          renderRow={(item: any) =>
            type === "USERLIST" ? (
              <UserListTableItem
                key={item.id}
                user={item}
                onChangeCheckedUsers={onChangeCheckedUsers!}
                checkedUsers={checkedItems}
                onSelectUsersForDelete={onSelectItemsForDelete}
                onViewUserDetail={onViewItemDetail}
                onOpenEditUser={onOpenEditItem}
              />
            ) : type === "POSTLIST" ? (
              <PostListTableItem
                key={item.uuid}
                post={item}
                onChangeCheckedPosts={onChangeCheckedPosts!}
                checkedPosts={checkedItems}
                onSelectPostsForDelete={onSelectItemsForDelete}
                onViewPostDetail={onViewItemDetail}
                onOpenEditPost={onOpenEditItem}
              />
            ) : (
              <></>
            )
          }
        />
      </Hidden>
      <Hidden smUp>
        <AppList
          data={list}
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
              onClick={handleAddModalOpen}
              placeholder={<TableListSkeleton />}
            />
          }
          renderRow={(item) =>
            type === "USERLIST" ? (
              <UserListTableItemMobile
                key={item.id}
                user={item}
                checkedUsers={checkedItems}
                onViewUserDetail={onViewItemDetail}
                onOpenEditUser={onOpenEditItem}
              />
            ) : type === "POSTLIST" ? (
              <PostListTableItemMobile
                key={item.uuid}
                post={item}
                checkedPosts={checkedItems}
                onViewPostDetail={onViewItemDetail}
                onOpenEditPost={onOpenEditItem}
              />
            ) : (
              <></>
            )
          }
        />
      </Hidden>
    </>
  );
};

export default TableContentView;
