import type {GetStaticProps, NextPage} from 'next'
import {Case} from "../interfaces/general";
import * as React from "react";
import Section from "../components/section";
import axios from "../config/axios";
import {AxiosResponse} from "axios";
import {VaccineSpecimen} from "../interfaces/vaccine";
import Head from "next/head";
import {IndexProps} from "../interfaces/props";

const Home: NextPage<IndexProps> = ({cases, vaccine}: IndexProps) => {
    return (
        <>
            <Head>
                <title>Home</title>
                <meta name="description" content="General Information About Novel Corona Virus 19 in Indonesia."/>
            </Head>
            <h1 className="text-transparent text-center bg-gradient-to-br from-pink-500 to-purple-500 bg-clip-text">Indonesia
                Covid-19 Info</h1>
            <Section cases={cases} vaccine={vaccine}/>
        </>
    )
}

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

export default Home
