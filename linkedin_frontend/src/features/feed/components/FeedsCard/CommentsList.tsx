import { useState, useEffect, FormEvent, useRef } from "react";
import { useAuthentication, UserProps } from "../../../authentication/contexts/AuthenticationContextProvider";
import { request } from "../../../../utils/api";
import { TimeAgo } from "../../../../components/TimeAgo/TimeAgo";

interface CommentProps {
    content: string;
    author: UserProps;
}

function CommentTextarea({ content, setContent, ...otherProps }) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto"; // 先重置高度，否则 scrollHeight 不会更新
            textarea.style.height = `${textarea.scrollHeight}px`; // 让高度等于内容的 scrollHeight
        }
    };

    return (
        <textarea { ...otherProps }
                  value = {content}
                  ref={textareaRef}
                  rows="1"
                  className="overflow-hidden text-xs px-2 pt-2 pb-10 w-full rounded-lg border border-gray-400 focus:border-2 focus:border-gray-400 focus:outline-none"
                  onInput={adjustHeight}
                  onChange={(evt)=>setContent(evt.target.value)}>
        </textarea>
    );
}

export function AddCommentCard({ post, setCommentsList, setCommentsCount }) {
    const { user } = useAuthentication();
    const [content, setContent] = useState("");
    let avatar = user.avatar ? user.avatar : "/default-avatar.png";
    let doSubmit = async (evt:FormEvent) => {
        evt.preventDefault();
        if (content) {
            await request({
                endpoint: "/api/feed/posts/" + post.id + "/comment",
                method: "POST",
                body: JSON.stringify({content}),
                onSuccess: (data) => {
                    setCommentsList(cl => [...cl, data]);
                    setCommentsCount(c => c + 1)
                    setContent("");
                },
                onFailure: (msg) => console.log(msg)
            });
        }
    };

    return (
        <div className="flex gap-2">
            <img src={avatar} className="size-8 rounded-full"/>
            <form className="w-full"
                  onSubmit={doSubmit}>
                <div className="relative">
                    <CommentTextarea content={content} setContent={setContent} />
                    <div className="absolute bottom-1 w-full px-1 flex gap-1 justify-between">
                        <div className="flex">
                            <div className="rounded-full hover:bg-gray-100 p-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="size-5 text-stone-700">
                                    <path d="M8 10.5A1.5 1.5 0 119.5 12 1.5 1.5 0 018 10.5zm6.5 1.5a1.5 1.5 0 10-1.5-1.5 1.5 1.5 0 001.5 1.5zm7.5 0A10 10 0 1112 2a10 10 0 0110 10zm-2 0a8 8 0 10-8 8 8 8 0 008-8zm-8 4a6 6 0 01-4.24-1.76l-.71.76a7 7 0 009.89 0l-.71-.71A6 6 0 0112 16z"></path>
                                </svg>
                            </div>
                            <div className="rounded-full hover:bg-gray-100 p-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                     className="size-5 text-stone-700">
                                    <path d="M19 4H5a3 3 0 00-3 3v10a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3zm1 13a1 1 0 01-.29.71L16 14l-2 2-6-6-4 4V7a1 1 0 011-1h14a1 1 0 011 1zm-2-7a2 2 0 11-2-2 2 2 0 012 2z"></path>
                                </svg>
                            </div>
                        </div>
                        <button type="submit"
                                className="bg-linkedin text-xs text-white font-bold rounded-xl px-1.5 py-0 cursor-pointer">
                            回复
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

function CommentCard({ comment } : CommentProps) {
    let author = comment.author;
    let avatar = author.avatar ? author.avatar : "/default-avatar.png";
    let nm = author.lastName + author.firstName
    let position = author.position;
    let location = author.location;
    let company = author.company;
    let createdAt = comment.createdAt;
    return (
        <div className="flex flex-col gap-1">
            <div className="flex leading-tight relative gap-2">
                <img src={avatar} className="size-8"/>
                <div className="flex flex-col">
                    <span className="font-bold text-xs">{nm}</span>
                    <div className="flex text-xs text-gray-500">
                        {company && <span>{company}</span>}
                        <span className="text-xs">{position}</span>
                    </div>
                </div>
                <div className="absolute top-0 end-0 flex gap-1 items-center">
                    <TimeAgo time={new Date(createdAt)} className="text-xs text-gray-500 leading-tight"/>
                    <div className="p-1 hover:bg-gray-100 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="size-4 text-gray-700">
                            <path d="M14 12a2 2 0 11-2-2 2 2 0 012 2zM4 10a2 2 0 102 2 2 2 0 00-2-2zm16 0a2 2 0 102 2 2 2 0 00-2-2z"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div className="px-10">
                <span className="text-xs">{comment.content}</span>
            </div>
            <div className="flex items-center text-xs font-bold text-gray-700 px-9">
                <button className="hover:bg-gray-100 p-1 rounded-md">赞</button>
                |
                <button className="hover:bg-gray-100 p-1 rounded-md">回复</button>
            </div>
        </div>
    );
}

function SortCommenButton() {
    return (
        <div>
            <span className="text-xs">最近</span>
        </div>
    );
}

export function CommentsList({ post, setCommentsCount }) {
    const [commentsList, setCommentsList] = useState([]);

    useEffect(() => {
        let loadComments = async () => {
            await request({
                endpoint: "/api/feed/posts/" + post.id + "/comments",
                onSuccess: (data) => setCommentsList(data),
                onFailure: (msg) => console.log(msg),
            });
        }

        loadComments();
    }, []);

    return (
        <div className="flex flex-col gap-2">
            <AddCommentCard post={post} setCommentsList={setCommentsList} setCommentsCount={setCommentsCount}/>
            <SortCommenButton />
            {commentsList.map(comment => {
                return (
                    <CommentCard key={comment.id} comment={comment}/>
                );
            })}
        </div>
    )
}
