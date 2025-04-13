import { FormEvent, useEffect, useState } from "react";
import { User } from "../../../authentication/contexts/AuthenticationContextProvider";
import { request } from "../../../../utils/api";
import { ReturnButton } from "../../components/ReturnButton/ReturnButton";
import { Conversation } from "../Conversation/Conversation";
import { useNavigate } from "react-router-dom";

function UserItem({ user, setSelectedUser }: { user: User }) {
    const avatar = user.profilePicture || "/default-avatar.png"
    const navigate = useNavigate();

    const fetchConversation = async (userId) => {
        await request({
            endpoint: "/api/messaging/conversations/user/" + userId,
            onSuccess: (data) => navigate("/messaging/conversations/" + data.id),
            onFailure: (msg) => setSelectedUser(prev => user)
        });
    };

    return (
        <li className="flex gap-2 hover:bg-gray-50 p-2 items-center rounded-lg cursor-pointer"
            onClick={() => {
                fetchConversation(user.id);
            }}>
            <img src={avatar}
                 className="size-8 rounded-full"/>
            <div className="flex flex-col">
                <span className="font-bold">{user.lastName + user.firstName}</span>
                <span className="text-sm text-gray-600">{user.company + user.position}</span>
            </div>
        </li>
    );
}

function UserList({ filterString, setSelectedUser }) {
    const [users, setUsers] = useState<User[]>([]);
    const filteredUsers = users.filter(u => u.firstName.includes(filterString)
                                       || u.lastName.includes(filterString)
                                       || u.company.includes(filterString)
                                       || u.position.includes(filterString));
    useEffect(() => {
        const fetchUsers = async () => {
            await request({
                endpoint: "/api/authentication/users",
                onSuccess: setUsers,
                onFailure: msg => console.log(msg)
            });
        };

        fetchUsers();
    }, []);

    return (
        <ul className="flex flex-col gap-2 px-4">
            {filteredUsers.map(u => (
                <UserItem key={u.id} user={u} setSelectedUser={setSelectedUser}/>
            ))}
        </ul>
    )
}

export function NewConversation() {
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const onNewConversation = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        await request({
            endpoint: "/api/messaging/conversations",
            method: "POST",
            body: JSON.stringify({
                receiverId: selectedUser?.id,
                content: content
            }),
            onSuccess: (data) => {
                navigate("/messaging/conversations/" + data.id);
            },
            onFailure: msg => console.log(msg)
        });
    };

    /* 如果已有对话则导航到已有的对话页，否则等待新建对话 */
    if (selectedUser){
        return (
            <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 px-2 py-2 border-b border-b-gray-200 shadow-xs flex-none">
                    <button className="hover:bg-gray-100 rounded-full p-2 flex cursor-pointer hover:text-gray-800"
                            onClick={() => setSelectedUser(null)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                             className="size-4 text-gray-600">
                            <path d="M11 1L6.39 8 11 15H8.61L4 8l4.61-7z"/>
                        </svg>
                    </button>
                    <img src={selectedUser.profilePicture || "/default-avatar.png"} className="size-9 rounded-full" />
                    <span>{selectedUser.lastName + selectedUser.firstName}</span>
                    <button className="p-1 hover:bg-gray-50 rounded-full cursor-pointer ml-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="size-4 text-gray-700">
                            <path d="M14 12a2 2 0 11-2-2 2 2 0 012 2zM4 10a2 2 0 102 2 2 2 0 00-2-2zm16 0a2 2 0 102 2 2 2 0 00-2-2z"/>
                        </svg>
                    </button>
                </div>
                <div className="grow overflow-y-auto min-h-0 pt-8 px-4 py-2 flex flex-col w-full gap-2">

                </div>
                <form className="relative flex-none px-4 pb-6"
                      onSubmit={onNewConversation}>
                    <input type="text" value={content} onChange={(evt) => setContent(evt.target.value)}
                           placeholder="发送消息..."
                           className="border border-gray-400 px-2 focus:outline-none focus:ring focus:ring-linkedin py-2 rounded-lg w-full"/>
                    <button type="submit"
                            disabled={!content.trim()}
                            className="absolute top-1.5 end-5 bg-linkedin py-1 text-white font-bold text-sm rounded-full px-2 hover:bg-blue-900 cursor-pointer disabled:bg-gray-400 disabled:cursor-default">
                        发送
                    </button>
                </form>
            </div>
        );
    } else {
        return (
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 border-b border-gray-300 shadow-xs p-2">
                    <ReturnButton returnURL={"/messaging"}/>
                    <span>新建联系人</span>
                </div>
                <label className="px-4 py-2" >
                    <input value={search} onChange={(e) => {
                        setSearch(e.target.value);
                    }}
                           className="border border-gray-400 focus:ring-1 focus:outline-none rounded-lg p-2 w-full"
                           placeholder="输入名称"/>
                </label>
                <UserList filterString={search} setSelectedUser={setSelectedUser} />
            </div>
        );
    }
}
