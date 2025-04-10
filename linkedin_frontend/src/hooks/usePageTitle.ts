import { useEffect } from "react"

export const usePageTitle = (title: string) => {
    useEffect(() => {
        document.title = "Hinkedin | " + title;
    }, [title]);
}
