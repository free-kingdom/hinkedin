import { useAuthentication } from "../../authentication/contexts/AuthenticationContextProvider"

export function Feed() {
    const { user, logout } = useAuthentication();

    return (
        <div className="min-h-screen grid grid-rows-[auto_1fr] bg-stone-50 gap-4">
            <div className="md:mx-16 mx-4 grid gap-4 p-2 grid-rows-[10rem_1fr_10rem] md:grid-cols-[15rem_1fr_18rem] md:grid-rows-[auto]">
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
            </div>
        </div>
    )
}
