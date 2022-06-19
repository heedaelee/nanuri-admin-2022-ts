import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Theme from "../../lib/Theme";
import AppsHeader from "../atoms/ AppsHeader";
import AppContainer from "../organisms/AppContainer";

interface ContentsPageProps {}

const ContentsPage = ({}: ContentsPageProps) => {
  return (
    <AppContainer>
      <div style={{ width: "100%" }}>
        <AppsHeader>test</AppsHeader>
      </div>
    </AppContainer>
  );
};

export default ContentsPage;
