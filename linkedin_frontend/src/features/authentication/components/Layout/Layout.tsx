import { ReactNode } from "react";

export function Layout({children, slogan} : {children: ReactNode, slogon:string}) {
    return (
        <div className="bg-gray-50 grid grid-rows-[auto_1fr_auto] h-screen">
            <header className="px-12 pt-4 md:px-32 md:pt-5 grid">
                <a href="/" className="w-32">
                    <img alt="logo" src="/logo.svg" />
                </a>
                <h1 className="text-center text-[32px] mt-2">{slogan}</h1>
            </header>

            <main className="self-center">
                {children}
            </main>

            <footer className="pt-1 pb-4 text-xs bg-white font-bold">
                <ul className="flex justify-center items-center flex-wrap gap-3 mt-2 text-gray-500">
                    <li className="flex gap-1">
                        <img className="w-16" alt="dark-logo" src="/logo-dark.svg"/>
                        <span className="text-xs font-normal text-gray-400">&copy; 2025</span>
                    </li>
                    <li>
                        <a href="">
                            关于
                        </a>
                    </li>
                    <li>
                        <a href="">
                            无障碍模式
                        </a>
                    </li>
                    <li>
                        <a href="">
                            用户协议
                        </a>
                    </li>
                    <li>
                        <a href="">
                            隐私政策
                        </a>
                    </li>
                    <li>
                        <a href="">
                            Cookie 政策
                        </a>
                    </li>
                    <li>
                        <a href="">
                            版权政策
                        </a>
                    </li>
                    <li>
                        <a href="">
                            品牌政策
                        </a>
                    </li>
                    <li>
                        <a href="">
                            访客设置
                        </a>
                    </li>
                    <li>
                        <a href="">社区准则</a>
                    </li>
                    <li>
                        <a href="">语言</a>
                    </li>
                </ul>
            </footer>
        </div>
    )
}
