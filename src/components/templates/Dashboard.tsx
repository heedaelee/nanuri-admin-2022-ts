import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Box from "@mui/material/Box";
import React from "react";
import styledComponent from "styled-components";
import { styled } from "@mui/material/styles";
import {
  default as crmData,
  default as Data,
} from "../../db/dashboard/crm";
import GraphTabs from "../../lib/@crema/GraphTabs";
import WebTrafficGraph from "../../lib/@crema/WebTraffic/WebTrafficGraph";
import { textMenu } from "../../lib/localization/locales/ko_KR";
import Theme from "../../lib/Theme";
import Card from "../atoms/Card";
import NoticeBaord from "../organisms/NoticeBoard";
import CardItem from "../molecules/CardItem";
import { Hidden, useMediaQuery, useTheme } from "@mui/material";
import { rem } from "../../lib/util/otherUtills";

interface DashboardProps {}

const Dashboard = () => {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Container>
      {/* <Hidden smDown> */}
      {/* top */}
      <DoubleCardRow
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          height: { sm: "25%", lg: "15%", md: "15%" },
        }}
      >
        {/* top/left */}
        <Card
          sx={{
            justifyContent: "space-between",
            // paddingTop: 30,
            // paddingBottom: 30,
          }}
        >
          {textMenu.dashboard.topCardTitleLeft.map((val, i) => {
            return (
              <CardItem
                content={crmData.topData[i]}
                title={val}
                key={i}
                unit={"명"}
                contentStyle={
                  i === 0
                    ? { fontSize: rem(18) }
                    : i === 2
                    ? { color: Theme.color.gray[3] }
                    : undefined
                }
              />
            );
          })}
        </Card>
        {/* top/right */}
        <Card
          sx={{
            marginTop: { xs: 5, sm: 0 },
            marginLeft: { sm: 7 },
            justifyContent: "space-between",
            // paddingTop: 30,
            // paddingBottom: 30,
          }}
        >
          {textMenu.dashboard.topCardTitleRight.map((val, i) => {
            return (
              <CardItem
                content={crmData.topData[i]}
                title={val}
                key={i}
                unit={"건"}
                contentStyle={
                  i === 0
                    ? { fontSize: rem(18) }
                    : i === 2
                    ? { color: Theme.color.gray[3] }
                    : undefined
                }
              />
            );
          })}
        </Card>
      </DoubleCardRow>

      {/* center */}
      <Hidden smDown>
        <Card
          sx={{
            marginTop: 7,
            height: "fit-content",
            // height: "35%",
            flex: 0,
            flexDirection: "column",
            padding: "20px 20px",
          }}
        >
          <GraphTabs
            clientsData={Data.statisticsGraph.clientsData}
            incomeData={Data.statisticsGraph.incomeData}
            projectData={Data.statisticsGraph.projectData}
          />
        </Card>
      </Hidden>

      {/* bottom */}
      <DoubleCardRow
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          marginTop: { sm: 7 },
          height: { sm: `35%` },
          // flex:1
        }}
      >
        {/* 웹사이트 트래픽 */}
        <Card
          sx={{
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginTop: { xs: 7, sm: 0 },
            // height: "500px",
          }}
        >
          <Box
            component="h3"
            fontSize={16}
            sx={{ margin: 0, marginTop: "10px" }}
          >
            {/* component="h3" 뜻은 h3 엘레멘트가 자식으로 만들어짐 */}
            {textMenu.dashboard.bottomCardTitle1}
          </Box>
          <WebTrafficGraph
            data={crmData.websiteTrafficData}
            isPhone={isPhone}
          />
        </Card>
        <Card
          sx={{
            marginTop: { xs: 7, sm: 0 },
            marginLeft: { sm: 7 },
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            // paddingLeft: 20,
            // marginTop: { xs: 7 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              marginTop: "10px",
              justifyContent: "space-between",
              width: "100%",
              flex: 1,
            }}
          >
            <h3 style={{ fontSize: 16, margin: 0 }}>
              {textMenu.dashboard.bottomCardTitle2}
            </h3>
            <MoreHorizIcon
              sx={{ color: Theme.color.blue[3], cursor: "pointer" }}
            />
          </Box>
          <NoticeBaord data={crmData.noticeList} />
        </Card>
      </DoubleCardRow>
      {/* </Hidden> */}
    </Container>
  );
};

const Container = styled("div")(({ theme }) => {
  return {
    height: "100%",
    /* border: 1px solid black; */
    display: "flex",
    flex: 1,
    flexDirection: "column",
  };
});

const DoubleCardRow = styled("div")(() => {
  return {
    display: "flex",
    justifyContent: "space-between",
    /* flex: 1; */
    /* border: 1px solid black; */
  };
});

// const CardItem = styled.div`
//   /* border: 1px solid; */
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   flex: 1;
//   & + & {
//     margin-left: 10px;
//   }
//   height: 100%;
// `;

const CardTitle = styledComponent.p`
  /* border: 1px solid red; */
  text-align: center;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 15px;
  line-height: 35px;
  color: ${Theme.color.gray[3]};
  margin: 0;
`;
const CardContent = styledComponent.p`
  /* border: 1px solid green; */
  text-align: center;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 21px;
  line-height: 35px;
  color: ${Theme.color.green[2]};
  margin: 0;
`;

export default Dashboard;
