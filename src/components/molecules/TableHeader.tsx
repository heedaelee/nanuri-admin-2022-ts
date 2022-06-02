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
  handleAddUserOpen: () => void;
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
  handleAddUserOpen,
}: TableHeaderProps) => {
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
      </Box>
    </>
  );
};

export default TableHeader;
