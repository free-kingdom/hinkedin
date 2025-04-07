import { CardBox } from "../CardBox/CardBox";

export function NotificationManageCard() {
    return (
        <CardBox>
            <span className="font-bold ">管理通知</span>
            <a href="/" className="font-bold text-sm text-linkedin hover:underline">查看设置</a>
        </CardBox>
    );
}
