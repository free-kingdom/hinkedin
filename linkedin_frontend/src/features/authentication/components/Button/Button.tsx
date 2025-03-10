import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    outline?: boolean,
    text: string
}

export function Button ({outline, text, ...otherProps}: ButtonProps) {
    return (
        <button otherProps className={
        `${outline ? "p-2 border rounded-full w-full border border-gray-950/60 hover:border-gray-950 transistion duration-300" : "p-3 bg-linkedin hover:bg-linkedin-dark flex items-center justify-center w-full rounded-full text-white font-bold my-1 transistion duration-300"} disabled:bg-gray-200 disabled:text-black`}>
            {text}
        </button>
    )
}
