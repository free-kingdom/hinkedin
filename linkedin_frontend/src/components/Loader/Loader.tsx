export function Loader() {
    return (
        <div className="h-screen w-full flex flex-col gap-2 justify-center items-center">
            <img className="w-48" alt="logo" src="/logo.svg"/>
            <div className="w-48 h-1 bg-gray-200 relative">
                <div className="absolute w-16 h-1 bg-linkedin animate-slide"></div>
            </div>
        </div>
    );
}
