//import {useState} from 'react';
import { PieChart, Pie, Cell, Label, Tooltip } from "recharts";
import "./piechart.scss";

const ATTRIBUTES = {
  color: "#7a80a0",
  position: "middle",
  size: "20px",
  dy: 5,
};


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export default function Piechart({ threshold }) {

  const CustomLabel = ({ viewBox, threshold = 0, label }) => {
    const { cx, cy } = viewBox;
    return (
      <g>
        <text
          fill={ATTRIBUTES.color}
          x={cx}
          y={cy - 10}
          dy={ATTRIBUTES.dy}
          textAnchor={ATTRIBUTES.position}
          fontSize={ATTRIBUTES.size}
        >
          <tspan>{threshold}</tspan>
        </text>
        <text
          fill={ATTRIBUTES.color}
          x={cx}
          y={cy + 8}
          dy={ATTRIBUTES.dy}
          textAnchor={ATTRIBUTES.position}
          fontSize={ATTRIBUTES.size}
        >
          <tspan
            style={{
              fontSize: "20px",
            }}
          >
            {label}
          </tspan>
        </text>
      </g>
    );
  };

  const data = [
    {
      name: threshold?.prediction_name,
      value: Number(threshold?.accuracy),
    },
  ];


  return (
    <section className="pie-main-wrapper">
      {/* <span className="pie-title">Nail disease detected</span> */}
      <PieChart width={590} height={500} className="pie-wrapper">
        <Pie
          data={data}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
          nameKey="name"
          cx="70%"
          cy="50%"
          innerRadius={100}
          outerRadius={180}
          fill="#8884d8"
        >
          <Label
            content={
              <CustomLabel
                threshold={`${
                  threshold && threshold.accuracy > 50.0
                    ? (Math.round(threshold.accuracy * 100) / 100).toFixed(1)
                    : "0"
                }%`}
                label={threshold ? threshold.prediction_name : null}
              />
            }
          />
          <Cell fill="#2C3855" />
          <Cell fill="#E1F1FF" />
        </Pie>
        <Tooltip content={<CustomTooltip />}/>
        {/* <Legend  layout="vertical" verticalAlign="bottom" align="center" /> */}
      </PieChart>
    </section>
  );
}
