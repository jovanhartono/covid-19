import {Transition} from "@headlessui/react";
import {CubeIcon, MenuAlt4Icon, XIcon} from "@heroicons/react/solid";
import Link from "next/link";
import {Fragment, useState} from "react";

function Header() {
    const [active, setActive] = useState<boolean>(false);

    return (
        <>
            <header
                className="w-full flex justify-center items-center z-20 sticky top-0 bg-gray-50 h-16 border-b border-b-fuchsia-500/10">
                <div className="w-full md:w-4/5 flex justify-between items-center px-5 relative">
                    <Link href="/">
                        <a className="flex items-center no-underline space-x-1" onClick={() => setActive(false)}>
                            <CubeIcon className="w-10 h-10 text-pink-500"/>
                            <span
                                className="text-transparent bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 bg-clip-text">Rho</span>
                        </a>
                    </Link>
                    <div>
                        {
                            active ?
                                <XIcon className="w-6 h-6 cursor-pointer"
                                       onClick={() => setActive((currentState: boolean) => !currentState)}/> :
                                <MenuAlt4Icon className="w-6 h-6 cursor-pointer"
                                              onClick={() => setActive((currentState: boolean) => !currentState)}/>
                        }
                    </div>
                </div>
            </header>
            <Transition
                as={Fragment}
                enter="transition duration-200"
                enterFrom="transform translate-x-full"
                enterTo="transform translate-x-0"
                leave="transition duration-200"
                leaveFrom="transform translate-x-0"
                leaveTo="transform translate-x-full"
                show={active}
            >
                <div className={`fixed h-full bg-gray-50 top-0 right-0 z-10 pt-16 w-1/2 md:w-64 border-l px-4 py-2 flex flex-col justify-between`}>
                    <nav className="not-prose">
                        <ul className="list-none">
                            <li>
                                <Link href="/">
                                    <a>Home</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/details">
                                    <a>Details</a>
                                </Link>
                            </li
                            ><li>
                                <Link href="/province">
                                    <a>Province</a>
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <small>by Jovanus Hartono</small>
                </div>
            </Transition>
        </>
    );
}

export default Header;
