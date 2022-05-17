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

const useStyles = makeStyles((theme) => ({
  crMuiTabs: {
    flex: "1",
    position: "relative",
    "& .MuiTabs-flexContainer": {
      [theme.breakpoints.up("md")]: {
        justifyContent: "center",
      },
    },
  },
  crMuiTab: {
    minWidth: "10px",
    textTransform: "capitalize",
    padding: 0,
    marginLeft: 8,
    marginRight: 8,
    fontSize: 14,
    [theme.breakpoints.up("xl")]: {
      marginLeft: 14,
      marginRight: 14,
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

  const handleMonthChange = (value) => {
    switch (value) {
      case "12월":
        onSetGraphValue(incomeData);
        break;
      case "11월":
        onSetGraphValue(clientsData);
        break;
      case "10월":
        onSetGraphValue(projectData);
        break;
      default:
        onSetGraphValue(projectData);
    }
  };

  const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  // const { messages } = useIntl();

  const classes = useStyles(props);

  const valueb = "1px solid black";

  return (
    <Box sx={{ width: 1 }}>
      <Box
        sx={{ width: 1, display: "flex" }} //1 is 100%
        flexDirection={{ xs: "column", md: "row" }}
        alignItems={{ md: "center" }}
      >
        {/* Box 1 */}
        <Box component="h3" fontSize={16} sx={{ marginTop: 0 }}>
          {/* component="h3" 뜻은 h3 엘레멘트가 자식으로 만들어짐 */}
          통계
        </Box>
        {/* Box 2 */}
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
            // className={classes.crMuiTabs}
            sx={{
              flex: "1",
              position: "relative",
              "& .MuiTabs-flexContainer": {
                justifyContent: {
                  md: "center",
                },
              },

            }}
          >
            <Tab
              className={classes.crMuiTab}
              label={"프로젝트"}
              {...a11yProps(0)}
            />
            <Tab
              className={classes.crMuiTab}
              label={"신규 회원"}
              {...a11yProps(1)}
            />
            <Tab
              className={classes.crMuiTab}
              label={"수익"}
              {...a11yProps(2)}
            />
          </Tabs>
          <Box mt={2}>
            <AppSelect
              menus={[2021, 2020, 2019]}
              defaultValue={2021}
              onChange={handleYearChange}
            />
            <AppSelect
              menus={["12월", "11월", "10월"]}
              defaultValue={"12월"}
              onChange={handleMonthChange}
            />
          </Box>
        </Box>
      </Box>
      <Box mt={4}>
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
