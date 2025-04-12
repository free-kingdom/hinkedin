import { useNavigate } from "react-router-dom"

export function ReturnButton({ returnURL } : { returnURL: string }) {
    const navigate = useNavigate();

    return (
        <button className="hover:bg-gray-100 rounded-full p-2 flex cursor-pointer hover:text-gray-800"
                onClick={() => navigate(returnURL)}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"
                 className="size-4 text-gray-600">
                <path d="M11 1L6.39 8 11 15H8.61L4 8l4.61-7z"/>
            </svg>
        </button>
    )
}
