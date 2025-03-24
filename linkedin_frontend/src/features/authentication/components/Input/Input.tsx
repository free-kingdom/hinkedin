import { InputHTMLAttributes } from "react"

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
    label: string
}

export function Input ({label, ...otherProps}: InputProps) {
    return (
        <div className="relative">
            <input {...otherProps} className="peer border bg-white rounded-md pt-6 px-4 pb-4 w-full" />
            <label className="absolute left-4 top-5 text-gray-600 text-xl transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-500 peer-valid:top-1 peer-valid:text-sm peer-valid:text-gray-500 pointer-event-none">
                {label}
            </label>
        </div>
    );
}
