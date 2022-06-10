import React from "react";
import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import Checkbox from "../atoms/TableCheckBox";
import AppSearchBar from "../atoms/AppSearchBar/index";
import { UserListObj } from "../../@types/models/apps/UserList";
import CheckedActions from "./CheckedActions";
import TableViewSelectButtons from "./TableViewSelectButtons";
import AppsPagination from "../atoms/AppsPagination";
import { Button } from "@mui/material";
import Theme from "../../lib/Theme";
import useBoolean from "../../hooks/useBoolean";
import CreateUser from "./CreateUsers";
import { Axios } from "../../services/apis/MockConfig";

interface TableHeaderProps {
  checkedUsers: number[];
  setCheckedUsers: (checkedItems: number[]) => void;
  filterText: string;
  onSetFilterText: (filterText: string) => void;
  onChangePageView: (pageView: string) => void;
  onSelectUsersForDelete: (ids: number[]) => void;
  page: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  pageView: string;
  userList: UserListObj[] | [];
  totalUsers: number;
  //리스트 조회하는 것
  onGetList: (params?: any) => void;
}

const TableHeader = ({
  checkedUsers,
  setCheckedUsers,
  filterText,
  onSelectUsersForDelete,
  onSetFilterText,
  onPageChange,
  page,
  onChangePageView,
  pageView,
  userList,
  totalUsers,
  onGetList,
}: TableHeaderProps) => {
  //추가
  const [isAddUser, onSetIsAddUser] = useBoolean(false);

  /**
   * 기능 : 모달 오픈 - 유저추가
   * UserListTemplate에 있는것과 달리 따로 이렇게 만들어야 함
   * 같이 사용하면 안됨 x
   */
  const handleAddUserOpen = () => {
    onSetIsAddUser(true);
  };
  /**
   * 기능 : 모달 오픈 - 유저추가
   * UserListTemplate에 있는것과 달리 따로 이렇게 만들어야 함
   * 같이 사용하면 안됨 x
   */
  const handleAddUserClose = () => {
    onSetIsAddUser(false);
  };

  /*기능 : Create User */

  // function onCreateUser(user: UserListObj) {
  //   console.log("onCreateUser Fn 성공");

  //   Axios.post("/api/userlist/create", { user: user })
  //     .then(({ data, status }) => {
  //       console.log("받는 데이터 : ");
  //       console.dir(data);
  //       if (status === 200) {
  //         // dispatch(fetchSuccess());
  //         console.log("onCreateUser/  받고 getlist호출");
  //         // console.dir(data);

  //         //if redux 사용하면 이런식으로..
  //         // creat, update시에도 이렇게 setState()함으로써 데이터 갱신!
  //         // setUserList(data.list);
  //         // setTotalUsers(data.total);
  //         onGetList();
  //         //TODO:보류
  //         // dispatch(
  //         //   showMessage(messages["message.contactCreated"] as string)
  //         // );
  //       } else {
  //         console.log("TableHeader/onCreateUser() 받는 부분 에러");
  //         //TODO:보류
  //         // dispatch(
  //         //   fetchError(messages["message.somethingWentWrong"] as string)
  //         // );
  //       }
  //     })
  //     .catch((error) => {
  //       //TODO:보류
  //       // dispatch(fetchError(error.message));
  //     });
  // }

  return (
    <>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Checkbox
          checkedItems={checkedUsers}
          setCheckedItems={setCheckedUsers}
          data={userList}
        />
        <AppSearchBar
          iconPosition="right"
          overlap={false}
          value={filterText}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            onSetFilterText(event.target.value)
          }
          placeholder="검색하세요!"
        />

        <Button
          sx={{
            fontSize: "1.2rem",
            fontFamily: Theme.fonts.fontFamily,
            // background: "#eff3fb80",
            paddingLeft: "1rem",
            paddingRight: "1rem",
            ml: "1rem",
          }}
          variant="outlined"
          size="large"
          onClick={handleAddUserOpen}
        >
          + 회원 추가하기
        </Button>

        {/* 체크된 게 1개 이상일때 Action */}
        {checkedUsers.length > 0 ? (
          <CheckedActions
            checkedItems={checkedUsers}
            setCheckedItems={setCheckedUsers}
            onSelectItemsForDelete={onSelectUsersForDelete}
          />
        ) : null}
        {/* List | Card View 선택 버튼  */}
        <TableViewSelectButtons
          pageView={pageView}
          onChangePageView={onChangePageView}
        />
        <Hidden smDown>
          {userList.length > 0 ? (
            <AppsPagination
              sx={{ ml: 2 }}
              count={totalUsers}
              page={page}
              onPageChange={onPageChange}
            />
          ) : null}
        </Hidden>

        {/* 추가 모달임 */}
        <CreateUser
          isAddUser={isAddUser}
          handleAddUserClose={handleAddUserClose}
          onGetList={onGetList}
          // onCreateUser={onCreateUser}
          //redux 안쓰니.. 아래값 넘겨줘야..
          totalUsers={totalUsers}
        />
      </Box>
    </>
  );
};

export default TableHeader;
