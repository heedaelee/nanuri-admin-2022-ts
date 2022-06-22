import React, { ChangeEvent } from "react";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import { UserListObj } from "../../@types/models/apps/UserList";

interface tableCheckboxProps {
  checkedItems: any[];
  setCheckedItems: (checkedIds: any[]) => void;
  data: any[];
  size?: number;
}

// data를 props로 받아서 헤더 체크박스의 check 표시를 다양하게 해준다.
const TableCheckbox = ({
  checkedItems,
  setCheckedItems,
  data,
  size = 1,
}: tableCheckboxProps) => {
  const onHandleMasterCheckbox = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    /*전체 선택 체크가 되어 있으면, 
    전체 id값 가지고 setCheckedItems()로 모두다 체크하게 하는 기능! */
    if (event.target.checked) {
      const toCheckIds = data.map((user) => user.id);
      setCheckedItems(toCheckIds);
    } else {
      setCheckedItems([]);
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
      }}
    >
      <Checkbox
        sx={{
          color: (theme) => theme.palette.text.disabled,
          transform: `scale(${size})`,
        }}
        color="primary"
        /* 한 개 이상, 전체 미만 체크 됐을땐 체크 무늬 반 수평라인 모양으로 체크박스 설정 
         :indeterminate = true */
        indeterminate={
          checkedItems.length > 0 && checkedItems.length < data.length
        }
        /* 데이터 한개 이상, 체크 된거랑 전체 데이터 갯수가 같을떈 
        :checked = true.*/
        checked={
          data.length > 0 && checkedItems.length === data.length
        }
        onChange={onHandleMasterCheckbox}
      />
    </Box>
  );
};

export default TableCheckbox;
