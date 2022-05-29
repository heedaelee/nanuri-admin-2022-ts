import React, { CSSProperties, ReactNode } from "react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";
import { useTheme } from "@mui/material";
import AppAnimateGroup from "../AppAnimateGroup";

interface ListViewProps {
  border?: boolean;
  renderRow: (item: any, index: number) => ReactNode;
  delay?: number;
  duration?: number;
  animation?: string;
  containerStyle?: CSSProperties;
  ListEmptyComponent?: ReactNode;
  ListFooterComponent?: ReactNode;
  data: any[];
  onEndReached?: () => void;
}

const getEmptyContainer = (ListEmptyComponent: any) => {
  if (ListEmptyComponent)
    return React.isValidElement(ListEmptyComponent) ? (
      ListEmptyComponent
    ) : (
      <ListEmptyComponent />
    );
  return null;
};

const getFooterContainer = (ListFooterComponent: any) => {
  if (ListFooterComponent)
    return React.isValidElement(ListFooterComponent) ? (
      //List..가 JSX 형식의 엘리멘트인가?
      ListFooterComponent
    ) : (
      <ListFooterComponent />
    );
  return null;
};
const ListView: React.FC<ListViewProps> = ({
  renderRow,
  onEndReached,
  data = [],
  animation = "transition.slideUpIn",
  delay = 0,
  duration = 200,
  containerStyle,
  border = false,
  ListFooterComponent,
  ListEmptyComponent,
  ...rest
}) => {
  const theme = useTheme();
  const borderStyle = {
    border: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 4,
    overflow: "hidden",
  };

  //지금 사용 안함
  if (!onEndReached) {
    onEndReached = () => {};
  }

  let style = containerStyle;
  if (border) {
    style = { ...style, ...borderStyle };
  }
  useBottomScrollListener(onEndReached, { debounce: 200 });
  return (
    <AppAnimateGroup
      style={{ ...style }}
      {...rest}
      enter={{ delay, duration, animation }}
    >
      {data.length > 0
        ? data.map((item, index) => renderRow(item, index))
        : getEmptyContainer(ListEmptyComponent)}

      {getFooterContainer(ListFooterComponent)}
    </AppAnimateGroup>
  );
};

export default ListView;
