import { NavLink } from "react-router-dom";
import { useAuthentication } from "../../../authentication/contexts/AuthenticationContextProvider";
import { CardBox } from "../CardBox/CardBox";

function UserNavItem({ text, children }) {
    return (
        <li className="font-bold text-sm hover:underline">
            <div className="flex gap-1.5 items-center text-gray-800">
                {children}
                <a href="" className="block w-full h-full">{text}</a>
            </div>
        </li>
    );
}

function UserNav() {
    return (
        <CardBox>
            <ul>
                <UserNavItem text="我的收藏">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                         className="size-4">
                        <path d="M13 4a3 3 0 00-3-3H3v14l5-4.5 5 4.5z"/>
                    </svg>
                </UserNavItem>
                <UserNavItem text="群组">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                         className="size-4">
                        <path d="M8.5 7h-1A1.5 1.5 0 006 8.5V14h4V8.5A1.5 1.5 0 008.5 7zM12.75 8h-.5A1.25 1.25 0 0011 9.25V14h3V9.25A1.25 1.25 0 0012.75 8z"/>
                        <circle cx="8" cy="4" r="2"/>
                        <circle cx="12.5" cy="5.5" r="1.5"/>
                        <path d="M3.75 8h-.5A1.25 1.25 0 002 9.25V14h3V9.25A1.25 1.25 0 003.75 8z"/>
                        <circle cx="3.5" cy="5.5" r="1.5"/>
                    </svg>
                </UserNavItem>
                <UserNavItem text="专栏">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                         className="size-4">
                        <path d="M13 4v8H3V4h10m2-2H1v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V2zm-3 3H4v2h8V5zM7 8H4v3h3V8zm5 0H8v1h4V8zm0 2H8v1h4v-1z"/>
                    </svg>
                </UserNavItem>
                <UserNavItem text="活动">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                         className="size-4">
                        <path d="M2 2v9a3 3 0 003 3h6a3 3 0 003-3V2zm8.5 1.5a1 1 0 11-1 1 1 1 0 011-1zm-5 0a1 1 0 11-1 1 1 1 0 011-1zM12 11a1 1 0 01-1 1H5a1 1 0 01-1-1V7h8z"/>
                    </svg>
                </UserNavItem>
            </ul>
        </CardBox>
    );
}

function Friends() {
    return (
        <CardBox>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                 className="absolute size-4 top-3 end-3">
                <path d="M9 4a3 3 0 11-3-3 3 3 0 013 3zM6.75 8h-1.5A2.25 2.25 0 003 10.25V15h6v-4.75A2.25 2.25 0 006.75 8zM13 8V6h-1v2h-2v1h2v2h1V9h2V8z"/>
            </svg>
            <div className="flex flex-col text-sm">
                <span className="font-bold ">好友</span>
                <span className="font-bold text-gray-500">拓展职场人脉</span>
            </div>
        </CardBox>
    );
}

function UserProfile(){
    const { user } = useAuthentication();
    let cover = user.cover ? user.cover : "/default-cover.png";
    let avatar = user.avatar ? user.avatar : "/default-avatar.png";
    let nm = user.lastName + user.firstName;
    let company_position = user.company + user.position;
    let location = user.location;
    let company = user.company;

    return (
        <CardBox>
            <img src={cover} className="absolute top-0 start-0 z-10 w-full h-14 object-cover rounded-t-lg"/>
            <img src={avatar} className="size-16 z-20 rounded-full"/>
            <div className="flex flex-col">
                <span className="font-bold text-2xl">{nm}</span>
                <span className="text-gray-800">{company_position}</span>
                <span className="text-gray-600 text-sm">{location}</span>
            </div>
        </CardBox>
    );
}

export function UserCards() {
    return (
        <div className="flex flex-col gap-2">
            <UserProfile />
            <Friends />
            <UserNav />
        </div>
    );
}
