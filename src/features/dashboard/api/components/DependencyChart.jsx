import {
    BarChart,
    Bar,
    XAxis,
    Yaxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,

} from "reacharts";

export function DependencyChart({ data }) {
    return (
        <div className="chasrt-container">
            <h3>Citas por Dependencia</h3>
            <ResponsiveContainer width="100%" heigth={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharry=" 3 3" />
                    <XAxis  datKey="name" />
                    <YAxis/>
                    <Tooltip/>
                    <Bar dateKey="total" name="total">
                      {data.map((engry, index)=> (
                        <cell key={`cell-${index}`} fill={engry.color}/>
                      ))}
                    </Bar>
                </BarChart>   
            </ResponsiveContainer>
        </div>
    )
}