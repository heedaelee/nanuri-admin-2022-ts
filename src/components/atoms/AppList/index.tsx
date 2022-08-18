import React, { CSSProperties, ReactNode } from "react";
import ListView from "./ListView";
import ListFooter from "./ListFooter";
import { SxProps } from "@mui/system";
import { Theme } from "@mui/material";

interface AppListProps {
  border?: boolean;
  delay?: number;
  animation?: any;
  sx?: SxProps<Theme>;
  containerStyle?: CSSProperties;
  ListEmptyComponent?: ReactNode;
  data: any[];
  onEndReached?: () => void;
  //renderRow 같은 경우는 <ListView의 {...props} 처럼 props로 전달해서 사용된다
  //따라서 이 컴포넌트에선 정의를 볼수가 없음. ListView의 구조를 봐야 한다.
  renderRow: (item: any, index: number) => ReactNode;

  [x: string]: any;
}

const AppList: React.FC<AppListProps> = ({
  footerProps,
  ...props
}) => {
  return <ListView {...props} />;
};

export default AppList;
