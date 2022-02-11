import React, {useState} from 'react';
import {GetStaticProps, NextPage} from "next";
import {AxiosResponse} from "axios";
import {Case, DailyCase} from "../../interfaces/general";
import axios from "../../config/axios";
import {VaccineSpecimen} from "../../interfaces/vaccine";
import LineChartComponent from "../../components/line-chart";

interface DetailsProps {
    cases: Case;
    vaccine: VaccineSpecimen;
}

const Details: NextPage<DetailsProps> = ({cases, vaccine}: DetailsProps) => {
    const [data, setData] = useState<DailyCase[]>(cases.update.harian);

    return (
        <>
            <h1 className='text-transparent text-center bg-gradient-to-br from-pink-500 to-purple-500 bg-clip-text'>
                Details Page</h1>
            <div className={'w-full prose-sm'}>
                <div className="grid md:grid-cols-2 gap-3">
                    <LineChartComponent data={data} dataKey={"jumlah_meninggal"} />
                    <LineChartComponent data={data} dataKey={"jumlah_positif"} />
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
