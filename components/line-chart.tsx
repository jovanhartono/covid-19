import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis} from "recharts";
import dayjs from "dayjs";
import React, {useMemo, useState} from "react";
import {NameType, ValueType} from "recharts/types/component/DefaultTooltipContent";
import Dropdown from "./dropdown";
import {LineChartProps} from "../interfaces/props";

function LineChartComponent({title, data}: LineChartProps) {
    const [xAxisWidth, setXAxisWidth] = useState<number>(0);
    const [dateFilter, setDateFilter] = useState<number>(dayjs().subtract(1, 'month').valueOf());

    const filter = useMemo(() => {
        const filteredData = data.filter(value => value.date > dateFilter);
        setXAxisWidth(() => Math.max(...filteredData.map(data => data.value)).toString().length * 10 + 18)
        return filteredData;
    }, [dateFilter, data]);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="!m-0">{title}</h2>
                <Dropdown filterData={setDateFilter}/>
            </div>
            <ResponsiveContainer width="100%" aspect={2} debounce={150}>
                <LineChart data={filter}>
                    <XAxis
                        dataKey="date"
                        axisLine={false}
                        tickLine={false}
                        tickMargin={10}
                        height={40}
                        padding={{left:30, right: 10}}
                        tickFormatter={(date: number) => dayjs(date).format('D/M/YYYY')}
                        interval={"preserveStartEnd"}
                    />
                    <YAxis
                        width={xAxisWidth}
                        tickMargin={10}
                        domain={['dataMin', "auto"]}
                        tickCount={7}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value: number) => value.toLocaleString('id-ID')}
                    />
                    <Tooltip content={<LineChartTooltip/>}/>
                    <CartesianGrid vertical={false} opacity={0.3}/>
                    <Line type="monotone" dataKey={`value`} stroke="#d946ef" strokeWidth={2} dot={false}/>
                    <Line type="monotone" dataKey={'secondValue'} stroke="#a855f7" strokeWidth={2} dot={false}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )

    function LineChartTooltip({active, payload, label}: TooltipProps<ValueType, NameType>) {
        if (active) {
            return <div className="shadow-lg bg-white p-3 rounded-lg">
                <h5>{dayjs(label).format('dddd, DD MMM YYYY')}</h5>
                {
                    payload?.map((v, idx: number) => (
                        <h5 key={idx} className="text-fuchsia-600">{v.value?.toLocaleString('id-ID')}</h5>
                    ))
                }
            </div>
        }
        return null;
    }
}

export default LineChartComponent;
