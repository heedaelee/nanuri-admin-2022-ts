import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import PropTypes from "prop-types";

interface Props {
  // 방법1.
  // data: { month: string; users: number }[];
  // 방법2.
  data: Array<PropsItem>;
  isPhone: boolean;
}
interface PropsItem {
  month: string;
  users: number;
}

const WebTrafficGraph = ({ data, isPhone }: Props) => {
  // console.log(data);

  return (
    <>
      {isPhone ? (
        <ResponsiveContainer width="100%" aspect={1.5}>
          <BarChart barSize={7} data={data}>
            <XAxis
              fontSize={12}
              dataKey="month"
              axisLine={false}
              tickLine={false}
              interval={0}
            />
            <YAxis hide padding={{}} />
            <Bar dataKey="users" fill="#E2E8F0" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="100%" height={"80%"}>
          <BarChart barSize={7} data={data}>
            <XAxis
              fontSize={12}
              dataKey="month"
              axisLine={false}
              tickLine={false}
              interval={0}
            />
            <YAxis hide padding={{}} />
            <Bar dataKey="users" fill="#E2E8F0" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </>
  );
};
export default WebTrafficGraph;
