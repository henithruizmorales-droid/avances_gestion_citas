import {
    lineChart,
    Line,
    XAxis,
    Yaxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from "reacharts";

export function MonthlyTrendChart({ data }) {
    return (
        <div className="chasrt-container">
            <h3>Tendencia Anual</h3>
            <ResponsiveContainer width="100%" heigth={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharry=" 3 3" />
                    <XAxis  datKey="name" />
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    <Line
                     type="monotone"
                     datakey="total"
                     stroke="#39A900"
                     name="total"
                     strokeWidth={2}

                    />
                <Line 
                  type="monotone"
                  datakey="completed"
                  stroke="#22c55e"
                  name="completadas"
                />   
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}