import { CardBox } from "../CardBox/CardBox";

function RecommendProfile() {
    return (
        <div className="">
            todo
        </div>
    );
}

function Separator() {
    return (
        <div className="border border-gray-200"></div>
    );
}

export function RecommendCard() {
    return (
        <CardBox >
            <span className="font-bold text-md">为您推荐</span>
            <Separator />
            <RecommendProfile />
            <Separator />
            <button className="flex items-center justify-center text-slate-600">
                <span className="font-bold">展开</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                     className="size-5">
                    <path d="M11.45 3L15 8l-3.55 5H9l2.84-4H2V7h9.84L9 3z"/>
                </svg>
            </button>
        </CardBox>
    );
}
