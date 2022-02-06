import type {NextPage} from 'next'
import {CovidUpdate, HeroIcon} from "../interfaces/general";
import {EmojiHappyIcon, EmojiSadIcon, PlusCircleIcon, XCircleIcon, EyeIcon} from "@heroicons/react/outline"

import * as React from "react";

const URL_PATH = 'https://data.covid19.go.id/public/api/';

type Data = {
    icon: HeroIcon,
    iconColor: string,
    title: string,
    value: string
};

interface DailyUpdateProperty {
    heading: string,
    updated: string,
    datas: Data[]
}

const Home: NextPage<CovidUpdate> = ({value}: CovidUpdate) => {
    const dailyUpdateProperty: DailyUpdateProperty[] = [
        {
            heading: 'Daily Update',
            updated: value.update.penambahan.created,
            datas: [
                {
                    icon: PlusCircleIcon,
                    iconColor: 'text-red-500',
                    title: 'New Infections',
                    value: value.update.penambahan.jumlah_positif.toLocaleString('id-ID')
                },
                {
                    icon: XCircleIcon,
                    iconColor: 'text-red-500',
                    title: 'Deaths',
                    value: value.update.penambahan.jumlah_meninggal.toLocaleString('id-ID')
                },
                {
                    icon: EmojiSadIcon,
                    iconColor: 'text-red-500',
                    title: 'Hospitalized',
                    value: value.update.penambahan.jumlah_dirawat.toLocaleString('id-ID')
                },
                {
                    icon: EmojiHappyIcon,
                    iconColor: 'text-teal-500',
                    title: 'Recovered',
                    value: value.update.penambahan.jumlah_sembuh.toLocaleString('id-ID')
                }
            ]
        },
        {
            heading: 'Accumulation',
            updated: value.update.penambahan.created,
            datas: [
                {
                    icon: PlusCircleIcon,
                    iconColor: 'text-red-500',
                    title: 'Infections',
                    value: value.update.total.jumlah_positif.toLocaleString('id-ID')
                },
                {
                    icon: XCircleIcon,
                    iconColor: 'text-red-500',
                    title: 'Deaths',
                    value: value.update.total.jumlah_meninggal.toLocaleString('id-ID')
                },
                {
                    icon: EmojiSadIcon,
                    iconColor: 'text-red-500',
                    title: 'Hospitalized',
                    value: value.update.total.jumlah_dirawat.toLocaleString('id-ID')
                },
                {
                    icon: EmojiHappyIcon,
                    iconColor: 'text-teal-500',
                    title: 'Recovered',
                    value: value.update.total.jumlah_sembuh.toLocaleString('id-ID')
                }
            ]
        },
        {
            heading: 'Specimen',
            updated: '',
            datas: [
                {
                    icon: EyeIcon,
                    iconColor: 'text-rose-500',
                    title: 'ODP',
                    value: value.data.jumlah_odp.toLocaleString('id-ID')
                },
                {
                    icon: EyeIcon,
                    iconColor: 'text-rose-500',
                    title: 'Total Tested',
                    value: value.data.total_spesimen.toLocaleString('id-ID')
                },
                {
                    icon: EyeIcon,
                    iconColor: 'text-rose-500',
                    title: 'Tested Negative',
                    value: value.data.total_spesimen_negatif.toLocaleString('id-ID')
                }
            ]
        }

    ]

    return (
        <div
            className="flex justify-center prose prose-gray prose-lg sm:prose-xl xl:prose-2xl bg-gray-50 max-w-none prose-h3:mb-0 min-h-screen">
            <div className="p-5 xl:w-2/3">
                <h1 className="text- text-transparent text-center bg-gradient-to-br from-pink-500 to-purple-500 bg-clip-text">Indonesia
                    Covid-19 Tracker</h1>
                {dailyUpdateProperty.map((props: DailyUpdateProperty, index: number) => {
                    return (
                        <div key={index}>
                            <h3>{props.heading}</h3>
                            {index === 0 ? <span className="text-sm font-light">Last Updated: {props.updated}</span> : <span> </span>}
                            <div className="not-prose w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 mt-3">
                                {props.datas.map((data: Data, index: number) => {
                                    return (
                                        <div key={index} className="rounded-lg p-3 shadow-lg">
                                            <data.icon className={`w-6 h-6 ${data.iconColor}`}/>
                                            <span className="text-xl text-gray-900 font-semibold">{data.value}</span>
                                            <p className="font-light text-sm">{data.title}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}

export async function getStaticProps() {
    const response = await fetch(`${URL_PATH}/update.json`);
    const responseJSON: CovidUpdate = await response.json();
    return {
        props: {
            value: responseJSON
        }, // will be passed to the page component as props
        revalidate: 60
    }
}

export default Home
