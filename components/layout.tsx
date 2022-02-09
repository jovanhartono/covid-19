import {ReactNode} from "react";

interface LayoutProps {
    children: ReactNode
}

function Layout({children}: LayoutProps) {
    return (
        <div className={'prose prose-gray prose-lg sm:prose-xl xl:prose-2xl flex justify-center bg-gray-50 max-w-none min-h-screen'}>
            <main className={'p-5 w-full md:w-2/3 xl:w-1/2 prose-h3:mb-0'}>
                {children}
            </main>
        </div>
    );
}

export default Layout;
