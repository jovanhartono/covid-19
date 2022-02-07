import {CovidUpdate, DailyUpdateProperty, Data} from "../interfaces/general";
import * as React from "react";
import {
    ClipboardCheckIcon,
    EmojiHappyIcon,
    EmojiSadIcon,
    EyeIcon, MinusIcon,
    PlusCircleIcon,
    XCircleIcon
} from "@heroicons/react/outline";

function Infection({value}: CovidUpdate) {
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
                    iconColor: 'text-gray-500',
                    title: 'ODP',
                    value: value.data.jumlah_odp.toLocaleString('id-ID')
                },
                {
                    icon: ClipboardCheckIcon,
                    iconColor: 'text-gray-500',
                    title: 'Total Tested',
                    value: value.data.total_spesimen.toLocaleString('id-ID')
                },
                {
                    icon: MinusIcon,
                    iconColor: 'text-rose-500',
                    title: 'Tested Negative',
                    value: value.data.total_spesimen_negatif.toLocaleString('id-ID')
                }
            ]
        }
    ]

    return (
        <>{dailyUpdateProperty.map((props: DailyUpdateProperty, index: number) => {
            return (
                <div key={index}>
                    <h3>{props.heading}</h3>
                    {index === 0 ? <span className="text-sm font-light">Last Updated: {props.updated}</span> :
                        <span> </span>}
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
        })}
        </>
    )
}

export default Infection
