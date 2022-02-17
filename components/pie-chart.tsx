import {Legend, Pie, PieChart, ResponsiveContainer, Tooltip, TooltipProps} from "recharts";
import React from "react";
import {NameType, ValueType} from "recharts/types/component/DefaultTooltipContent";
import {PieChartData} from "../interfaces/general";

interface PieChartProps {
    title: string,
    data: PieChartData[]
}

function PieChartComponent({title, data}: PieChartProps) {
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="!m-0">{title}</h2>
            </div>
            <ResponsiveContainer width="100%" aspect={2} debounce={150}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        dataKey="value"
                        nameKey="label"
                        label={val => `${val.value.toLocaleString('id-ID')} 💉`}
                    >
                    </Pie>
                    <Tooltip content={<PieChartTooltip/>}/>
                    <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
            </ResponsiveContainer>
        </div>);

    function PieChartTooltip({active, payload}: TooltipProps<ValueType, NameType>) {
        if (active) {
            return <div className="shadow-lg bg-white p-3 rounded-lg w-40">
                <h5>{payload?.[0].name}</h5>
                {
                    <h5 className="text-fuchsia-600">{payload?.[0].value?.toLocaleString('id-ID')}</h5>
                }
            </div>
        }
        return null;
    }

}

export default PieChartComponent;
