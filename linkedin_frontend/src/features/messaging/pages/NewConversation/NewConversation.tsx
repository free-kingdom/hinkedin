import { useEffect, useState } from "react";
import { User } from "../../../authentication/contexts/AuthenticationContextProvider";
import { request } from "../../../../utils/api";
import { ReturnButton } from "../../components/ReturnButton/ReturnButton";

function UserItem({ user }: { user: User }) {
    const avatar = user.profilePicture || "/default-avatar.png"
    return (
        <li className="flex gap-2 hover:bg-gray-50 p-2 items-center rounded-lg cursor-pointer">
            <img src={avatar}
                 className="size-8 rounded-full"/>
            <div className="flex flex-col">
                <span className="font-bold">{user.lastName + user.firstName}</span>
                <span className="text-sm text-gray-600">{user.company + user.position}</span>
            </div>
        </li>
    );
}

function UserList() {
    const [users, setUsers] = useState<User[]>([]);

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
            {users.map(u => (
                <UserItem key={u.id} user={u}/>
            ))}
        </ul>
    )
}

export function NewConversation() {
    const [search, setSearch] = useState("");

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 border-b border-gray-300 shadow-xs p-2">
                <ReturnButton returnURL={"/messaging"}/>
                <span>新建联系人</span>
            </div>
            <label className="p-2">
                <input value={search} onChange={(e) => {
                    setSearch(e.target.value);
                }}
                       className="border border-gray-400 focus:ring-1 focus:outline-none rounded-lg p-2 w-full"
                       placeholder="输入名称"/>
            </label>
            <UserList />
        </div>
    );
}
