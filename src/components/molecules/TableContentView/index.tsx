import { Hidden } from "@mui/material";
import { postObj_res } from "../../../@types/models/apps/PostList";
import { UserObj_res } from "../../../@types/models/apps/UserList";
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
  onChangeCheckedUsers?: (event: any, id: string) => void;
  onChangeCheckedPosts?: (event: any, id: string) => void;
  checkedItems: any[];
  onSelectItemsForDelete: (itemIds: any[]) => void;
  onOpenEditItem: (item: UserObj_res | any) => void;
  onViewItemDetail: (item: any) => void;
  type: "USERLIST" | "POSTLIST";
}

// NOTE:UserList | PostList 둘다 쓰는 공통 컴포넌트
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
  console.log("====================================");
  console.dir(list);
  console.log("====================================");

  return (
    // 스마트폰보다 클떄
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
          // 데이터 없을때 : 랜더링되는 컴포넌트 (로딩중일때도 포함) -> TableListSkeleton
          ListEmptyComponent={
            <ListEmptyResult
              loading={loading}
              actionTitle={"유저 생성하기"}
              onClick={handleAddModalOpen}
              placeholder={<TableListSkeleton />}
            />
          }
          // 데이터 있을때 : 랜더링되는 컴포넌트, 아래 화살표 함수가 하나의 row를 구성함
          renderRow={(item: UserObj_res | postObj_res) =>
            type === "USERLIST" ? (
              <UserListTableItem
                key={item.uuid}
                user={item as UserObj_res}
                onChangeCheckedUsers={onChangeCheckedUsers!}
                checkedUsers={checkedItems}
                onSelectUsersForDelete={onSelectItemsForDelete}
                onViewUserDetail={onViewItemDetail}
                onOpenEditUser={onOpenEditItem}
              />
            ) : type === "POSTLIST" ? (
              <PostListTableItem
                key={item.uuid}
                post={item as postObj_res}
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

      {/* 스마트폰일떄 */}
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
            border: "1px solid red",
            // height: "100vh",
          }}
          ListEmptyComponent={
            <ListEmptyResult
              loading={loading}
              actionTitle={"유저 생성하기"}
              onClick={handleAddModalOpen}
              placeholder={<TableListSkeleton />}
            />
          }
          renderRow={(item, index) =>
            type === "USERLIST" ? (
              <UserListTableItemMobile
                key={item.uuid}
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
