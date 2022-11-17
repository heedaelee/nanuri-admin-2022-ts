import { styled } from "@mui/material/styles";
import AppContainer from "../organisms/AppContainer";

interface MyPorfileProps {}

const MyProfile = ({}: MyPorfileProps) => {
  return (
    <AppContainer>
      <TextDiv>{"내 프로필 \n : 추후 제작"}</TextDiv>
    </AppContainer>
  );
};

const TextDiv = styled("div")(({ theme }) => {
  return {
    width: "100%",
    height: "50%",
    fontSize: "4rem",
    // border: "1px solid black",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // flex: 1,
    flexDirection: "row",
    whiteSpace: "pre-line",
  };
});

export default MyProfile;
