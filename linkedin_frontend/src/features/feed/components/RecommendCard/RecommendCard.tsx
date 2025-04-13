import { CardBox } from "../CardBox/CardBox";

function RecommendProfile() {
    return (
        <div className="">
            待完成
        </div>
    );
}

function Separator() {
    return (
        <div className="border-b border-gray-300"></div>
    );
}

export function RecommendCard() {
    return (
        <CardBox >
            <span className="font-bold text-md">为您推荐</span>
            <Separator />
            <RecommendProfile />
            <Separator />
            <button className="flex items-center justify-center text-slate-600 cursor-pointer text-gray-500 hover:text-gray-700 hover:underline">
                <span className="font-bold text-sm">展开</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                     className="size-4">
                    <path d="M11.45 3L15 8l-3.55 5H9l2.84-4H2V7h9.84L9 3z"/>
                </svg>
            </button>
        </CardBox>
    );
}
