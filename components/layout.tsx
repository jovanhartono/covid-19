import {ReactNode} from "react";
import Head from "next/head";
import Header from "./header";

interface LayoutProps {
    children: ReactNode
}

function Layout({children}: LayoutProps) {
    return (
        <>
            <Head>
                <title>Covid-19 Information</title>
                <link rel="preload" href="/fonts/PlusJakartaSans.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
            </Head>
            <div className={'prose prose-gray md:prose-lg xl:prose-xl bg-gray-50 max-w-none min-h-screen'}>
                <Header />
                <main className="w-full flex justify-center">
                    <div className={'p-5 w-full md:w-4/5 prose-h3:mb-0 h-auto'}>
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}

export default Layout;
