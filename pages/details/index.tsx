import React, {useState} from 'react';
import {GetStaticProps, NextPage} from "next";
import {AxiosResponse} from "axios";
import {Case, DailyCase} from "../../interfaces/general";
import axios from "../../config/axios";
import {VaccineSpecimen} from "../../interfaces/vaccine";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, TooltipProps, XAxis, YAxis} from "recharts";
import dayjs from "dayjs";
import {NameType, ValueType} from "recharts/types/component/DefaultTooltipContent";

interface DetailsProps {
    cases: Case;
    vaccine: VaccineSpecimen;
}

interface ButtonTime {
    value: string,
    label: string,
    dayValue: number
}

const buttons: ButtonTime[] = [
    {
        value: 'week',
        label: 'One Week',
        dayValue: Date.now() - (8 * 24 * 60 * 60 * 1000)
    },
    {
        value: 'month',
        label: 'One Month',
        dayValue: Date.now() - (30 * 24 * 60 * 60 * 1000)
    },
    {
        value: 'year',
        label: 'One Year',
        dayValue: Date.now() - (365 * 24 * 60 * 60 * 1000)
    },
    {
        value: 'forever',
        label: 'Since 🔥 Nation Attack',
        dayValue: 0
    }
]

const Details: NextPage<DetailsProps> = ({cases, vaccine}: DetailsProps) => {
    const dailyCases: DailyCase[] = cases.update.harian;
    const [data, setData] = useState(cases.update.harian);
    const [active, setActive] = useState({active: 'forever'});

    return (
        <>
            <h1 className='text-transparent text-center bg-gradient-to-br from-pink-500 to-purple-500 bg-clip-text'>
                Details Page</h1>
            <div className="flex space-x-3 justify-end mb-6">
                {buttons.map((button: ButtonTime, index: number) => {
                    return (
                        <button key={index}
                                className={`${active.active === button.value ? 'border-none bg-gradient-to-r from-pink-500 to to-fuchsia-500 text-white' : ''} 
                                hover:shadow-md text-xs border border-gray-300 font-light text-gray-900 rounded-full shadow-sm p-3`}
                                onClick={() => setData(() => {
                                    setActive({
                                        active: button.value
                                    })
                                    return dailyCases.filter(x => x.key > button.dayValue)
                                })}>
                            {button.label}
                        </button>
                    );
                })
                }
            </div>
            <div className={'w-full prose-sm'}>
                <h2>Daily Mortality</h2>
                <ResponsiveContainer width="100%" aspect={2}>
                    <LineChart width={300} height={100} data={data}>
                        <XAxis
                            dataKey="key"
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(date: number) => dayjs(date).format('D/M/YYYY')}
                        />
                        <YAxis
                            width={40}
                            tickCount={7}
                            axisLine={false}
                            tickLine={false}
                            tickFormatter={(value: number) => value.toLocaleString('id-ID')}
                        />
                        <Tooltip content={<CustomTooltip/>}/>
                        <CartesianGrid vertical={false} opacity={0.3}/>
                        <Line type="monotone" dataKey="jumlah_meninggal.value" stroke="#d946ef" strokeWidth={2}
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
