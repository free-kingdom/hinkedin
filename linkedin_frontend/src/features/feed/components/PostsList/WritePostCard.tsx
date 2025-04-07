import { useState } from "react";
import { useAuthentication } from "../../../authentication/contexts/AuthenticationContextProvider";
import { request } from "../../../../utils/api";

function PostFeedButton({ text, children }) {
    return (
        <button className="px-2.5 py-3 rounded hover:bg-gray-100 flex gap-1 flex justify-center items-center">
            {children}
            <span className="font-bold text-sm text-gray-600">{text}</span>
        </button>
    );
}

function WritePost({ user, setShowWritePost, setPostsList }) {
    let avatar = user.avatar ? user.avatar : "/default-avatar.png";
    const [postContent, setPostContent] = useState("");

    let doPost = async () => {
        await request({
            endpoint: "/api/feed/posts",
            method: "POST",
            body: JSON.stringify({content: postContent, picture: ""}),
            onSuccess: (data) => setPostsList(pl => [data, ...pl]),
            onFailure: (msg) => console.log(msg)
        });
        setShowWritePost(false);
    }

    return (
        <div className="relative z-60 h-1/2">
            <button className="absolute top-2 end-2 rounded-full hover:bg-gray-100 p-1.5"
                    onClick={() => setShowWritePost(s => !s)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                     className="size-5 text-stone-700">
                    <path d="M13.42 12L20 18.58 18.58 20 12 13.42 5.42 20 4 18.58 10.58 12 4 5.42 5.42 4 12 10.58 18.58 4 20 5.42z"></path>
                </svg>
            </button>
            <div className="flex flex-col bg-white p-8 shadow-lg rounded-lg gap-2">
                <div className="flex gap-2 hover:bg-gray-100 p-2 rounded-lg">
                    <img src={avatar} className="size-12 rounded-full"/>
                    <div className="flex flex-col">
                        <span className="font-bold text-lg">{user.lastName + user.firstName}</span>
                        <span className="text-sm">发布到公开</span>
                    </div>
                </div>
                <textarea cols="30" rows="12" className="rounded-lg p-2 focus:outline-none sm:w-96 w-84"
                          placeholder="您想讨论什么话题？"
                          value={postContent}
                          onChange={(evt)=> setPostContent(evt.target.value)}>
                </textarea>
                <div>
                    <button className="rounded-full hover:bg-gray-100 p-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="size-5 text-stone-700">
                            <path d="M8 10.5A1.5 1.5 0 119.5 12 1.5 1.5 0 018 10.5zm6.5 1.5a1.5 1.5 0 10-1.5-1.5 1.5 1.5 0 001.5 1.5zm7.5 0A10 10 0 1112 2a10 10 0 0110 10zm-2 0a8 8 0 10-8 8 8 8 0 008-8zm-8 4a6 6 0 01-4.24-1.76l-.71.76a7 7 0 009.89 0l-.71-.71A6 6 0 0112 16z"></path>
                        </svg>
                    </button>
                    <button className="rounded-full hover:bg-gray-100 p-1.5">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="size-5 text-stone-700">
                            <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"></path>
                        </svg>
                    </button>
                </div>
                <div className="flex justify-end gap-1">
                    <div className="p-1.5 hover:bg-gray-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="size-5 text-gray-500">
                            <g>
                                <path d="M2 12A10 10 0 1012 2 10 10 0 002 12zm2 0a8 8 0 118 8 8 8 0 01-8-8z"></path>
                                <path d="M15.1 12.63L13 11.42V7a1 1 0 00-2 0v5a1 1 0 00.51.85l2.59 1.52a1 1 0 101-1.74z"></path>
                            </g>
                        </svg>
                    </div>
                    <button className="bg-linkedin text-white font-bold text-sm rounded-full px-2.5 cursor-pointer hover:bg-blue-800"
                            onClick={doPost}
                            disabled={!postContent}>
                        发布
                    </button>
                </div>
            </div>
        </div>
    );
}

export function WritePostCard({ setPostsList }) {
    const { user } = useAuthentication();
    const [showWritePost, setShowWritePost] = useState(false);
    let avatar = user.avatar ? user.avatar : "/default-avatar.png";

    return (
        <div className="">
            {
                showWritePost &&
                (
                    <div className="fixed top-0 start-0 z-50 w-full h-full flex justify-center p-25">
                        <div className="fixed top-0 start-0 bg-black/70 p-2 size-full z-50"
                             onClick={() => setShowWritePost(!showWritePost)}>
                        </div>
                        <WritePost user={user} setShowWritePost={setShowWritePost} setPostsList={setPostsList}/>
                    </div>
                )
            }

            <div className="p-4 pb-1 border border-gray-300 rounded-lg bg-white flex flex-col gap-2 relative">
                <div className="flex flex-col gap-2">
                    <div className="flex gap-4">
                        <img src={avatar} className="size-11 rounded-full"/>
                        <button className="rounded-full border border-gray-400 flex flex-grow bg-gray-100 items-center pl-4 cursor-pointer"
                                onClick={() => setShowWritePost(b => !b)}>
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
        </div>
    );
}
