import type {GetStaticProps, NextPage} from 'next'
import {Case} from "../interfaces/general";
import * as React from "react";
import Infection from "../components/infection";
import axios from "../config/axios";
import {AxiosResponse} from "axios";
import {VaccineSpecimen} from "../interfaces/vaccine";
import Head from "next/head";

interface IndexProps {
    cases: Case;
    vaccine: VaccineSpecimen;
}

const Home: NextPage<IndexProps> = ({cases, vaccine}: IndexProps) => {
    return (
        <div
            className="flex justify-center prose prose-gray prose-lg sm:prose-xl xl:prose-2xl bg-gray-50 max-w-none prose-h3:mb-0 min-h-screen">
            <Head>
                <title>Covid-19 Info</title>
                <meta name="description" content="General Information About Novel Corona Virus 19 in Indonesia." />
            </Head>
            <div className="p-5 w-full md:w-2/3 xl:w-1/2">
                <h1 className="text-transparent text-center bg-gradient-to-br from-pink-500 to-purple-500 bg-clip-text">Indonesia
                    Covid-19 Info</h1>
                <Infection cases={cases} vaccine={vaccine}/>
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const [cases, vaccine]: [AxiosResponse<Case>, AxiosResponse<VaccineSpecimen>] = await Promise.all([
        axios.get('update.json').then(response=> response.data),
        axios.get('pemeriksaan-vaksinasi.json').then(response=> response.data)
    ]);

    return {
        props: {cases, vaccine},
        revalidate: 21600
    }
}

export default Home
