import { useEffect, useRef, useState } from "react";
import { useAuthentication, User } from "../../../authentication/contexts/AuthenticationContextProvider";
import { CardBox } from "../CardBox/CardBox";

function PostFeedButton({ text, children }) {
    return (
        <button className="px-2.5 py-3 rounded hover:bg-gray-100 flex gap-1 flex justify-center items-center">
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
                    <img src={avatar} className="size-11 rounded-full"/>
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

interface CommentProps {

}

interface PostProps {
    content: string;
    createdAt: string;
    updatedAt: string | null;
    author: User;
    picture: string;
    likes: User[];
    comments: CommentProps[];
}

function Comment({ comment } : CommentProps) {
    return (
        <div></div>
    );
}

function createdAgo(createdAt: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - createdAt.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffSec < 60) return `${diffSec} 秒前`;
    if (diffMin < 60) return `${diffMin} 分钟前`;
    if (diffHrs < 24) return `${diffHrs} 小时前`;
    if (diffDays < 7) return `${diffDays} 天前`;

     return createdAt.toISOString().split('T')[0];
}


function PostHead({ author, createdAt }) {
    let avatar = author.avatar ? author.avatar : "/default-avatar.png";
    let nm = author.lastName + author.firstName
    let position = author.position;
    let location = author.location;
    let company = author.company;

    return (
        <div className="flex gap-2 items-center">
            <img src={avatar} className="size-11"/>
            <div className="flex flex-col leading-tight">
                <span className="font-bold">{nm}</span>
                <div className="flex text-sm text-gray-500">
                    {company && <span>{company}</span>}
                    <span>{position}</span>
                </div>
                <span className="text-xs text-gray-500 leading-tight">{createdAgo(new Date(createdAt))}</span>
            </div>
        </div>
    );
}


function PostButton({ text, onClick, children }) {
    return (
        <button className="px-2.5 py-3 rounded hover:bg-gray-100 flex gap-1 flex justify-center items-center w-full"
                onClick={onClick}>
            {children}
            <span className="font-bold text-sm text-gray-600">{text}</span>
        </button>
    );
}

function Post({ post } : PostProps) {
    const { user } = useAuthentication();
    const [showCommentPanel, setShowCommentPanel] = useState(false);
    let avatar = user.avatar ? user.avatar : "/default-avatar.png";
    let onLike = async () => {
        try {
            const response = await fetch(import.meta.env.VITE_API_URL + "/api/feed/posts/" + post.id + "/like", {
                method: "PUT",
                headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
            });

            if (!response.ok){
                const { message } = await response.json();
                throw new Error();
            }
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message);
            } else {
                console.log("未知错误");
            }
        }
    }

    return (
        <div className="px-4 pt-4 pb-1 border border-gray-300 rounded-lg bg-white flex flex-col gap-2 relative">
            <PostHead author={post.author} createdAt={post.createdAt}/>
            <div className="px-2 flex flex-col gap-2">
                <span className="text-gray-900 text-sm">{post.content}</span>
                <img src={post.picture} className="self-center object-cover w-full max-h-72"/>
            </div>
            <div className="flex px-4 justify-between text-xs text-gray-500">
                <span className="flex gap-0.5 items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                         className="size-3 text-gray-600">
                        <path d="M12.91 7l-2.25-2.57a8.21 8.21 0 01-1.5-2.55L9 1.37A2.08 2.08 0 007 0a2.08 2.08 0 00-2.06 2.08v1.17a5.81 5.81 0 00.31 1.89l.28.86H2.38A1.47 1.47 0 001 7.47a1.45 1.45 0 00.64 1.21 1.48 1.48 0 00-.37 2.06 1.54 1.54 0 00.62.51h.05a1.6 1.6 0 00-.19.71A1.47 1.47 0 003 13.42v.1A1.46 1.46 0 004.4 15h4.83a5.61 5.61 0 002.48-.58l1-.42H14V7zM12 12.11l-1.19.52a3.59 3.59 0 01-1.58.37H5.1a.55.55 0 01-.53-.4l-.14-.48-.49-.21a.56.56 0 01-.34-.6l.09-.56-.42-.42a.56.56 0 01-.09-.68L3.55 9l-.4-.61A.28.28 0 013.3 8h5L7.14 4.51a4.15 4.15 0 01-.2-1.26V2.08A.09.09 0 017 2a.11.11 0 01.08 0l.18.51a10 10 0 001.9 3.24l2.84 3z"></path>
                    </svg>
                    {post.likes.length}
                </span>
                <span>{post.comments.length}条评论</span>
            </div>
            <div className="mx-2 -my-1 border-t justify-center border-gray-200"></div>
            <div className="flex gap-2 justify-around">
                <PostButton text="赞" onClick={onLike}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                         className="size-4 text-gray-600">
                        <path d="M12.91 7l-2.25-2.57a8.21 8.21 0 01-1.5-2.55L9 1.37A2.08 2.08 0 007 0a2.08 2.08 0 00-2.06 2.08v1.17a5.81 5.81 0 00.31 1.89l.28.86H2.38A1.47 1.47 0 001 7.47a1.45 1.45 0 00.64 1.21 1.48 1.48 0 00-.37 2.06 1.54 1.54 0 00.62.51h.05a1.6 1.6 0 00-.19.71A1.47 1.47 0 003 13.42v.1A1.46 1.46 0 004.4 15h4.83a5.61 5.61 0 002.48-.58l1-.42H14V7zM12 12.11l-1.19.52a3.59 3.59 0 01-1.58.37H5.1a.55.55 0 01-.53-.4l-.14-.48-.49-.21a.56.56 0 01-.34-.6l.09-.56-.42-.42a.56.56 0 01-.09-.68L3.55 9l-.4-.61A.28.28 0 013.3 8h5L7.14 4.51a4.15 4.15 0 01-.2-1.26V2.08A.09.09 0 017 2a.11.11 0 01.08 0l.18.51a10 10 0 001.9 3.24l2.84 3z"></path>
                    </svg>
                </PostButton>
                <PostButton text="评论">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                         className="size-4 text-gray-600">
                        <path d="M5 8h5v1H5zm11-.5v.08a6 6 0 01-2.75 5L8 16v-3H5.5A5.51 5.51 0 010 7.5 5.62 5.62 0 015.74 2h4.76A5.5 5.5 0 0116 7.5zm-2 0A3.5 3.5 0 0010.5 4H5.74A3.62 3.62 0 002 7.5 3.53 3.53 0 005.5 11H10v1.33l2.17-1.39A4 4 0 0014 7.58zM5 7h6V6H5z"></path>
                    </svg>
                </PostButton>
                <PostButton text="转发">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                         className="size-4 text-gray-600">
                        <path d="M4 10H2V5c0-1.66 1.34-3 3-3h3.85L7.42 0h2.44L12 3 9.86 6H7.42l1.43-2H5c-.55 0-1 .45-1 1v5zm8-4v5c0 .55-.45 1-1 1H7.15l1.43-2H6.14L4 13l2.14 3h2.44l-1.43-2H11c1.66 0 3-1.34 3-3V6h-2z"></path>
                    </svg>
                </PostButton>
            </div>
        </div>
    );
}

function FeedsList() {
    const [feedsList, setFeedsList] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        let fetchFeeds = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_API_URL + "/api/feed", {
                    headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}
                });

                if (response.ok) {
                    const data = await response.json();
                    setFeedsList(data);
                } else {
                    const { message } = await response.json();
                    throw new Error(message);
                }
            } catch (error) {
                if (error instanceof Error){
                    setErrorMessage(error.message);
                } else {
                    setErrorMessage("出错了,请稍候重试");
                }
            }
        };

        fetchFeeds();
    }, []);

    return (
        <div className="flex flex-col gap-2">
            {feedsList.map((feed)=> {
                return (
                    <Post key={feed.id} post={feed} />
                );
            })}
        </div>
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

export function FeedsCard() {
    return (
        <div className="flex flex-col gap-2">
            <PostFeed />
            <SeparatorAndSort />
            <FeedsList />
        </div>
    );
}

