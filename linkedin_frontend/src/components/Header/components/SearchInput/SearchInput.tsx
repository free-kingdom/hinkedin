export function SearchInput({...otherProps}: InputProps) {
    return (
        <div className="relative text-slate-500 flex">
            <button className="sm:absolute sm:top-2 sm:start-2 hover:text-slate-700 sm:w-5 w-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                     className="">
                    <path d="M14.56 12.44L11.3 9.18a5.51 5.51 0 10-2.12 2.12l3.26 3.26a1.5 1.5 0 102.12-2.12zM3 6.5A3.5 3.5 0 116.5 10 3.5 3.5 0 013 6.5z"/>
                </svg>
            </button>
            <input {...otherProps} placeholder="搜索"
                   className="bg-stone-100 rounded py-1.5 pl-8 focus:outline-linkedin/70 hidden sm:block"/>
        </div>
    );
}
