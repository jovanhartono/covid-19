import type {GetStaticProps, NextPage} from 'next'
import {Case} from "../interfaces/general";
import * as React from "react";
import Infection from "../components/infection";

const URL_PATH = 'https://data.covid19.go.id/public/api/';

const Home: NextPage<Case> = ({value}: Case) => {
    return (
        <div
            className="flex justify-center prose prose-gray prose-lg sm:prose-xl xl:prose-2xl bg-gray-50 max-w-none prose-h3:mb-0 min-h-screen">
            <title>Covid 19 Tracker</title>
            <div className="p-5 xl:w-2/3">
                <h1 className="text-transparent text-center bg-gradient-to-br from-pink-500 to-purple-500 bg-clip-text">Indonesia
                    Covid-19 Tracker</h1>
                <Infection value={value}/>
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await fetch(`${URL_PATH}/update.json`, {
        method: "GET",
        headers: {
            "User-Agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Mobile Safari/537.36"
        }
    });
    const responseJSON: Case = await response.json();
    return {
        props: {
            value: responseJSON
        },
        revalidate: 21600
    }
}

export default Home
