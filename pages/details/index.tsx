import React, {useEffect, useState} from 'react';
import {GetStaticProps, NextPage} from "next";
import {AxiosResponse} from "axios";
import {Case, DailyCase} from "../../interfaces/general";
import axios from "../../config/axios";
import {VaccineSpecimen} from "../../interfaces/vaccine";
import LineChartComponent from "../../components/line-chart";
import PieChartComponent from "../../components/pie-chart";
import {DetailsProps, LineChartProps, PieChartProps} from "../../interfaces/props";
import Head from "next/head";

const Details: NextPage<DetailsProps> = ({cases, vaccine}: DetailsProps) => {
    const dailyCases: DailyCase[] = cases.update.harian;
    const [vaccineData, setVaccineData] = useState<PieChartProps>({data: [], title: ''});
    const [detailsData, setDetailsData] = useState<LineChartProps[]>([]);

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

        setDetailsData(() =>
            [
                {
                    title: 'Confirmed Cases 🩺',
                    data: dailyCases.map((v: DailyCase) => ({date: v.key, value: v.jumlah_positif.value}))
                },
                {
                    title: 'Total Confirmed 🩺',
                    data: dailyCases.map((v: DailyCase) => ({date: v.key, value: v.jumlah_positif_kum.value}))
                },
                {
                    title: 'Daily Mortality 💀',
                    data: dailyCases.map((v: DailyCase) => ({date: v.key, value: v.jumlah_meninggal.value}))
                },
                {
                    title: 'Total Mortality 💀',
                    data: dailyCases.map((v: DailyCase) => ({date: v.key, value: v.jumlah_meninggal_kum.value}))
                },
                {
                    title: 'Daily Hospitalization',
                    data: dailyCases.map((v: DailyCase) => ({date: v.key, value: v.jumlah_dirawat.value}))
                },
                {
                    title: 'Total Hospitalization',
                    data: dailyCases.map((v: DailyCase) => ({date: v.key, value: v.jumlah_dirawat_kum.value}))
                },
                {
                    title: 'Daily Recovery',
                    data: dailyCases.map((v: DailyCase) => ({date: v.key, value: v.jumlah_sembuh.value}))
                },
                {
                    title: 'Total Recovery',
                    data: dailyCases.map((v: DailyCase) => ({date: v.key, value: v.jumlah_sembuh_kum.value}))
                },
                {
                    title: 'Daily Vaccination',
                    data: vaccine.vaksinasi.harian.map(v => (
                        {
                            date: v.key,
                            value: v.jumlah_vaksinasi_1.value,
                            secondValue: v.jumlah_vaksinasi_2.value
                        }
                    ))
                }
            ]
        )
    }, []);

    return (
        <>
            <Head>
                <title>Details</title>
                <meta name="description" content="Data Visualization About Novel Corona Virus 19 in Indonesia."/>
            </Head>
            <h1 className='text-transparent text-center bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 bg-clip-text leading-normal
            !leading-tight'>
                Details Page</h1>
            <div className={'w-full prose-sm'}>
                <div className="grid md:grid-cols-2 gap-3">
                    {detailsData.map((detailsData: LineChartProps, index: number) => {
                        return <LineChartComponent title={detailsData.title} data={detailsData.data} key={index}/>
                    })}
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
