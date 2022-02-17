import {Menu, Transition} from '@headlessui/react'
import {ChevronDownIcon} from "@heroicons/react/outline";
import {Fragment, useState} from "react";
import {ButtonFilter} from "../interfaces/general";
import {buttonFilters} from "../public/button-filters";

interface DropdownProps {
    filterData: (dateFilter: number) => void,
}

function Dropdown({filterData}: DropdownProps) {
    const [buttonActive, setButtonActive] = useState<{ active: string }>({active: 'forever'});
    const [dropdownState, setSelectedLabel] = useState<{ selectedLabel: string, touched: boolean }>({
        selectedLabel: 'Filter',
        touched: false
    });

    return (
        <Menu as='div' className="relative inline-block text-left appearance-none">
            {({open}) => (
                <>
                    <Menu.Button
                        className={`${dropdownState.touched ? 'text-fuchsia-700 border-fuchsia-500 font-normal' : 'text-gray-900'} 
                        ${open && 'border-fuchsia-500'}
                text-base font-light drop-shadow-sm inline-flex items-center border hover:border-fuchsia-500 
                p-2 rounded-lg focus:outline-none`}>
                        {dropdownState.selectedLabel}
                        <ChevronDownIcon className={`${open ? 'text-fuchsia-700 transform rotate-180' : 'text-gray-900'} 
                        w-4 h-4 ml-4 transition-all duration-200 ease-in-out`}/>
                    </Menu.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-200"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items
                            className="rounded overflow-hidden not-prose z-10 mt-2 w-56 right-0 absolute text-gray-900
                            bg-white shadow-md flex flex-col focus:outline-none">
                            {buttonFilters.map((button: ButtonFilter, index: number) => {
                                return (
                                    <Menu.Item key={index}>
                                        {({active}) => (
                                            <button
                                                className={`${(buttonActive.active === button.value || active) &&
                                                'flex items-center bg-gradient-to-r from-pink-500 to to-fuchsia-500 text-white'}
                                                text-left px-2 py-2 text-sm font-light`}
                                                onClick={() => {
                                                    setButtonActive({active: button.value})
                                                    setSelectedLabel({selectedLabel: button.label, touched: true})
                                                    filterData(button.filter)
                                                }}> {button.label} </button>
                                        )}
                                    </Menu.Item>
                                );
                            })}
                        </Menu.Items>
                    </Transition>
                </>
            )}
        </Menu>
    )
}

export default Dropdown;
