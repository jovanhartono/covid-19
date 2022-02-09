import {Case, CardSection} from "../interfaces/general";
import * as React from "react";
import {
    ClipboardCheckIcon,
    EmojiHappyIcon,
    EmojiSadIcon,
    MinusIcon,
    PlusCircleIcon,
    XCircleIcon,
    BeakerIcon
} from "@heroicons/react/outline";
import Cards from "./card";
import {VaccineSpecimen} from "../interfaces/vaccine";

interface InfectionProps{
    cases: Case,
    vaccine: VaccineSpecimen
}

function Infection({cases, vaccine}: InfectionProps) {
    const dailyUpdateProperty: CardSection[] = [
        {
            heading: 'Daily Update',
            updated: cases.update.penambahan.created,
            datas: [
                {
                    icon: PlusCircleIcon,
                    iconColor: 'text-red-500',
                    title: 'New Infections',
                    value: cases.update.penambahan.jumlah_positif.toLocaleString('id-ID')
                },
                {
                    icon: XCircleIcon,
                    iconColor: 'text-red-500',
                    title: 'Deaths',
                    value: cases.update.penambahan.jumlah_meninggal.toLocaleString('id-ID')
                },
                {
                    icon: EmojiSadIcon,
                    iconColor: 'text-red-500',
                    title: 'Hospitalized',
                    value: cases.update.penambahan.jumlah_dirawat.toLocaleString('id-ID')
                },
                {
                    icon: EmojiHappyIcon,
                    iconColor: 'text-emerald-500',
                    title: 'Recovered',
                    value: cases.update.penambahan.jumlah_sembuh.toLocaleString('id-ID')
                },
                {
                    icon: BeakerIcon,
                    iconColor: 'text-emerald-500',
                    title: 'First Dose',
                    value: vaccine.vaksinasi.penambahan.jumlah_vaksinasi_1.toLocaleString('id-ID')
                },
                {
                    icon: BeakerIcon,
                    iconColor: 'text-emerald-500',
                    title: 'Second Dose',
                    value: vaccine.vaksinasi.penambahan.jumlah_vaksinasi_2.toLocaleString('id-ID')
                },
                {
                    icon: ClipboardCheckIcon,
                    iconColor: 'text-gray-500',
                    title: 'PCR',
                    value: vaccine.pemeriksaan.penambahan.jumlah_spesimen_pcr_tcm.toLocaleString('id-ID')
                },
                {
                    icon: ClipboardCheckIcon,
                    iconColor: 'text-gray-500',
                    title: 'Antigen',
                    value: vaccine.pemeriksaan.penambahan.jumlah_spesimen_antigen.toLocaleString('id-ID')
                }
            ]
        },
        {
            heading: 'Accumulation',
            datas: [
                {
                    icon: PlusCircleIcon,
                    iconColor: 'text-red-500',
                    title: 'Infections',
                    value: cases.update.total.jumlah_positif.toLocaleString('id-ID')
                },
                {
                    icon: XCircleIcon,
                    iconColor: 'text-red-500',
                    title: 'Deaths',
                    value: cases.update.total.jumlah_meninggal.toLocaleString('id-ID')
                },
                {
                    icon: EmojiSadIcon,
                    iconColor: 'text-red-500',
                    title: 'Hospitalized',
                    value: cases.update.total.jumlah_dirawat.toLocaleString('id-ID')
                },
                {
                    icon: EmojiHappyIcon,
                    iconColor: 'text-teal-500',
                    title: 'Recovered',
                    value: cases.update.total.jumlah_sembuh.toLocaleString('id-ID')
                },
                {
                    icon: BeakerIcon,
                    iconColor: 'text-emerald-500',
                    title: 'First Dose',
                    value: vaccine.vaksinasi.total.jumlah_vaksinasi_1.toLocaleString('id-ID')
                },
                {
                    icon: BeakerIcon,
                    iconColor: 'text-emerald-500',
                    title: 'Second Dose',
                    value: vaccine.vaksinasi.total.jumlah_vaksinasi_2.toLocaleString('id-ID')
                },
                {
                    icon: ClipboardCheckIcon,
                    iconColor: 'text-gray-500',
                    title: 'Total Tested',
                    value: cases.data.total_spesimen.toLocaleString('id-ID')
                },
                {
                    icon: MinusIcon,
                    iconColor: 'text-emerald-500',
                    title: 'Tested Negative',
                    value: cases.data.total_spesimen_negatif.toLocaleString('id-ID')
                }
            ]
        }
    ]

    return (
        <>{dailyUpdateProperty.map((section: CardSection, index: number) => {
            return (
                <div key={index}>
                    <h3>{section.heading}</h3>
                    {section.updated !== undefined ? <span className="text-sm font-light">Last Updated: {section.updated}</span> :
                        <span> </span>}
                    <Cards section={section} />
                </div>
            )
        })}
        </>
    )
}

export default Infection
