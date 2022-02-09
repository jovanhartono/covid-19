import type {GetStaticProps, NextPage} from 'next'
import {Case} from "../interfaces/general";
import * as React from "react";
import Infection from "../components/infection";
import axios from "../config/axios";
import {AxiosResponse} from "axios";
import {VaccineSpecimen} from "../interfaces/vaccine";

interface IndexProps {
    update: Case;
    vaccine: VaccineSpecimen;
}

const Home: NextPage<IndexProps> = ({update, vaccine}: IndexProps) => {
    return (
        <div
            className="flex justify-center prose prose-gray prose-lg sm:prose-xl xl:prose-2xl bg-gray-50 max-w-none prose-h3:mb-0 min-h-screen">
            <title>Covid 19 Tracker</title>
            <div className="p-5 xl:w-2/3">
                <h1 className="text-transparent text-center bg-gradient-to-br from-pink-500 to-purple-500 bg-clip-text">Indonesia
                    Covid-19 Tracker</h1>
                <Infection value={update}/>
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const [update, vaccine]: [AxiosResponse<Case>, AxiosResponse<VaccineSpecimen>] = await Promise.all([
        axios.get('update.json').then(response=> response.data),
        axios.get('pemeriksaan-vaksinasi.json').then(response=> response.data)
    ]);

    return {
        props: {update, vaccine},
        revalidate: 21600
    }
}

export default Home
