import {Transition} from "@headlessui/react";
import {CubeIcon, MenuAlt4Icon, XIcon} from "@heroicons/react/solid";
import Link from "next/link";
import {Fragment, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {distinctUntilChanged, fromEvent} from "rxjs";

function Header() {
    const [active, setActive] = useState<boolean>(false);
    const [shadow, setShadow] = useState<boolean>(false);
    const router = useRouter();

    const routes = [
        {
            label: 'Home',
            path: '/'
        },
        {
            label: 'Details',
            path: '/details'
        },
        {
            label: 'Province',
            path: '/province'
        }
    ]

    useEffect(() => {
        const scrollEvent = fromEvent(window, 'scroll').pipe(distinctUntilChanged())
            .subscribe(() => setShadow(() => window.scrollY > 0));

        return () => {
            scrollEvent.unsubscribe();
        }
    }, []);

    return (
        <>
            <header
                className={`${shadow && 'shadow-lg'} transition-all duration-200 ease-in-out w-full flex justify-center items-center backdrop-blur z-20 sticky top-0 bg-gray-50/70 h-16`}>
                <div className="w-full md:w-4/5 flex justify-between items-center px-5 relative">
                    <Link href="/">
                        <a className="flex items-center no-underline space-x-1 flex-wrap"
                           onClick={() => setActive(false)}>
                            <CubeIcon className="w-10 h-10 text-pink-500"/>
                            <span
                                className="text-transparent bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 bg-clip-text">Rho</span>
                        </a>
                    </Link>
                    <div onClick={() => setActive((currentState: boolean) => !currentState)}
                         className="p-1 cursor-pointer">
                        <MenuAlt4Icon className="w-6 h-6"/>
                    </div>
                </div>
            </header>
            <Transition
                as={Fragment}
                enter="transition duration-150"
                enterFrom="transform translate-x-full"
                enterTo="transform translate-x-0"
                leave="transition duration-150"
                leaveFrom="transform translate-x-0"
                leaveTo="transform translate-x-full"
                show={active}
            >
                <div
                    className={`fixed h-full bg-gray-50 top-0 right-0 z-30 w-1/2 md:w-64 border-l p-4 flex flex-col`}>
                    <div className="flex items-center justify-between mb-3">
                        <CubeIcon className="w-10 h-10 text-pink-500"/>
                        <XIcon className="w-6 h-6"/>
                    </div>
                    <nav className="not-prose">
                        <ul className="list-none">
                            {
                                routes.map((route, index: number) => (
                                    <li key={index}>
                                        <Link href={route.path}>
                                            <a className={`text-base ${router.pathname === route.path ?
                                                'text-transparent bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500 bg-clip-text font-semibold' : 'text-gray-900 font-light'}
                                            `}
                                               onClick={() => setActive(v => !v)}>{route.label}</a>
                                        </Link>
                                    </li>
                                ))
                            }
                        </ul>
                    </nav>
                    <small
                        className="mt-auto font-light text-xs text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-500">by
                        Jovanus Hartono</small>
                </div>
            </Transition>
        </>
    );
}

export default Header;
