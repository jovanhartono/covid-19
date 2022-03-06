import {
    Bar,
    CartesianGrid,
    ComposedChart,
    Legend,
    Line,
    ResponsiveContainer,
    Tooltip,
    TooltipProps,
    XAxis,
    YAxis
} from "recharts";
import React, {useEffect, useState} from "react";
import {NameType, ValueType} from "recharts/types/component/DefaultTooltipContent";

type ComposedChartProps = {
    title: string,
    data: [string, number][]
}

function ComposedChartComponent({title, data}: ComposedChartProps) {
    const [yAxisWidth, setYAxisWidth] = useState<number>(0);

    useEffect(() => {
        setYAxisWidth(() => Math.max(...data.map(v => v[1])).toString().length * 10);
    }, [data]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="!m-0">{title}</h2>
            </div>
            <ResponsiveContainer width="100%" aspect={2} debounce={150}>
                <ComposedChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid vertical={false} opacity={0.3} />
                    <XAxis dataKey={(data) => data[0]}
                           tickMargin={10}
                           height={40}
                           axisLine={false}
                    />
                    <YAxis
                        domain={['dataMin', "auto"]}
                        width={yAxisWidth}
                        tickMargin={10}
                        tickCount={6}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value: number) => value.toLocaleString('id-ID')}
                    />
                    <Tooltip cursor={false} content={<BarChartTooltip/>} />
                    <Legend />
                    <Bar name="Total Infected" dataKey={(data) => data[1]} fill="#d946ef" barSize={20} />
                    <Line type="monotone" dataKey={(data) => data[1]} stroke="#a855f7" strokeWidth={2}/>
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );

    function BarChartTooltip({active, payload, label}: TooltipProps<ValueType, NameType>) {
        if (active) {
            return <div className="shadow-lg bg-white p-3 rounded-lg">
                <h5>Age:
                    <span className="text-fuchsia-500"> {label}</span>
                </h5>
                <h5>
                    {payload?.[0]?.name}:
                    <span className="text-fuchsia-500"> {payload?.[0]?.value?.toLocaleString('id-ID')}</span>
                </h5>
            </div>
        }
        return null;
    }
}

export default ComposedChartComponent;
