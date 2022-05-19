import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { textMenu } from "../../lib/localization/locales/ko_KR";
import Theme from "../../lib/Theme";

//NOTE:신박하네! 데이터 만드는 함수;
// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
//   createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
//   createData("Eclair", 262, 16.0, 24, 6.0),
//   createData("Cupcake", 305, 3.7, 67, 4.3),
//   createData("Gingerbread", 356, 16.0, 49, 3.9),
// ];

interface NoticeBaordProps {
  data: { title: string; writer: string; regDate: string }[];
}

const NoticeBaord = ({ data }: NoticeBaordProps) => {
  const commonPadding = { padding: "0px 16px" };
  return (
    <TableContainer
      sx={{
        boxShadow: "none",
      }}
      component={Paper}
    >
      <Table
        aria-label="simple table"
        sx={{
          [`& .${tableCellClasses.root}`]: {
            borderBottom: "none",
          },
          [`& .${tableCellClasses.head}`]: {
            paddingTop: 1.8,
            paddingBottom: 1.8,
            color: Theme.color.blue[2],
          },
          [`& .${tableCellClasses.body}`]: {
            paddingTop: 1.6,
            paddingBottom: 1.6,
          },
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell align="center" sx={commonPadding}>
              {textMenu.dashboard.bottomNoticeTitle}
            </TableCell>
            <TableCell align="center" sx={commonPadding}>
              {textMenu.dashboard.bottomNoticeWriter}
            </TableCell>
            <TableCell align="center" sx={commonPadding}>
              {textMenu.dashboard.bottomNoticeRegDate}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((dt, i) => {
            if (i < 5) {
              return (
                <TableRow key={dt.title} sx={{ padding: 0 }}>
                  <TableCell
                    component="th"
                    scope="row"
                    padding="none"
                  >
                    <div
                      style={{
                        display: "block",
                        width: 160,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {dt.title}
                    </div>
                  </TableCell>
                  <TableCell
                    sx={{ color: `${Theme.color.blue[2]}` }}
                    align="center"
                  >
                    {dt.writer}
                  </TableCell>
                  <TableCell
                    sx={{ color: `${Theme.color.blue[2]}` }}
                    align="center"
                  >
                    {dt.regDate}
                  </TableCell>
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NoticeBaord;
