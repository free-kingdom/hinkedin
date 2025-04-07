import { CardBox } from "../CardBox/CardBox";

export function Friends() {
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
