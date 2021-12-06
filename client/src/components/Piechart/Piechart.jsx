import { PieChart, Pie, Cell, Label } from "recharts";
import "./piechart.scss";

const ATTRIBUTES = {
    color: "#7a80a0",
    position: "middle",
    size: "20px",
    dy: 5,
};

export default function Piechart() {
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

    const data01 = [
        {
            name: "Group A",
            value: 400,
        },
        {
            name: "Group B",
            value: 1000,
        },
    ];

    return (
        <section className="wrapper">
            <PieChart width={460} height={330} className="pie-wrapper">
                <Pie
                    data={data01}
                    dataKey="value"
                    nameKey="name"
                    cx="70%"
                    cy="50%"
                    innerRadius={100}
                    outerRadius={140}
                    fill="#8884d8"
                >
                    <Label
                        content={<CustomLabel threshold={"100%"} label={"Liver Corrisis"} />}
                    />
                    <Cell fill="#2C3855" />
                    <Cell fill="#E1F1FF" />
                </Pie>
            </PieChart>
        </section>
    );
}
