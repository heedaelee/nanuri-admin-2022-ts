import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import Theme from "../../lib/Theme";
import Card from "../atoms/Card";
import { textMenu } from "../../lib/localization/locales/ko_KR";

interface DashboardProps {}

const Dashboard = ({}: DashboardProps) => {
  // console.log(textMenu.dashboard.topCardTitie2);
  return (
    <Container>
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
            <CardContent>112,400 명</CardContent>
          </CardItem>
          <CardItem>
            <CardTitle>{textMenu.dashboard.topCardTitle2}</CardTitle>
            <CardContent>212 명</CardContent>
          </CardItem>
          <CardItem>
            <CardTitle>{textMenu.dashboard.topCardTitle3}</CardTitle>
            <CardContent style={{ color: Theme.color.gray[3] }}>
              105 명
            </CardContent>
          </CardItem>
        </Card>
        <Card style={{ marginLeft: 30 }}>
          <CardItem>
            <CardTitle>{textMenu.dashboard.topCardTitle4}</CardTitle>
            <CardContent>4,500 건</CardContent>
          </CardItem>
          <CardItem>
            <CardTitle>{textMenu.dashboard.topCardTitle5}</CardTitle>
            <CardContent>150 건</CardContent>
          </CardItem>
          <CardItem>
            <CardTitle>{textMenu.dashboard.topCardTitle6}</CardTitle>
            <CardContent style={{ color: Theme.color.gray[3] }}>
              1,105 명
            </CardContent>
          </CardItem>
        </Card>
      </DoubleCardRow>
      <Card style={{ marginTop: 30, flex: 4.1 }} />
      <DoubleCardRow style={{ flex: 4, marginTop: 30 }}>
        <Card />
        <Card style={{ marginLeft: 30 }} />
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
  flex: 2;
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
