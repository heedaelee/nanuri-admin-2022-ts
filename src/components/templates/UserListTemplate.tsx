import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { UserListObj } from "../../@types/models/apps/UserList";
import useBoolean from "../../hooks/useBoolean";
import useInput from "../../hooks/useInput";
//NOTE: mock 데이터 가져오는 법, servcies/apis ~ 에서 맞는 mock data import해서 가져온다.
// 미리 실행만 되면 됨.
import "../../services/apis/userList/index";
import AppsHeader from "../atoms/ AppsHeader";
import AppsContent from "../atoms/AppsContent";
import Card from "../atoms/Card";
// import {Axios} from '../../services/apis/MockConfig'
import CreateUser from "../molecules/CreateUsers";
import TableContentView from "../molecules/TableContentView";
import TableHeader from "../molecules/TableHeader";

interface UserListTemplateProps {}

const UsersListTemplate = ({}: UserListTemplateProps) => {
  const { pathname } = useLocation();

  //
  const [filterText, onSetFilterText] = useInput("");
  //페이지 넘버
  const [page, setPage] = useState(0);
  //page가 list일지 카드 일지 판단
  const [pageView, setPageView] = useState<string>("list");
  //체크된 버튼 ids 데이터화 (num array)
  const [checkedUsers, setCheckedUsers] = useState<number[]>([]);
  //체크버튼(for 삭제) 입력
  const [toDeleteUsers, setToDeleteUsers] = useState<number[]>([]);

  /** 모달 */
  //삭제
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useBoolean(false);
  //수정, not 추가
  const [isAddUser, onSetIsAddUser] = useBoolean(false);
  //상세
  const [isShowDetail, onShowDetail] = useState<boolean>(false);
  //상세, 수정 선택된 유저 데이터 기록하기
  const [selectedUser, setSelectedUser] =
    useState<UserListObj | null>(null);

  //로딩
  const [loading, setLoading] = useBoolean(false);

  //UserList데이터
  const [userList, setUserList] = useState<UserListObj[] | []>([]);
  //총 유저수
  const [totalUsers, setTotalUsers] = useState(0);

  // useEffect(() => {
  //   setPage(0);
  // }, [pathname]);

  /*기능 :  userList 받아옴 */
  useEffect(() => {
    console.log("useEffect");
    onGetUserList(page);
  }, [page, pageView]);

  /*기능 : 모달 오픈 - 유저수정 */
  const handleAddUserOpen = () => {
    onSetIsAddUser(true);
  };

  /*기능 : 모달 닫음 - 유저수정 */
  const handleAddUserClose = () => {
    onSetIsAddUser(false);
  };

  /*기능 : 모달 오픈, 데이터 전달 - 유저 상세 */
  const onViewUserDetail = (user: UserListObj) => {
    setSelectedUser(user);
    onShowDetail(true);
  };

  /*기능 : 모달 오픈, 데이터 전달 - 유저 상세 */
  const onOpenEditUser = (user: UserListObj | null) => {
    setSelectedUser(user);
    onShowDetail(true);
    handleAddUserOpen();
  };

  /*기능 : 페이지 변경*/
  const onPageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    value: number
  ) => {
    // console.log(`val : ${value}`);
    setPage(value);
  };

  /*기능 : 페이지 view 변경, list <-> card, 요거 색다름 */
  const onChangePageView = (view: string) => {
    setPageView(view);
  };

  /*기능 : 체크된 유저 기록 */
  const onChangeCheckedUsers = (event: any, id: number) => {
    // 현재 checkbox에 체크되어있으면, 배열에 추가
    if (event.target.checked) {
      setCheckedUsers(checkedUsers.concat(id));
    } else {
      //안되어 있으면
      setCheckedUsers(checkedUsers.filter((userId) => userId !== id));
    }
  };

  /*기능 : 수정 모달 완료 후 state에 기록 & 모달 닫기 */
  // const onUpdateUser = (user: UserListObj) => {
  //   setSelectedUser(user);
  //   handleAddUserClose();
  // };

  /*기능 : 검색후 해당되는 리스트 자료 배열로 리턴 */
  const onGetFilteredItems = () => {
    if (filterText === "") {
      return userList;
    } else {
      return userList.filter((user) =>
        user.name.toUpperCase().includes(filterText.toUpperCase())
      );
    }
  };

  /*기능 : 선택된 유저 삭제 위한 비동기 통신, 모달 닫기 / 삭제확인, userList 자료 초기화*/
  const onDeleteSelectedUsers = () => {
    Axios.get("/api/userlist/delete", {
      data: { userIds: toDeleteUsers, page: page },
    }).then((data: any) => {
      if (data.list) {
        console.log("dataList 받고 전체 state에 set함");
        setUserList(data.list);
      } else {
        console.log("dataList 받는 부분 에러");
      }
    });

    setDeleteDialogOpen(false);
    setCheckedUsers([]);
  };

  /*기능 : 삭제할 유저 set, 삭제 모달 open*/
  const onSelectUsersForDelete = (userIds: number[]) => {
    setToDeleteUsers(userIds);
    setDeleteDialogOpen(true);
  };

  /*기능 : 검색 적용된 userList를 리턴함 */
  const list = onGetFilteredItems();

  /*기능 : 조회 UserList */
  function onGetUserList(currentPage?: number) {
    console.log("onGetUserList 호출");

    const page = currentPage ? currentPage : 0;
    Axios.get("/api/userlist", { params: { page: page } }).then(
      ({ data, status }) => {
        if (status === 200) {
          console.log("dataList 받고 전체 state에 set함");
          // console.dir(data);

          //NOTE: 테이블 리스트 리랜더링 셋트!
          setUserList(data.list);
          setTotalUsers(data.total);
        } else {
          console.log("not status 200, dataList 받는 부분 에러");
        }
      }
    );
  }

  return (
    <Container>
      <Card
        style={{
          height: "100%",
          width: "100%",
          flexDirection: "column",
          justifyContent: "flex-start",
          padding: 0,

          // border: "1px solid",
        }}
      >
        <div style={{ width: "100%" }}>
          <AppsHeader>
            {/* 추가 모달은 Header 안에 */}
            <TableHeader
              userList={list}
              totalUsers={totalUsers}
              checkedUsers={checkedUsers}
              setCheckedUsers={setCheckedUsers}
              filterText={filterText}
              onSelectUsersForDelete={onSelectUsersForDelete}
              onSetFilterText={onSetFilterText}
              onPageChange={onPageChange}
              page={page}
              onChangePageView={onChangePageView}
              pageView={pageView}
              onGetList={onGetUserList}
            />
          </AppsHeader>
        </div>
        <AppsContent>
          <TableContentView
            userList={list}
            loading={loading}
            pageView={pageView}
            handleAddUserOpen={handleAddUserOpen}
            onChangeCheckedUsers={onChangeCheckedUsers}
            checkedUsers={checkedUsers}
            onSelectUsersForDelete={onSelectUsersForDelete}
            onViewUserDetail={onViewUserDetail}
            onOpenEditUser={onOpenEditUser}
          />
        </AppsContent>

        {/* 수정 모달임, 추가는 헤더 버튼에.. */}
        <CreateUser
          isAddUser={isAddUser}
          handleAddUserClose={handleAddUserClose}
          selectedUser={selectedUser}
          //redux 안쓰니.. 아래값 넘겨줘야..
          totalUsers={totalUsers}
          setSelectedUser={setSelectedUser}
          onGetList={onGetUserList}
        />

        {/* 상세 모달임 */}
        <UserDetail
          selectedUser={selectedUser}
          isShowDetail={isShowDetail}
          onShowDetail={onShowDetail}
          onSelectUsersForDelete={onSelectUsersForDelete}
          onOpenEditUser={onOpenEditUser}
        />
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
