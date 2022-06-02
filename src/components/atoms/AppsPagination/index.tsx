import React from "react";
import TablePagination from "@mui/material/TablePagination";
import Theme from "../../../lib/Theme";

interface AppsPaginationProps {
  count: number;
  page: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    page: number
  ) => void;
  rowsPerPage?: number;

  [x: string]: any;
}

const AppsPagination: React.FC<AppsPaginationProps> = ({
  count,
  page,
  onPageChange,
  rowsPerPage = Theme.numOfItemsPerPage,
  ...rest
}) => {
  return (
    <TablePagination
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      backIconButtonProps={{ "aria-label": "Previous Page" }}
      nextIconButtonProps={{ "aria-label": "Next Page" }}
      onPageChange={onPageChange}
      rowsPerPageOptions={[]}
      {...rest}
    />
  );
};

export default AppsPagination;
