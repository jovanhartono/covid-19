import React, {useState} from 'react';
import {GetStaticProps, NextPage} from "next";
import {AxiosResponse} from "axios";
import {Case, DailyCase} from "../../interfaces/general";
import axios from "../../config/axios";
import {VaccineSpecimen} from "../../interfaces/vaccine";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis} from "recharts";
import dayjs from "dayjs";
import {NameType, ValueType} from "recharts/types/component/DefaultTooltipContent";
import Dropdown from "../../components/dropdown";

interface DetailsProps {
    cases: Case;
    vaccine: VaccineSpecimen;
}

const Details: NextPage<DetailsProps> = ({cases, vaccine}: DetailsProps) => {
    const dailyCases: DailyCase[] = cases.update.harian;
    const [data, setData] = useState<DailyCase[]>(cases.update.harian);
    const [xAxisWidth, setXAxisWidth] = useState<number>(50);
    const dataKey = 'jumlah_meninggal.value';

    function filterData(dateFilter: number): void{
        setData(() => {
            const filteredData: DailyCase[] = dailyCases.filter((dailyCase: DailyCase) => dailyCase.key > dateFilter);
            setXAxisWidth(() => Math.max(...filteredData.map(data => data["jumlah_meninggal"].value)).toString().length * 10 + 10)
            return filteredData;
        });
    }

    return (
        <>
            <h1 className='text-transparent text-center bg-gradient-to-br from-pink-500 to-purple-500 bg-clip-text'>
                Details Page</h1>
            <div className={'w-full prose-sm'}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="!m-0">Covid-19 Daily Mortality</h2>
                    <Dropdown filterData={filterData} />
                </div>
                <ResponsiveContainer width="100%" aspect={2}>
                    <LineChart data={data}>
                        <XAxis
                            dataKey="key"
                            axisLine={false}
                            tickLine={false}
                            tickMargin={10}
                            height={40}
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
                        <Line type="monotone" dataKey={dataKey} stroke="#d946ef" strokeWidth={2}
                              dot={false}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </>
    );

    function CustomTooltip({active, payload, label}: TooltipProps<ValueType, NameType>) {
        if (active) {
            return <div className="shadow-lg bg-white p-3 rounded-lg">
                <h5>{dayjs(label).format('dddd, DD MMM YYYY')}</h5>
                <h5 className="text-fuchsia-600">{payload ? payload[0].value : null}</h5>
            </div>
        }
        return null;
    }
}

export default Details;

export const getStaticProps: GetStaticProps = async () => {
    const [cases, vaccine]: [AxiosResponse<Case>, AxiosResponse<VaccineSpecimen>] = await Promise.all([
        axios.get('update.json').then(response => response.data),
        axios.get('pemeriksaan-vaksinasi.json').then(response => response.data)
    ]);

    return {
        props: {cases, vaccine},
        revalidate: 21600
    }
}
