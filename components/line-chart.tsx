import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis} from "recharts";
import dayjs from "dayjs";
import React, {useMemo, useState} from "react";
import {DailyCase} from "../interfaces/general";
import {NameType, ValueType} from "recharts/types/component/DefaultTooltipContent";
import Dropdown from "./dropdown";

type DataKey = "jumlah_meninggal" | "jumlah_positif";

interface LineChartProps {
    data: DailyCase[],
    dataKey: DataKey
}

function LineChartComponent({data, dataKey}: LineChartProps) {
    const [xAxisWidth, setXAxisWidth] = useState<number>(0);
    const [dateFilter, setDateFilter] = useState<number>(0);

    const filter = useMemo(() => {
        const filteredData: DailyCase[] = data.filter((dailyCase: DailyCase) => dailyCase.key > dateFilter);
        setXAxisWidth(() => Math.max(...filteredData.map(data => data[dataKey].value)).toString().length * 10 + 10)
        return filteredData;
    }, [dateFilter, dataKey]);

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-6">
                <h2 className="!m-0">Daily Mortality</h2>
                <Dropdown filterData={setDateFilter}/>
            </div>
            <ResponsiveContainer width="100%" aspect={2} debounce={300}>
                <LineChart data={filter}>
                    <XAxis
                        dataKey="key"
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
                        tickCount={7}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(value: number) => value.toLocaleString('id-ID')}
                    />
                    <Tooltip content={<CustomTooltip/>}/>
                    <CartesianGrid vertical={false} opacity={0.3}/>
                    <Line type="monotone" dataKey={`${dataKey}.value`} stroke="#d946ef" strokeWidth={2}
                          dot={false}/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )

    function CustomTooltip({active, payload, label}: TooltipProps<ValueType, NameType>) {
        if (active) {
            return <div className="shadow-lg bg-white p-3 rounded-lg">
                <h5>{dayjs(label).format('dddd, DD MMM YYYY')}</h5>
                {
                    //@ts-ignore
                    <h5 className="text-fuchsia-600">{payload ? payload[0].value.toLocaleString('id-ID') : null}</h5>
                }
            </div>
        }
        return null;
    }
}

export default LineChartComponent
