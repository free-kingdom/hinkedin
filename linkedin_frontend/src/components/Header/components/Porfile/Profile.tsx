import { useEffect, useRef, useState } from "react";
import { useAuthentication } from "../../../../features/authentication/contexts/AuthenticationContextProvider";

function ProfileUserInfo(){
    const { user } = useAuthentication();

    return (
        <div className="p-4 flex flex-col gap-2">
            <div className="flex gap-2">
                <img src={user.avatar ? user.avatar : "/default-avatar.png"}
                     className="size-14"/>
                <div className="flex flex-col">
                    <span className="text-xl font-bold">
                        {user.lastName + user.firstName}
                    </span>
                    <span>{user.company + user.position}</span>
                </div>
            </div>
            <button className="border rounded-lg text-linkedin hover:bg-linkedin/10"
                    onClick={() => {}}>
                查看档案
            </button>
        </div>
    );
}

function ProfileMenuItem({ children }) {
    return (
        <li className="text-md text-gray-500 hover:underline m-1">
            {children}
        </li>
    );
}

function Separator() {
    return (
        <div className="w-full border border-gray-200"></div>
    );
}

function ProfileMenu() {
    const { logout } = useAuthentication();
    return (
        <div className="shadow-lg rounded-lg bg-white w-64">
            <ProfileUserInfo />
            <Separator />
            <ul className="p-3">
                <li className="font-bold text-md">账号</li>
                <ProfileMenuItem>
                    <a href="/">设置和隐私</a>
                </ProfileMenuItem>
                <ProfileMenuItem>
                    <a href="/">帮助中心</a>
                </ProfileMenuItem>
                <ProfileMenuItem>
                    <a href="/">界面语言</a>
                </ProfileMenuItem>
            </ul>
            <Separator />
            <ul className="p-3">
                <li className="font-bold text-md">管理</li>
                <ProfileMenuItem>
                    <a href="/">文章和动态</a>
                </ProfileMenuItem>
                <ProfileMenuItem>
                    <a href="/">职位发布账号</a>
                </ProfileMenuItem>
            </ul>
            <Separator />
            <ul className="px-3 py-2">
                <li>
                    <button
                        className="cursor-pointer"
                        onClick={logout}>
                        <span className="text-gray-500 hover:underline">
                            退出登录
                        </span>
                    </button>
                </li>
            </ul>

        </div>
    );
}

export function Profile() {
    const [showMenu, setShowMenu] = useState(false);
    const { user } = useAuthentication();
    const profileRef = useRef();

    useEffect(() => {
        function handleClickOutside(evt) {
            if (profileRef.current && !profileRef.current.contains(evt.target)) {
                setShowMenu(false);
            }
        }
        window.addEventListener("pointerdown", handleClickOutside);
        return () => window.removeEventListener("pointerdown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full flex justify-center"
             ref={profileRef}>
            <button className="text-slate-500 hover:text-slate-700"
                    onClick={() => setShowMenu(!showMenu)}>
                <img alt="" src={user.avatar ? user.avatar : "/default-avatar.png"}
                     className="sm:size-6 size-8 rounded-full"/>
                <div className="flex hidden sm:flex">
                    <span className="text-xs">我</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                         className="size-4">
                        <path d="M8 11L3 6h10z" fillRule="evenodd"/>
                    </svg>
                </div>
            </button>
            {
                showMenu &&
                <div className="absolute end-0 top-14">
                    <ProfileMenu />
                </div>
            }
        </div>

    );
}
