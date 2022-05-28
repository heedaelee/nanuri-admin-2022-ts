import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { UserListObj } from "../../@types/models/apps/UserList";
import useBoolean from "../../hooks/useBoolean";
import useInput from "../../hooks/useInput";
import Theme from "../../lib/Theme";
import AppsHeader from "../atoms/ AppsHeader";
import AppsContent from "../atoms/AppsContent";
import Card from "../atoms/Card";
import TableContent from "../molecules/TableContet";
import TableHeader from "../molecules/TableHeader";
import mock from "../../services/apis/MockConfig";
import Axios from "axios";
// import {Axios} from '../../services/apis/MockConfig'

//NOTE: mock 데이터 가져오는 법, servcies/apis ~ 에서 맞는 mock data import해서 가져온다.
// 미리 실행만 되면 됨.
import "../../services/apis/userList/index";

interface UserListTemplateProps {}

const UsersListTemplate = ({}: UserListTemplateProps) => {
  const { pathname } = useLocation();

  //
  const [filterText, onSetFilterText] = useInput("");
  //페이지 넘버
  const [page, setPage] = useState(0);
  //page가 list일지 카드 일지 판단
  const [pageView, setPageView] = useState<string>("list");
  //체크버튼 입력
  const [checkedUsers, setCheckedUsers] = useState<number[]>([]);
  //체크버튼(for 삭제) 입력
  const [toDeleteUsers, setToDeleteUsers] = useState<number[]>([]);

  /** 모달 */
  //삭제
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useBoolean(false);
  //추가
  const [isAddUser, onSetIsAddUser] = useBoolean(false);
  //상세
  const [isShowDetail, onShowDetail] = useState<boolean>(false);
  //상세, 수정 모달에서 user정보 get | set 기능
  const [selectedUser, setSelectedUser] =
    useState<UserListObj | null>(null);

  //로딩
  const [loading, setLoading] = useBoolean(false);

  // useEffect(() => {
  //   setPage(0);
  // }, [pathname]);

  /*기능 :  userList 받아옴 */
  useEffect(() => {
    console.log("test");
    onGetUserList();
  }, []);


  /*기능 : 유저 추가 모달 오픈 */
  const handleAddUserOpen = () => {
    onSetIsAddUser(true);
  }

  

  



  function onGetUserList(currentPage?: number) {
    const page = currentPage ? currentPage : 0;
    Axios.get("/api/userlist", { params: { page: page } }).then(
      (data) => console.dir(data)
    );
  }

  return (
    <Container>
      <Card
        style={{
          height: "fit-content",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: 0,
          // border: "1px solid",
        }}
      >
        <div style={{ width: "100%" }}>
          <AppsHeader>
            <TableHeader
              checkedUsers={checkedUsers}
              setCheckedUsers={setCheckedUsers}
              filterText={filterText}
              onSelectUsersForDelete={onSelectUsersForDelete}
              onSetFilterText={onSetFilterText}
              onPageChange={onPageChange}
              page={page}
              onChangePageView={onChangePageView}
              pageView={pageView}
            />
          </AppsHeader>
          <AppsContent>
            <TableContent
              list={list}
              loading={loading}
              pageView={pageView}
              handleAddUserOpen={handleAddUserOpen}
              onChangeCheckedUsers={onChangeCheckedUsers}
              // onChangeStarred={onChangeStarred}
              checkedUsers={checkedUsers}
              onSelectUsersForDelete={onSelectUsersForDelete}
              onViewUserDetail={onViewUserDetail}
              onOpenEditUser={onOpenEditUser}
            />
          </AppsContent>
        </div>
      </Card>
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  /* border: 1px solid black; */
  display: flex;
  flex: 1;
  flex-direction: column;
`;
export default UsersListTemplate;
