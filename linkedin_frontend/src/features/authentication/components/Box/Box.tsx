import { ReactNode } from "react";

export function Box ({children}: {children: ReactNode}) {
    return (
        <div className="mt-4 space-y-4 flex flex-col items-center">
            {children}
        </div>
    )
}
