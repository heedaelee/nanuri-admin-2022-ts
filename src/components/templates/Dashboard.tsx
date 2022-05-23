import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Theme from "../../lib/Theme";
import Card from "../atoms/Card";
import { textMenu } from "../../lib/localization/locales/ko_KR";
import GraphTabs from "../../lib/@crema/GraphTabs";
import Data from "../../db/dashboard/crm";
import crmData from "../../db/dashboard/crm";
import WebTrafficGraph from "../../lib/@crema/WebTraffic/WebTrafficGraph";
import Box from "@mui/material/Box";
import NoticeBaord from "../organisms/NoticeBoard";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { rem } from "../../lib/otherUtills";

interface DashboardProps {}

const Dashboard = ({}: DashboardProps) => {
  // console.log(textMenu.dashboard.topCardTitie2);

  return (
    <Container>
      {/* top */}
      <DoubleCardRow>
        <Card
          style={{
            justifyContent: "space-between",
            paddingTop: 30,
            paddingBottom: 30,
          }}
        >
          <CardItem>
            <CardTitle>{textMenu.dashboard.topCardTitle1}</CardTitle>
            <CardContent>
              {crmData.top.clients.totalNum} 명
            </CardContent>
          </CardItem>
          <CardItem>
            <CardTitle>{textMenu.dashboard.topCardTitle2}</CardTitle>
            <CardContent>
              {crmData.top.clients.todayJoinNum} 명
            </CardContent>
          </CardItem>
          <CardItem>
            <CardTitle>{textMenu.dashboard.topCardTitle3}</CardTitle>
            <CardContent style={{ color: Theme.color.gray[3] }}>
              {crmData.top.clients.ysJoinNum} 명
            </CardContent>
          </CardItem>
        </Card>
        <Card style={{ marginLeft: 30 }}>
          <CardItem>
            <CardTitle>{textMenu.dashboard.topCardTitle4}</CardTitle>
            <CardContent>
              {crmData.top.projects.totalNum} 건
            </CardContent>
          </CardItem>
          <CardItem>
            <CardTitle>{textMenu.dashboard.topCardTitle5}</CardTitle>
            <CardContent>
              {crmData.top.projects.activeNum} 건
            </CardContent>
          </CardItem>
          <CardItem>
            <CardTitle>{textMenu.dashboard.topCardTitle6}</CardTitle>
            <CardContent style={{ color: Theme.color.gray[3] }}>
              {crmData.top.projects.inactiveNum} 명
            </CardContent>
          </CardItem>
        </Card>
      </DoubleCardRow>

      {/* center */}
      <Card
        style={{
          marginTop: 30,
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
      <DoubleCardRow
        style={{
          marginTop: 30,
          height: `35%`,
          // flex:1
        }}
      >
        <Card
          style={{
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
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
          <WebTrafficGraph data={crmData.websiteTrafficData} />
        </Card>
        <Card
          style={{
            marginLeft: 30,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "space-between",
            paddingLeft: 20,
          }}
        >
          <Box
            sx={{
              display: "flex",
              marginTop: "10px",
              justifyContent: "space-between",
              width: "100%",
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
    </Container>
  );
};

const Container = styled.div`
  height: 100%;
  /* border: 1px solid black; */
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const DoubleCardRow = styled.div`
  display: flex;
  justify-content: space-between;
  /* flex: 1; */
  /* border: 1px solid black; */
`;

const CardItem = styled.div`
  /* border: 1px solid; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  & + & {
    margin-left: 10px;
  }
  height: 100%;
`;

const CardTitle = styled.p`
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
const CardContent = styled.p`
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
