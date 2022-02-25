import {GetStaticProps, NextPage} from "next";
import {AxiosResponse} from "axios";
import {githubAPI} from "../config/axios";
import {ProvinceData, ProvinceProps} from "../interfaces/props";
import React, {Fragment, useState} from "react";
import {Combobox, Transition} from "@headlessui/react";
import {SelectorIcon} from "@heroicons/react/solid";

const Province: NextPage<ProvinceProps> = ({provinceData}: ProvinceProps) => {
    const [selectedProvince, setSelectedProvince] = useState<ProvinceData>(provinceData[0]);
    const [query, setQuery] = useState('');

    const filteredProvince: ProvinceData[] = query === '' ? provinceData : provinceData.filter((person: ProvinceData) =>
        person.provinsi.toLowerCase().includes(query.toLowerCase()));

    return (
        <div>
            <h1 className='text-transparent text-center bg-gradient-to-br from-pink-500 to-purple-500 bg-clip-text
            leading-normal !leading-tight'>Province</h1>
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
                            className="max-h-36 overflow-auto absolute bg-white shadow-md rounded mt-2 w-72">
                            {
                                filteredProvince.length === 0 && query !== '' ?
                                    <div className="p-2 text-sm font-light text-gray-500">
                                        Province does not exist.
                                    </div>
                                    : filteredProvince.map((provinceData: ProvinceData, index: number) => (
                                        <Combobox.Option
                                            key={index} value={provinceData}
                                            className="select-none cursor-default focus:outline-none text-gray-900
                                            list-none text-sm p-2 m-0 font-light hover:bg-gradient-to-r hover:from-pink-500 hover:to-fuchsia-500 hover:text-white">
                                            {provinceData.provinsi}
                                        </Combobox.Option>
                                    ))
                            }
                        </Combobox.Options>
                    </Transition>
                </Combobox>
            </div>
            <div>
                <p>Provinsi: {selectedProvince.provinsi}</p>
                <p>Kasus: {selectedProvince.kasus}</p>
                <p>Dirawat: {selectedProvince.dirawat}</p>
            </div>
        </div>
    );
}

export default Province;

export const getStaticProps: GetStaticProps = async () => {
    const provinceData: AxiosResponse<ProvinceData> = await githubAPI.get('provinsi').then(response => response.data);

    return {
        props: {provinceData},
        revalidate: 3600
    }
}
