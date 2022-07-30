// import { Axios } from "../../services/apis/MockConfig";
import React, { useEffect, useState } from "react";
import {
  UserObj_res,
  userListObj,
  UserObj_req,
} from "../../@types/models/apps/UserList";
import useBoolean from "../../hooks/useBoolean";
import useInput from "../../hooks/useInput";
//NOTE: mock 데이터 가져오는 법, servcies/apis ~ 에서 맞는 mock data import해서 가져온다.
// 미리 실행만 되면 됨.
import "../../services/apis/userList/index";
import AppsHeader from "../atoms/ AppsHeader";
import AppConfirmDialog from "../atoms/AppConfirmDialog";
import AppsContent from "../atoms/AppsContent";
import TableContentView from "../molecules/TableContentView";
import CreateUser from "../molecules/UserCreate";
import UserDetail from "../molecules/UserDetail";
import UserListTableHeader from "../molecules/UserListTableHeader";
import AppContainer from "../organisms/AppContainer";
import { User } from "../../lib/apiSite/apiSite";
import Theme from "../../lib/Theme";
import DjangoAxios from "../../lib/apiSite/axios";

interface UserListTemplateProps {}

const UsersListTemplate = ({}: UserListTemplateProps) => {
  // const { pathname } = useLocation();

  //
  const [filterText, onSetFilterText] = useInput("");
  //페이지 넘버
  const [page, setPage] = useState(0);

  //체크된 버튼 ids 데이터화 (num array)
  const [checkedUsers, setCheckedUsers] = useState<string[]>([]);
  //체크버튼(for 삭제) 입력
  const [usersToDelete, setUsersToDelete] = useState<string[]>([]);

  /** 모달 */
  //삭제
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useBoolean(false);
  //수정, not 추가
  const [isAddUser, onSetIsAddUser] = useBoolean(false);
  //상세
  const [isShowDetail, onShowDetail] = useState<boolean>(false);
  //상세, 수정 선택된 유저 데이터 기록하기
  const [selectedUser, setSelectedUser] = useState<
    UserObj_req | UserObj_res | null
  >(null);

  //로딩
  const [loading, setLoading] = useBoolean(false);

  //UserList데이터
  const [userList, setUserList] = useState<
    userListObj["results"] | []
  >([]);
  //총 유저수
  const [totalUsers, setTotalUsers] = useState<number>(0);

  // useEffect(() => {
  //   setPage(0);
  // }, [pathname]);

  /*기능 :  userList 받아옴 */
  useEffect(() => {
    console.log("useEffect");
    onGetUserList(page);
  }, [page]);

  /*기능 : 모달 오픈 - 유저수정 */
  const handleAddUserOpen = () => {
    onSetIsAddUser(true);
  };

  /*기능 : 모달 닫음 - 유저수정 */
  const handleAddUserClose = () => {
    onSetIsAddUser(false);
  };

  /*기능 : 모달 오픈, 데이터 전달 - 유저 상세 */
  const onViewUserDetail = (user: UserObj_res) => {
    setSelectedUser(user);
    onShowDetail(true);
  };

  /*기능 : 모달 오픈, 데이터 전달 - 유저 추가/수정 */
  const onOpenEditUser = (user: UserObj_req | null) => {
    setSelectedUser(user);
    onShowDetail(false);
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

  /*기능 : 체크된 유저 기록 */
  const onChangeCheckedUsers = (event: any, id: string) => {
    // 현재 checkbox에 체크되어있으면, 배열에 추가
    if (event.target.checked) {
      setCheckedUsers(checkedUsers.concat(id));
    } else {
      //안되어 있으면
      setCheckedUsers(checkedUsers.filter((userId) => userId !== id));
    }
  };

  /*기능 : 검색후 해당되는 리스트 자료 배열로 리턴 
    검색은 사실상 백엔드랑 협의해 쿼리 api 따로 만들어야 함.<임시>임
  */
  const onGetFilteredItems = () => {
    if (filterText === "") {
      return userList;
    } else {
      return userList.filter(
        (user) =>
          user.nickname
            ?.toUpperCase()
            .includes(filterText.toUpperCase()) ||
          user.email
            .toUpperCase()
            .includes(filterText.toUpperCase()) ||
          user.address
            ?.toUpperCase()
            .includes(filterText.toUpperCase()) ||
          user.uuid.toString().includes(filterText.toUpperCase())
      );
    }
  };

  /*기능 : 삭제할 유저 set, 삭제 모달 open*/
  const onSelectUsersForDelete = (userIds: string[]) => {
    setUsersToDelete(userIds);
    setDeleteDialogOpen(true);
  };

  /*기능 : 검색 적용된 userList를 리턴함 */
  const list = onGetFilteredItems();

  /** 통신
   * Type: GET
   * To:우리 서버,
   * For:userList 데이터 받기
   * */
  function onGetUserList(currentPage?: number) {
    console.log("onGetUserList 호출");

    // const page = currentPage ? currentPage : 0;
    // Axios.get("/api/userlist", { params: { page: page } }).then(
    //   ({ data, status }) => {
    //     if (status === 200) {
    //       console.log("dataList 받고 전체 state에 set함");
    //       // console.dir(data);

    //       //NOTE: 테이블 리스트 리랜더링 셋트!
    //       setUserList(data.list);
    //       setTotalUsers(data.total);
    //     } else {
    //       console.log("not status 200, dataList 받는 부분 에러");
    //     }
    //   }
    // );

    const limit = Theme.numOfItemsPerPage;
    const pageNum = currentPage ? currentPage : 0;
    const offset = pageNum * limit;

    DjangoAxios.get(User.ALL, {
      params: { limit: limit, offset: offset },
    }).then(({ data, status }) => {
      if (status === 200) {
        console.log("dataList 받고 전체 state에 set함");
        console.dir(data);
        //NOTE: 테이블 리스트 리랜더링 셋트!
        setUserList(data.results);
        setTotalUsers(data.count);
      } else {
        console.log("not status 200, dataList 받는 부분 에러");
        console.log(`status : ${status}`)
      }
    });
  }

  return (
    <AppContainer>
      <div style={{ width: "100%" }}>
        <AppsHeader>
          {/* 유저 추가 모달은 Header 안에 */}
          <UserListTableHeader
            userList={list}
            totalUsers={totalUsers}
            checkedUsers={checkedUsers}
            setCheckedUsers={setCheckedUsers}
            filterText={filterText}
            onSelectUsersForDelete={onSelectUsersForDelete}
            onSetFilterText={onSetFilterText}
            onPageChange={onPageChange}
            page={page}
            onGetList={onGetUserList}
          />
        </AppsHeader>
      </div>
      <AppsContent>
        <TableContentView
          type="USERLIST"
          list={list}
          loading={loading}
          handleAddModalOpen={handleAddUserOpen}
          onChangeCheckedUsers={onChangeCheckedUsers}
          checkedItems={checkedUsers}
          onSelectItemsForDelete={onSelectUsersForDelete}
          onViewItemDetail={onViewUserDetail}
          onOpenEditItem={onOpenEditUser}
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
        selectedUser={selectedUser as UserObj_res}
        isShowDetail={isShowDetail}
        onShowDetail={onShowDetail}
        onSelectUsersForDelete={onSelectUsersForDelete}
        onOpenEditUser={onOpenEditUser}
      />

      {/* 확인 모달 */}
      <AppConfirmDialog
        type="DELETE_USERS"
        deleteModule={{
          listToDelete: usersToDelete,
          setListToDelete: setCheckedUsers,
        }}
        open={isDeleteDialogOpen}
        onDeny={setDeleteDialogOpen}
        title={"해당 회원을 \n 정말 삭제하시겠습니까?"}
        dialogTitle={""}
        onGetList={onGetUserList}
      />
    </AppContainer>
  );
};

export default UsersListTemplate;
