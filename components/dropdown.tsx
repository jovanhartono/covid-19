import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon} from "@heroicons/react/outline";
import {Fragment, useState} from "react";
import {ButtonFilter} from "../interfaces/general";
import {buttonFilters} from "../public/button-filters";

interface DropdownProps {
    filterData: (dateFilter: number) => void,
}

function Dropdown({filterData}: DropdownProps) {
    const [buttonActive, setButtonActive] = useState<{active: string}>({active: 'forever'});

    return (
        <Menu as='div' className="relative inline-block text-left appearance-none">
            <Menu.Button
                className={"text-base font-light drop-shadow-sm inline-flex items-center border border-gray-300 hover:border-pink-500 p-2 rounded-lg focus:outline-none text-gray-900"}>Filter
                <ChevronDownIcon className={"w-4 h-4 text-gray-900 ml-4"}/>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="not-prose z-10 mt-2 w-56 right-0 absolute divide-y text-gray-900 divide-gray-100 bg-white p-1 rounded-lg shadow-md flex flex-col focus:outline-none">
                    {
                        buttonFilters.map((button: ButtonFilter, index: number) => {
                            return (
                                <Menu.Item key={index}>
                                    {({active}) => (
                                        <button
                                            className={`${(buttonActive.active === button.value || active) && 'flex items-center bg-gradient-to-r from-pink-500 to to-fuchsia-500 text-white'}
                                rounded-md text-left px-2 py-2 text-xs font-light`}
                                            onClick={() => {
                                                setButtonActive({active: button.value})
                                                filterData(button.filter)
                                            }}>
                                            {button.label}
                                        </button>
                                    )}
                                </Menu.Item>
                            );
                        })
                    }
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default Dropdown;
