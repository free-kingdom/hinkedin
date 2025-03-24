import { useAuthentication } from "../../authentication/contexts/AuthenticationContextProvider"

export function Feed() {
    const { logout } = useAuthentication();

    return (
        <div className="min-h-screen grid grid-rows-[auto_1fr] bg-white gap-4">
            <header className="bg-neutral-300 flex justify-end p-3 space-x-2 pr-8 items-center">
                <p>您好,</p>
                <a>user</a>
                <p>|</p>
                <p onClick={logout}>登出</p>
            </header>
            <main className="md:mx-16 mx-4 grid gap-4 p-2 grid-rows-[10rem_1fr_10rem] md:grid-cols-[15rem_1fr_18rem] md:grid-rows-[auto]">
                {/* right */}
                <div className="bg-neutral-300 rounded-lg md:h-96"></div>
                <div className="grid grid-rows-[7rem_1fr] gap-4">
                    {/* posting */}
                    <div className="bg-neutral-300 rounded-lg"></div>
                    {/* feed */}
                    <div className="bg-neutral-300 rounded-lg"></div>
                </div>
                {/* left */}
                <div className="bg-neutral-300 rounded-lg md:h-64"></div>
            </main>
        </div>
    )
}
