import { useEffect, useRef, useState } from "react";
import { useAuthentication } from "../../../authentication/contexts/AuthenticationContextProvider";
import { TimeAgo } from "../../../../components/TimeAgo/TimeAgo";
import { CommentProps } from "./CommentCard";
import { UserProps } from "../../../authentication/contexts/AuthenticationContextProvider";
import { request } from "../../../../utils/api";
import { CommentsList, AddCommentCard } from "./CommentsList";

interface PostProps {
    content: string;
    createdAt: string;
    updatedAt: string | null;
    author: UserProps;
    picture: string;
    likes: UserProps[];
    commentsCount: number;
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
                <TimeAgo time={new Date(createdAt)} className="text-xs text-gray-500 leading-tight"/>
            </div>
        </div>
    );
}

function PostOps({ post, setPostsList, setIsEdit }) {
    const { user } = useAuthentication();
    const [showOps, setShowOps] = useState(false);
    const opsRef = useRef(null);

    const onDelete = async () => {
        await request({
            endpoint: "/api/feed/posts/" + post.id,
            method: "DELETE",
            onSuccess: (data) => setPostsList(li => li.filter(p => p.id !== post.id)),
            onFailure: (msg) => console.log(msg)
        });
    };

    useEffect(()=>{
        function handleClickOutside(evt) {
            if (opsRef.current && !opsRef.current.contains(evt.target)) {
                setShowOps(false);
            }
        }
        window.addEventListener("pointerdown", handleClickOutside);
        return () => window.removeEventListener("pointerdown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={opsRef}>
            <div className="p-1 hover:bg-gray-100 rounded-full cursor-pointer"
                 onClick={() => setShowOps(!showOps)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                     className="size-4 text-gray-700">
                    <path d="M14 12a2 2 0 11-2-2 2 2 0 012 2zM4 10a2 2 0 102 2 2 2 0 00-2-2zm16 0a2 2 0 102 2 2 2 0 00-2-2z"/>
                </svg>
            </div>
            {showOps &&
             <div className="absolute top-6 end-0">
                 <div className="flex flex-col w-14 bg-white shadow-md py-1 rounded-lg text-xs font-bold text-gray-600">
                     <button className="w-full hover:bg-gray-100 px-2 py-1 cursor-pointer"
                             onClick={onDelete}>
                         删除
                     </button>
                     <button className="w-full hover:bg-gray-100 px-2 py-1 cursor-pointer"
                             onClick={() => setIsEdit(e => !e)}>
                         编辑
                     </button>
                 </div>
             </div>}
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

/* 如果likes数组很大（如上千人点赞），考虑返回用户是否点赞和点赞的数量即可，如果需要能够查看点赞的用户，则惰性加载
/  目前简单实现
/*/
export function PostCard({ post, postsList, setPostsList } : PostProps) {
    const { user } = useAuthentication();
    const [showCommentPanel, setShowCommentPanel] = useState(false);
    const [commentsCount, setCommentsCount] = useState(post.commentsCount);
    const [isEdit, setIsEdit] = useState(false);
    const [postContent, setPostContent] = useState(post.content);

    let isUserLike = post.likes?.some(like => like.id === user.id);
    let avatar = user.avatar ? user.avatar : "/default-avatar.png";

    let onLike = async () => {
        await request({
            endpoint: "/api/feed/posts/" + post.id + "/like",
            method: "PUT",
            onSuccess: (post) => {
                setPostsList(
                    postsList.map(p => {
                        return p.id === post.id
                             ? { ...p, likes: isUserLike ? p.likes.filter(u => u.id !== user.id) : [...p.likes, user]}
                             : p
                }));
            },
            onFailure: (msg) => console.log(msg)
        });
    }

    let doEditPost = async () => {
        await request({
            endpoint: "/api/feed/posts/" + post.id,
            method: "PUT",
            body: JSON.stringify({content: postContent}),
            onSuccess: (data) => {
                setPostsList(pl => pl.map(p => p.id !== post.id ? p : data));
                setIsEdit(false);
            },
            onFailure: (msg) => console.log(msg)
        });
    }

    return (
        <div className="px-4 pt-4 pb-1 border border-gray-300 rounded-lg bg-white flex flex-col gap-2 relative">
            {
                post.author.id === user.id &&
                <div className="absolute top-2 end-2">
                    <PostOps post={post} setPostsList={setPostsList} setIsEdit={setIsEdit} />
                </div>
            }
        <PostHead author={post.author} createdAt={post.createdAt}/>
        <div className="px-2 flex flex-col gap-2">
            {
                isEdit
                ? <form className="flex flex-col gap-2"
                        onSubmit={(evt) => {
                            evt.preventDefault();
                        }}>
                    <input name="" type="text" value={postContent} className="border border-linkedin focus:border-2 focus:outline-none text-xs p-2 rounded-full "
                           onChange={(evt) => setPostContent(evt.target.value)}/>
                    <div className="flex gap-2">
                        <button type="submit"
                                className="font-bold text-xs text-white bg-linkedin hover:bg-blue-900 rounded-full px-1.5 py-1"
                                onClick={doEditPost}>
                            保存提交
                        </button>
                        <button type="button"
                                className="font-bold text-xs bg-white border rounded-full px-1.5 py-1"
                                onClick={() => {
                                    setIsEdit(false);
                                    setPostContent(post.content)
                                }}>
                            取消
                        </button>
                    </div>
                </form>
                : (
                    <div className="flex flex-col gap-1">
                        <span className="text-gray-900 text-sm">{post.content}</span>
                        {post.updatedAt && <span className="self-end text-xs text-gray-700">（已编辑）</span>}
                    </div>
                )
            }
            {post?.picture && <img src={post.picture} className="self-center object-cover w-full max-h-72"/>}
        </div>
        <div className="flex px-4 justify-between text-xs text-gray-500">
            <span className="flex gap-0.5 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                     className="size-3 text-gray-600">
                    <path d="M12.91 7l-2.25-2.57a8.21 8.21 0 01-1.5-2.55L9 1.37A2.08 2.08 0 007 0a2.08 2.08 0 00-2.06 2.08v1.17a5.81 5.81 0 00.31 1.89l.28.86H2.38A1.47 1.47 0 001 7.47a1.45 1.45 0 00.64 1.21 1.48 1.48 0 00-.37 2.06 1.54 1.54 0 00.62.51h.05a1.6 1.6 0 00-.19.71A1.47 1.47 0 003 13.42v.1A1.46 1.46 0 004.4 15h4.83a5.61 5.61 0 002.48-.58l1-.42H14V7zM12 12.11l-1.19.52a3.59 3.59 0 01-1.58.37H5.1a.55.55 0 01-.53-.4l-.14-.48-.49-.21a.56.56 0 01-.34-.6l.09-.56-.42-.42a.56.56 0 01-.09-.68L3.55 9l-.4-.61A.28.28 0 013.3 8h5L7.14 4.51a4.15 4.15 0 01-.2-1.26V2.08A.09.09 0 017 2a.11.11 0 01.08 0l.18.51a10 10 0 001.9 3.24l2.84 3z"></path>
                </svg>
                {post.likes?.length}
            </span>
            <span className="cursor-pointer"
                  onClick={() => setShowCommentPanel(!showCommentPanel)}>
                <span className="hover:underline">{commentsCount}条评论</span>
            </span>
        </div>
        <div className="mx-2 -my-1 border-t justify-center border-gray-200"></div>
        <div className="flex gap-2 justify-around">
            <PostButton text="赞" onClick={onLike}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                     className={`size-4 ${isUserLike ? "text-blue-600" : "text-gray-600"}`}>
                    <path d="M12.91 7l-2.25-2.57a8.21 8.21 0 01-1.5-2.55L9 1.37A2.08 2.08 0 007 0a2.08 2.08 0 00-2.06 2.08v1.17a5.81 5.81 0 00.31 1.89l.28.86H2.38A1.47 1.47 0 001 7.47a1.45 1.45 0 00.64 1.21 1.48 1.48 0 00-.37 2.06 1.54 1.54 0 00.62.51h.05a1.6 1.6 0 00-.19.71A1.47 1.47 0 003 13.42v.1A1.46 1.46 0 004.4 15h4.83a5.61 5.61 0 002.48-.58l1-.42H14V7zM12 12.11l-1.19.52a3.59 3.59 0 01-1.58.37H5.1a.55.55 0 01-.53-.4l-.14-.48-.49-.21a.56.56 0 01-.34-.6l.09-.56-.42-.42a.56.56 0 01-.09-.68L3.55 9l-.4-.61A.28.28 0 013.3 8h5L7.14 4.51a4.15 4.15 0 01-.2-1.26V2.08A.09.09 0 017 2a.11.11 0 01.08 0l.18.51a10 10 0 001.9 3.24l2.84 3z"></path>
                </svg>
            </PostButton>
            <PostButton text="评论" onClick={() => setShowCommentPanel(!showCommentPanel)}>
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
        {
            showCommentPanel &&
            <CommentsList post={post} setCommentsCount={setCommentsCount}/>
        }
        </div>
    );
}

