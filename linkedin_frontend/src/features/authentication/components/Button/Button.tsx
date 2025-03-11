import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    outline?: boolean,
    link: string
}

export function Button ({outline, children, ...otherProps}: ButtonProps) {
    return (
        <button {...otherProps} className={
        `${outline ? "hover:bg-gray-100 p-2 hover:underline rounded-full w-16 self-center" : "p-3 bg-linkedin hover:bg-linkedin-dark flex items-center justify-center w-full rounded-full text-white font-bold my-1 transistion duration-300"}
disabled:bg-gray-200 disabled:text-black justify-self-center`}>
            {children}
        </button>
    )
}
