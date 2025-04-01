import { useEffect, useRef, useState } from "react";
import { useAuthentication } from "../../../authentication/contexts/AuthenticationContextProvider";
import { CardBox } from "../CardBox/CardBox";

function PostFeedButton({ text, children }) {
    return (
        <button className="px-2.5 py-3 rounded hover:bg-gray-100 flex gap-1 flex justify-center">
            {children}
            <span className="font-bold text-sm text-gray-600">{text}</span>
        </button>
    );
}

function PostFeed() {
    const { user } = useAuthentication();
    let avatar = user.avatar ? user.avatar : "/default-avatar.png";

    return (
        <div className="p-4 pb-1 border border-gray-300 rounded-lg bg-white flex flex-col gap-2 relative">
            <div className="flex flex-col gap-2">
                <div className="flex gap-4">
                    <img src={avatar} className="size-11"/>
                    <button className="rounded-full border border-gray-400 flex flex-grow bg-gray-100 items-center pl-4 cursor-pointer">
                        <span className="font-bold text-gray-600 text-sm">发动态</span>
                    </button>
                </div>
            </div>
            <div className="flex gap-2 justify-around">
                <PostFeedButton text="照片">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="size-5 text-sky-600">
                        <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"/>
                    </svg>
                </PostFeedButton>
                <PostFeedButton text="视频">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="size-5 text-lime-600">
                        <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm-9 12V8l6 4z"/>
                    </svg>
                </PostFeedButton>
                <PostFeedButton text="写文章">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="size-5 text-amber-600">
                        <path d="M21 3v2H3V3zm-6 6h6V7h-6zm0 4h6v-2h-6zm0 4h6v-2h-6zM3 21h18v-2H3zM13 7H3v10h10z"/>
                    </svg>
                </PostFeedButton>
            </div>
        </div>
    );
}

function Feed() {
    return (
        <CardBox>

        </CardBox>
    );
}

function FeedsList() {
    return (
        <CardBox>

        </CardBox>
    );
}

function DropDownItem({ text, sortBy, onClick }) {
    let isActive = text === sortBy;

    return (
        <li>
            <button className={`hover:bg-gray-100 w-full py-0.5 flex pl-2 ${isActive ? "border-l-2" : ""}`}
                    onClick={() => onClick(text)}>
                <span className="font-bold text-gray-600 text-sm">{text}</span>
            </button>
        </li>
    );
}

function SortDropDown({ sortBy, onClick }) {
    return (
        <div className="bg-white flex flex-col py-1 rounded-b-md w-24 shadow-md border border-gray-300">
            <ul >
                <DropDownItem text="热门" sortBy={sortBy} onClick={onClick}/>
                <DropDownItem text="最近" sortBy={sortBy} onClick={onClick}/>
            </ul>
        </div>
    );
}

function SeparatorAndSort() {
    const [displayDropdown, setDisplayDropdown] = useState(false);
    const compRef = useRef();
    const [sortBy, setSortBy] = useState("热门");

    useEffect(() => {
        function handleClickOutside(evt) {
            if (compRef.current && !compRef.current.contains(evt.target)) {
                setDisplayDropdown(false);
            }
        }
        window.addEventListener("pointerdown", handleClickOutside);
        return () => window.removeEventListener("pointerdown", handleClickOutside);
    }, []);

    return (
        <div className="flex items-center gap-3" ref={compRef}>
            <div className="border-t border-gray-400 flex-grow"></div>
            <div className="relative">
                <button className="cursor-pointer"
                        onClick={() => setDisplayDropdown(!displayDropdown)}>
                    <span className="text-xs text-gray-500 flex">
                        排序方式:<strong className="text-black">{sortBy}</strong>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                             className="size-4">
                            <path d="M8 11L3 6h10z" fill-rule="evenodd"/>
                        </svg>
                    </span>
                </button>
                {
                    displayDropdown &&
                    <div className="absolute end-0 top-7 z-20">
                        <SortDropDown sortBy={sortBy} onClick={setSortBy}/>
                    </div>
                }
            </div>
        </div>
    );
}

export function FeedsCard() {
    return (
        <div className="flex flex-col gap-2">
            <PostFeed />
            <SeparatorAndSort />
            <FeedsList />
        </div>
    );
}

