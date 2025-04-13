import { useEffect, useRef, useState } from "react";
import { WritePostCard } from "./WritePostCard";
import { PostCard }  from "./PostCard"
import { request } from "../../../../utils/api";
import { Post } from "../Post/Post";

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
                <DropDownItem text="所有" sortBy={sortBy} onClick={onClick}/>
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
                            <path d="M8 11L3 6h10z" fillRule="evenodd"/>
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

export function PostsList({ fetchListURL } : {fetchListURL: string}) {
    const [postsList, setPostsList] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let fetchFeeds = async () => {
            await request({
                endpoint: fetchListURL,
                onSuccess: (data) => setPostsList(data),
                onFailure: (msg) => setErrorMessage(msg)
            });
        };

        fetchFeeds();
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <WritePostCard setPostsList={setPostsList} />
            <SeparatorAndSort />
            <div className="flex flex-col gap-2">
                {postsList &&
                 postsList.map(post => <Post key={post.id} post={post} />)}
            </div>
        </div>

    );
}
