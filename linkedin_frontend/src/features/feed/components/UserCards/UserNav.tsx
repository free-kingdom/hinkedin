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

export function UserNav() {
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
