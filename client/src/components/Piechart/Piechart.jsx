import { PieChart, Pie, Cell, Label } from 'recharts'
import "./piechart.scss"

export default function Piechart() {

    const CustomLabel = ({ viewBox, threshold = 0, label }) => {
        const { cx, cy } = viewBox;
        return (
            <g>
                <text x={cx} y={cy - 10} dy={5} textAnchor="middle">
                    <tspan
                        style={{
                            fontSize: "15px",
                            fontWeight: 700,
                            color: "#d7ddec"
                        }}
                    >
                        {threshold}
                    </tspan>
                </text>
                <text x={cx} y={cy + 8} dy={5} textAnchor="middle">
                    <tspan
                        style={{
                            fontSize: "15px",
                            color: "#A6ADD1"
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
            "name": "Group A",
            "value": 400
        },
        {
            "name": "Group B",
            "value": 1000
        }

    ];

    return (
        <PieChart width={220} height={150} className="pie-wrapper">
            <Pie data={data01} dataKey="value" nameKey="name" cx="70%" cy={"50%"} innerRadius={55} outerRadius={65} fill="#8884d8" >
                <Label
                    content={<CustomLabel threshold={"50%"} label={"Liver Corrisis"} />}

                />
                <Cell fill="#2C3855" />
                <Cell fill="#E1F1FF" />
            </Pie>
        </PieChart>
    )
}