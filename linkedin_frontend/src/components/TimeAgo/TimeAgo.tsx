import { useEffect, useState } from "react";

function createdAgo(createdAt: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - createdAt.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);

    if (diffSec < 60) return `${diffSec} 秒前`;
    if (diffMin < 60) return `${diffMin} 分钟前`;
    if (diffHrs < 24) return `${diffHrs} 小时前`;
    if (diffDays < 7) return `${diffDays} 天前`;

     return createdAt.toISOString().split('T')[0];
}

export function TimeAgo({ time, className }) {

    const [ago, setAgo] = useState(createdAgo(time));

    useEffect(()=>{
        const id = setInterval(()=> setAgo(createdAgo(time)), 1000);
        return () => clearInterval(id);
    }, [time]);

    return (
        <span className={className}>{ago}</span>
    );
}
