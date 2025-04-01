export function CardBox({ children }) {
    return (
        <div className="p-4 border border-gray-300 rounded-lg bg-white flex flex-col gap-2 relative">
            {children}
        </div>
    );
}
