import { ComposedChart, XAxis, YAxis, Bar, CartesianGrid, Line } from 'recharts'
import "./barchart.scss"

export default function Barchart({threshold}) {

    const data = [
        {
            "name": threshold.prediction_name,
            "range": 100,
            "value": Number(threshold.accuracy)
        },
    ]
    

    return (
        <div className="barchart-wrapper">
            <ComposedChart width={450} height={180} data={data}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} tickLine={false} stroke="#e0d2d2" />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} stroke="#e0d2d2" />
                {/* <Tooltip /> */}
                <CartesianGrid stroke="#f5f5f5" vertical={false} />
                <Bar dataKey="value" barSize={100} fill="#2c3855" radius={[3, 3, 0, 0]} />
                <Line type="monotone" dataKey="range" stroke="#a6add1" />
            </ComposedChart>
        </div>
    )
}