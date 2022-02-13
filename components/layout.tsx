import {ReactNode} from "react";
import Head from "next/head";

interface LayoutProps {
    children: ReactNode
}

function Layout({children}: LayoutProps) {
    return (
        <>
            <Head>
                <title>Covid-19 Information</title>
                <link rel="preload" href="/fonts/PlusJakartaSans-Light.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
                <link rel="preload" href="/fonts/PlusJakartaSans-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
                <link rel="preload" href="/fonts/PlusJakartaSans-Medium.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
                <link rel="preload" href="/fonts/PlusJakartaSans-SemiBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
                <link rel="preload" href="/fonts/PlusJakartaSans-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/>
            </Head>
            <div className={'prose prose-gray md:prose-lg xl:prose-xl flex justify-center bg-gray-50 max-w-none min-h-screen'}>
                <main className={'p-5 w-full md:w-4/5 prose-h3:mb-0 h-auto'}>
                    {children}
                </main>
            </div>
        </>
    );
}

export default Layout;
