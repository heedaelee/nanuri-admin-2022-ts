import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import StatGraphs from "./StatGraphs";
// import IntlMessages from "../../../../@crema/utility/IntlMessages";
// import { useIntl } from "react-intl";
// import Box from '@mui/material/Box';
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
// import AppSelect from "../../../../@crema/core/AppSelect";
import AppSelect from "../../@crema/AppSelect";
import { textMenu } from "../../../lib/localization/locales/ko_KR";

const useStyles = makeStyles((theme) => ({
  crMuiTabs: {
    flex: "1",
    position: "relative",
    fontSize: 50,
    "& .MuiTabs-flexContainer": {
      [theme.breakpoints.up("md")]: {
        justifyContent: "center",
      },
    },
  },
  selectBox: {
    marginLeft: 8,
    cursor: "pointer",
    fontSize: 14,
    [theme.breakpoints.up("xl")]: {
      marginLeft: 14,
    },
    "& .MuiSelect-select": {
      paddingLeft: 10,
    },
  },
  selectOption: {
    cursor: "pointer",
    padding: 8,
    fontSize: 14,
  },
}));

const GraphTabs = (props) => {
  const { clientsData, incomeData, projectData } = props;

  const [value, setValue] = useState(0);

  const [projectGraphData, setProjectGraphData] =
    useState(projectData);
  const [clientsGraphData, setClientsGraphData] =
    useState(clientsData);
  const [incomeGraphData, setIncomeGraphData] = useState(incomeData);

  const onSetGraphValue = (data) => {
    switch (value) {
      // 임의로 setProject.., setClient.., setIncomeGra.. 로 달아둔거임
      // 나중에 월별 데이터가 있으면  StatGraphs 컴포넌트랑 연동해서 조건분기를 다시
      // 셋팅해야함

      case 0: {
        setProjectGraphData(data);
        break;
      }
      case 1: {
        setClientsGraphData(data);
        break;
      }
      case 2: {
        setIncomeGraphData(data);
        break;
      }
      default:
        return null;
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleYearChange = (value) => {
    switch (value) {
      case 2019:
        onSetGraphValue(incomeData);
        break;
      case 2020:
        onSetGraphValue(clientsData);
        break;
      case 2021:
        onSetGraphValue(projectData);
        break;
      default:
        onSetGraphValue(projectData);
    }
  };

  //접근성 땜에 aria- 라는 기능을 리턴해서 던져 주는거임
  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  const tabFontSize = "1.3rem";

  const classes = useStyles(props);
  /* NOTE: 탭 원리 소개
    1. 처음엔 tabs 컴포넌트가 기본값을 가지고, 이제 탭을 예를 들어 두번째걸로 셀렉트 했다 치면,
    2. 셀럭할때 <tabs 의 props 인 onChange 에 할당한 handleChange #88행 함수가 작동한다.
    3. 그럼 setValue()가 작동하면서 value 값(예:1) 이 입력되고 리랜더링되면서 value 값이 바뀐다.
    4. <tabs> <tab></tab>...</tabs> 여기 tabs는 알아서 값이 바뀌면 메뉴가 자동으로 애니메이션이 들어가고 
    5. 그래프 컨텐츠는 개발자가 조건을 걸어둬서 컨텐츠가 바뀌는 원리다. 요게 젤 중요.
      #196~#199를 보면 조건에 따라 컴포넌트가 랜더링 되도록 조건 분기 해뒀다. 
  */

  return (
    <Box sx={{ width: 1 }}>
      <Box
        sx={{ width: 1, display: "flex" }} //1 is 100%
        flexDirection={{ xs: "column", md: "row" }}
        // alignItems={{ md: "center" }}
      >
        {/* Box 1 */}
        <Box component="h3" fontSize={16} sx={{ marginTop: 0 }}>
          {/* component="h3" 뜻은 h3 엘레멘트가 자식으로 만들어짐 */}
          {textMenu.dashboard.centerCardTitle1}
        </Box>
        {/* Box 2 탭바에서 "통계" 글자 제외하고 모두 시작 ==> */}
        <Box
          mt={{ md: -2 }}
          flex="1"
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          alignItems={{ md: "center" }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="simple tabs example"
            className={classes.crMuiTabs}
            sx={{
              flex: "1",
              position: "relative",
              "& .MuiTabs-flexContainer": {
                justifyContent: { md: "center" },
                pl: { md: 7 },
              },
            }}
          >
            <Tab
              sx={{ fontSize: tabFontSize }}
              label={"프로젝트"}
              {...a11yProps(0)}
            />
            <Tab
              sx={{ fontSize: tabFontSize }}
              label={"신규 회원"}
              {...a11yProps(1)}
            />
            <Tab
              sx={{ fontSize: tabFontSize }}
              label={"수익"}
              {...a11yProps(2)}
            />
          </Tabs>
          {/* 우측상단 Select버튼 시작 ==> */}
          <Box mt={2}>
            <AppSelect
              menus={[2021, 2020, 2019]}
              defaultValue={2021}
              onChange={handleYearChange}
            />
          </Box>
          {/* ==> 우측상단 Select버튼 끝 */}
        </Box>
        {/* ==>  Box 2  끝*/}
      </Box>
      <Box mt={0}>
        {value === 0 && <StatGraphs data={projectGraphData} />}
        {value === 1 && <StatGraphs data={clientsGraphData} />}
        {value === 2 && <StatGraphs data={incomeGraphData} />}
      </Box>
    </Box>
  );
};

export default GraphTabs;

GraphTabs.defaultProps = {
  clientsData: [],
  incomeData: [],
  projectData: [],
};

GraphTabs.propTypes = {
  clientsData: PropTypes.array,
  incomeData: PropTypes.array,
  projectData: PropTypes.array,
};
