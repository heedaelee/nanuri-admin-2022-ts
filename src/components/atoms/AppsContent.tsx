import React, { Children, Component, ReactNode } from "react";
import { styled } from "@mui/material/styles";
import SimpleBarReact from "simplebar-react";

interface AppsContentContainerProps {
  children: ReactNode;
  isDetailView?: boolean;
  fullView?: boolean;

  [x: string]: any;
  // 어떠한 키와 value를 다 넘겨줌
}

const AppsContentContainer: React.FC<AppsContentContainerProps> =
  styled(SimpleBarReact)((props: AppsContentContainerProps) => {
    return {
      width: "100%",
      paddingTop: 8,
      paddingBottom: 8,
      display: "flex",
      flexDirection: "column",
      // Detail페이지가 없으면 하단을 약간 짧게 가져간다.
      height: `calc(100% - ${props.isDetailView ? 60 : 129})px`,
      [props.theme.breakpoints.up("sm")]: {
        height: `calc(100% - ${props.fullView ? 0 : 60}px)`,
      },
      "& .simplebar-content": {
        height: "100%",
      },
    };
  });

interface AppsContentProps {
  children: ReactNode;
  isDetailView?: boolean;
  fullView?: boolean;

  [x: string]: any;
}

const AppsContent = (props: AppsContentProps) => {
  return (
    <AppsContentContainer {...props}>
      {props.children}
    </AppsContentContainer>
  );
};

export default AppsContent;
