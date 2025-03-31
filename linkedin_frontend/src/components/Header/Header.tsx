import { NavLink } from "react-router-dom";
import { useAuthentication } from "../../features/authentication/contexts/AuthenticationContextProvider";
import { Navbar } from "./components/Navbar/Navbar";
import { SearchInput } from "./components/SearchInput/SearchInput";

export function Header() {
    const { user } = useAuthentication();

    return (
        <header className="fixed bg-white w-full flex justify-center h-12 shadow-sm py-7">
            <div className="flex w-full md:w-6/7 lg:w-5/6 xl:w-3/4 items-center">
                <div className="flex p-2 gap-2 sm:gap-0">
                    <NavLink to="/">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" focusable="false"
                             className="text-linkedin size-9">
                            <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"></path>
                        </svg>
                    </NavLink>
                    <SearchInput />
                </div>
                <div className="ml-auto">
                    <Navbar />
                </div>
            </div>
        </header>
    );
}
