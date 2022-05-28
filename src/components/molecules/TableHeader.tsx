import React from "react";
import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "../atoms/TableCheckBox";
import AppSearchBar from "../atoms/AppSearchBar/index";
import { UserListObj } from "../../@types/models/apps/UserList";
import CheckedActions from "./CheckedActions";

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

        {/* 체크된게 1개 이상일때 Action */}
        {checkedUsers.length > 0 ? (
          <CheckedActions
            checkedItems={checkedUsers}
            setCheckedItems={setCheckedUsers}
            onSelectItemsForDelete={onSelectUsersForDelete}
          />
        ) : null}
      </Box>
    </>
  );
};

export default TableHeader;
