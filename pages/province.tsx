import {GetStaticProps, NextPage} from "next";
import {AxiosResponse} from "axios";
import {githubAPI} from "../config/axios";
import {ProvinceData, ProvinceProps} from "../interfaces/props";
import React, {Fragment, useState} from "react";
import {Combobox, Transition} from "@headlessui/react";
import {SelectorIcon} from "@heroicons/react/solid";
import ComposedChartComponent from "../components/composed-chart";
import PieChartComponent from "../components/pie-chart";
import CardComponent from "../components/card";
import {CardSection} from "../interfaces/general";
import dayjs from "dayjs";
import {EmojiHappyIcon, EmojiSadIcon, PlusCircleIcon, XCircleIcon} from "@heroicons/react/outline";
import Head from "next/head";

const Province: NextPage<ProvinceProps> = ({provinceData}: ProvinceProps) => {
    const [selectedProvince, setSelectedProvince] = useState<ProvinceData>(provinceData[0]);
    const [query, setQuery] = useState('');

    const filteredProvince: ProvinceData[] = query === '' ? provinceData : provinceData.filter((person: ProvinceData) =>
        person.provinsi.toLowerCase().includes(query.toLowerCase()));

    const genderData = {
        title: 'Cases by Gender',
        data: [
            {
                label: 'Men',
                value: selectedProvince.jenis_kelamin["laki-laki"],
                fill: '#a855f7'
            },
            {
                label: 'Women',
                value: selectedProvince.jenis_kelamin.perempuan,
                fill: '#d946ef'
            }
        ]
    }

    const provinceCard: CardSection = {
        heading: 'General Information',
        updated: dayjs(selectedProvince.last_date).format('dddd, DD MMM YYYY'),
        datas: [
            {
                icon: PlusCircleIcon,
                iconColor: 'text-red-500',
                title: 'New Infections',
                value: selectedProvince.penambahan.positif
            },
            {
                icon: PlusCircleIcon,
                iconColor: 'text-red-500',
                title: 'Total Infections',
                value: selectedProvince.kasus
            },
            {
                icon: EmojiHappyIcon,
                iconColor: 'text-emerald-500',
                title: 'Daily Recovery',
                value: selectedProvince.penambahan.sembuh
            },
            {
                icon: EmojiHappyIcon,
                iconColor: 'text-emerald-500',
                title: 'Total Recovery',
                value: selectedProvince.sembuh
            },
            {
                icon: XCircleIcon,
                iconColor: 'text-red-500',
                title: 'Daily Mortality',
                value: selectedProvince.penambahan.meninggal
            },
            {
                icon: XCircleIcon,
                iconColor: 'text-red-500',
                title: 'Total Mortality',
                value: selectedProvince.meninggal
            },
            {
                icon: EmojiSadIcon,
                iconColor: 'text-red-500',
                title: 'Hospitalized',
                value: selectedProvince.dirawat
            },
        ]
    };

    return (
        <>
            <Head>
                <title>Province</title>
                <meta name="description" content="Information About Novel Corona Virus 19 in Indonesia by Provinces."/>
            </Head>
            <div>
                <h1 className='text-transparent text-center bg-gradient-to-br from-pink-500 to-purple-500 bg-clip-text
                leading-normal !leading-tight'>Province</h1>
                <div className="mb-12 grid">
                    <div className="md:flex justify-between">
                        <h2 className="!m-0">
                            {provinceCard.heading}
                            {provinceCard.updated !== undefined ? <p className="text-sm font-light">Last Updated: {provinceCard.updated}</p> :
                                <span> </span>}
                        </h2>
                        <div className="w-72 not-prose">
                            <Combobox value={selectedProvince} onChange={setSelectedProvince}>
                                <div
                                    className="relative w-full text-left bg-white rounded-lg shadow-md cursor-default p-1.5
                            sm:text-sm overflow-hidden">
                                    <Combobox.Input
                                        className="w-full border-none focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900
                                focus:outline-none uppercase"
                                        onChange={(event) => setQuery(event.target.value)}
                                        displayValue={(province: ProvinceData) => province.provinsi}
                                    />
                                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                        <SelectorIcon
                                            className="w-5 h-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </Combobox.Button>
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-200"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-200"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <Combobox.Options
                                        className="max-h-36 overflow-auto absolute bg-white shadow-md rounded mt-2 w-72 z-10">
                                        {
                                            filteredProvince.length === 0 && query !== '' ?
                                                <div className="p-2 text-sm font-light text-gray-500">
                                                    Province does not exist.
                                                </div>
                                                : filteredProvince.map((provinceData: ProvinceData, index: number) => (
                                                    <Combobox.Option
                                                        key={index} value={provinceData}
                                                        className={({active, selected}) => `select-none cursor-default focus:outline-none
                                                list-none text-sm p-2 m-0 font-light
                                                ${selected && 'bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white'}
                                                ${active && !selected ? 'text-white bg-gradient-to-r from-pink-500 to-fuchsia-500' : 'text-gray-900'}
                                                `}>
                                                        {provinceData.provinsi}
                                                    </Combobox.Option>
                                                ))
                                        }
                                    </Combobox.Options>
                                </Transition>
                            </Combobox>
                        </div>
                    </div>
                    <CardComponent section={provinceCard}/>
                </div>
                <div>
                    <div className="grid md:grid-cols-2 gap-3 prose-sm">
                        <ComposedChartComponent title={'Infections by Age'} key={Math.random()}
                                                data={Object.entries(selectedProvince.kelompok_umur)}/>
                        <PieChartComponent key={Math.random()} title='Cases by Gender' data={genderData.data}/>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Province;

export const getStaticProps: GetStaticProps = async () => {
    const provinceData: AxiosResponse<ProvinceData> = await githubAPI.get('provinsi/more').then(response => response.data);

    return {
        props: {provinceData},
        revalidate: 3600
    }
}
