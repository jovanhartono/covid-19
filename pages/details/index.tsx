import React, {useEffect, useState} from 'react';
import {GetStaticProps, NextPage} from "next";
import {AxiosResponse} from "axios";
import {Case, DailyCase} from "../../interfaces/general";
import axios from "../../config/axios";
import {VaccineSpecimen} from "../../interfaces/vaccine";
import LineChartComponent from "../../components/line-chart";
import {Pie, ResponsiveContainer, PieChart, Tooltip} from "recharts";

interface DetailsProps {
    cases: Case;
    vaccine: VaccineSpecimen;
}

type PieChartData = {
    label: string,
    value: number,
    fill: string
}

const Details: NextPage<DetailsProps> = ({cases, vaccine}: DetailsProps) => {
    const dailyCases: DailyCase[] = cases.update.harian;
    const [vaccineData, setVaccineData] = useState<PieChartData[]>();

    useEffect(() => {
        setVaccineData([
            {
                label: 'First Dose',
                value: vaccine.vaksinasi.total.jumlah_vaksinasi_1 - vaccine.vaksinasi.total.jumlah_vaksinasi_2,
                fill: '#a855f7'
            },
            {
                label: 'Fully Vaccinated',
                value: vaccine.vaksinasi.total.jumlah_vaksinasi_2,
                fill: '#d946ef'
            },
            {
                label: 'Not Vaccinated',
                value: 273500000 - vaccine.vaksinasi.total.jumlah_vaksinasi_1,
                fill: '#d1d5db'
            }
        ]);
    }, []);

    return (
        <>
            <h1 className='text-transparent text-center bg-gradient-to-br from-pink-500 to-purple-500 bg-clip-text'>
                Details Page</h1>
            <div className={'w-full prose-sm'}>
                <div className="grid md:grid-cols-2 gap-3">
                    <LineChartComponent data={dailyCases} dataKey={"jumlah_meninggal"}/>
                    <LineChartComponent data={dailyCases} dataKey={"jumlah_positif"}/>
                    <div className="w-full">
                    </div>
                    <div className="w-full">
                        <ResponsiveContainer width="100%" aspect={2}>
                            <PieChart>
                                <Pie
                                    data={vaccineData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    dataKey="value"
                                    nameKey="label"
                                    label={val => val.label}
                                >
                                </Pie>
                                <Tooltip/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </>
    );
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
