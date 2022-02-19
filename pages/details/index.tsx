import React, {useEffect, useState} from 'react';
import {GetStaticProps, NextPage} from "next";
import {AxiosResponse} from "axios";
import {Case, DailyCase} from "../../interfaces/general";
import axios from "../../config/axios";
import {VaccineSpecimen} from "../../interfaces/vaccine";
import LineChartComponent from "../../components/line-chart";
import PieChartComponent from "../../components/pie-chart";
import {DetailsProps, LineChartProps, PieChartProps} from "../../interfaces/props";

const Details: NextPage<DetailsProps> = ({cases, vaccine}: DetailsProps) => {
    const dailyCases: DailyCase[] = cases.update.harian;
    const [vaccineData, setVaccineData] = useState<PieChartProps>({data:[], title: ''});
    const [dailyPositive, setDailyPositive] = useState<LineChartProps>({data:[], title: ''});
    const [totalPositive, setTotalPositive] = useState<LineChartProps>({data:[], title: ''});
    const [dailyMortality, setDailyMortality] = useState<LineChartProps>({data:[], title: ''});
    const [totalMortality, setTotalMortality] = useState<LineChartProps>({data:[], title: ''});

    useEffect(() => {
        setVaccineData({
            title: 'Vaccination',
            data: [
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
            ]
        });

        setDailyPositive({
            title: 'Confirmed Cases 🩺',
            data: dailyCases.map((v: DailyCase) => ({date: v.key, value: v.jumlah_positif.value}))
        });

        setDailyMortality({
            title: 'Daily Mortality 💀',
            data: dailyCases.map((v: DailyCase) => ({date: v.key, value: v.jumlah_meninggal.value}))
        });

        setTotalPositive({
            title: 'Total Confirmed 💀',
            data: dailyCases.map((v: DailyCase) => ({date: v.key, value: v.jumlah_positif_kum.value}))
        });

        setTotalMortality({
            title: 'Total Mortality 💀',
            data: dailyCases.map((v: DailyCase) => ({date: v.key, value: v.jumlah_meninggal_kum.value}))
        });
    }, []);

    return (
        <>
            <h1 className='text-transparent text-center bg-gradient-to-br from-pink-500 to-purple-500 bg-clip-text leading-normal
            !leading-tight'>
                Details Page</h1>
            <div className={'w-full prose-sm'}>
                <div className="grid md:grid-cols-2 gap-3">
                    <LineChartComponent data={dailyPositive.data} title={dailyPositive.title}/>
                    <LineChartComponent data={totalPositive.data} title={totalPositive.title}/>
                    <LineChartComponent data={dailyMortality.data} title={dailyMortality.title}/>
                    <LineChartComponent data={totalMortality.data} title={totalMortality.title}/>
                    <PieChartComponent data={vaccineData.data} title={vaccineData.title}/>
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
        revalidate: 3600
    }
}
