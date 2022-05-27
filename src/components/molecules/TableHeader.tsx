import React from "react";
import Box from "@mui/material/Box";
import Hidden from "@mui/material/Hidden";
import SearchIcon from "@mui/icons-material/Search";
import Checkbox from "../atoms/TableCheckBox";
import AppSearchBar from "../atoms/AppSearchBar/index";

// interface TableHeaderProps {
//   checkedItems: number[];
//   setCheckedItems: (checkedItems: number[]) => void;
//   filterText: string;
//   onSetFilterText: (filterText: string) => void;
//   onChangePageView: (pageView: string) => void;
//   onSelectItemsForDelete: (ids: number[]) => void;
//   page: number;
//   onPageChange: (
//     event: React.MouseEvent<HTMLButtonElement> | null,
//     page: number
//   ) => void;
//   pageView: string;
// }

const TableHeader = () =>
  //{
  // checkedItems,
  // setCheckedItems,
  // filterText,
  // onSetFilterText,
  // onChangePageView,
  // onSelectItemsForDelete,
  // page,
  // onPageChange,
  // pageView,
  //}: TableHeaderProps
  {
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
          <Checkbox size={1.5} />
          <AppSearchBar
            iconPosition="right"
            overlap={false}
            // value={filterText}
            // onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            //   onSetFilterText(event.target.value)
            // }
            placeholder="검색하세요"
          />
        </Box>
      </>
    );
  };

export default TableHeader;
