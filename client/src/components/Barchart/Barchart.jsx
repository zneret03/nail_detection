import { ComposedChart, XAxis, YAxis, Bar, CartesianGrid, Line } from 'recharts'
import "./barchart.scss"

const data = [
    {
        "name": "A",
        "uv": 4000,
        "pv": 2400
    },
    {
        "name": "B",
        "uv": 3000,
        "pv": 1398
    },
    {
        "name": "C",
        "uv": 2000,
        "pv": 9800
    },
    {
        "name": "D",
        "uv": 2780,
        "pv": 3908
    },
    {
        "name": "E",
        "uv": 1890,
        "pv": 4800
    },
    {
        "name": "F",
        "uv": 2390,
        "pv": 3800
    },
    {
        "name": "E",
        "uv": 1890,
        "pv": 4800
    },
    {
        "name": "F",
        "uv": 2390,
        "pv": 3800
    },
    {
        "name": "E",
        "uv": 1890,
        "pv": 4800
    },
    {
        "name": "F",
        "uv": 2390,
        "pv": 3800
    },
    {
        "name": "E",
        "uv": 1890,
        "pv": 4800
    },
    {
        "name": "F",
        "uv": 2390,
        "pv": 3800
    },
]

export default function Barchart() {
    return (
        <div className="barchart-wrapper">
            <ComposedChart width={450} height={180} data={data}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} stroke="#e0d2d2" />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} stroke="#e0d2d2" />
                {/* <Tooltip /> */}
                <CartesianGrid stroke="#f5f5f5" vertical={false} />
                <Bar dataKey="pv" barSize={20} fill="#2c3855" radius={[3, 3, 0, 0]} />
                <Line type="monotone" dataKey="uv" stroke="#a6add1" />
            </ComposedChart>
        </div>
    )
}