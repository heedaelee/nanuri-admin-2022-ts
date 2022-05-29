import React from "react";
import Box from "@mui/material/Box";
// import ContactGridItem from "./ContactGridItem";

import AppGrid from "@crema/core/AppGrid";

import { Hidden } from "@mui/material";
import TableContentListItemMobile from "./TableContentListItem/TableContentListItemMobile";
import { UserListObj } from "../../../@types/models/apps/UserList";
import AppList from "../../atoms/AppList";
import ListEmptyResult from "../../atoms/AppList/ListEmptyResult";
import TableListSkeleton from "../../atoms/AppSkeleton/TableListSkeleton";

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
              renderRow={(contact) => (
                <ContactListItem
                  key={contact.id}
                  contact={contact}
                  labelList={labelList as LabelObj[]}
                  onChangeCheckedContacts={onChangeCheckedContacts}
                  checkedContacts={checkedContacts}
                  onSelectContactsForDelete={
                    onSelectContactsForDelete
                  }
                  onChangeStarred={onChangeStarred}
                  onViewContactDetail={onViewContactDetail}
                  onOpenEditContact={onOpenEditContact}
                />
              )}
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
                  actionTitle={
                    <IntlMessages id="contactApp.createContact" />
                  }
                  onClick={handleAddContactOpen}
                  placeholder={<ContactListSkeleton />}
                />
              }
              renderRow={(contact) => (
                <TableContentListItemMobile
                  key={contact.id}
                  contact={contact}
                  checkedContacts={checkedContacts}
                  labelList={labelList as LabelObj[]}
                  onChangeStarred={onChangeStarred}
                  onViewContactDetail={onViewContactDetail}
                  onOpenEditContact={onOpenEditContact}
                />
              )}
            />
          </Hidden>
        </>
      ) : null}
    </>
  );
};

export default TableContentView;
