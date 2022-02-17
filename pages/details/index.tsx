import React, {useEffect, useState} from 'react';
import {GetStaticProps, NextPage} from "next";
import {AxiosResponse} from "axios";
import {Case, DailyCase, PieChartData} from "../../interfaces/general";
import axios from "../../config/axios";
import {VaccineSpecimen} from "../../interfaces/vaccine";
import LineChartComponent from "../../components/line-chart";
import PieChartComponent from "../../components/pie-chart";

interface DetailsProps {
    cases: Case;
    vaccine: VaccineSpecimen;
}

const Details: NextPage<DetailsProps> = ({cases, vaccine}: DetailsProps) => {
    const dailyCases: DailyCase[] = cases.update.harian;
    const [vaccineData, setVaccineData] = useState<PieChartData[]>([]);

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
            <h1 className='text-transparent text-center bg-gradient-to-br from-pink-500 to-purple-500 bg-clip-text leading-normal
            !leading-tight'>
                Details Page</h1>
            <div className={'w-full prose-sm'}>
                <div className="grid md:grid-cols-2 gap-3">
                    <LineChartComponent data={dailyCases} dataKey={"jumlah_positif"} title="Confirmed Cases 🩺"/>
                    <LineChartComponent data={dailyCases} dataKey={"jumlah_meninggal"} title="Daily Mortality 💀"/>
                    <PieChartComponent data={vaccineData} title="Vaccination" />
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
