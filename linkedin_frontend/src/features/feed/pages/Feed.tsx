import { useAuthentication } from "../../authentication/contexts/AuthenticationContextProvider"

export function Feed() {
    const { user, logout } = useAuthentication();

    return (
        <div className="pt-6 min-h-screen bg-stone-50 flex justify-center w-full">
            <div className="min-w-96 flex flex-col md:flex-row gap-8 justify-center w-full md:w-6/7 lg:w-5/6 xl:w-3/4">
                <div className="bg-white w-full h-full md:w-1/2 lg:w-1/4">

                </div>
                <div className="bg-white w-full h-full lg:w-1/2">

                </div>
                <div className="bg-white w-full h-full md:hidden lg:block lg:w-1/3">

                </div>
            </div>
        </div>
    )
}
