export function ConversationList() {
    return (
        <div className="flex border-r-1 md:border-r-2 border-gray-200 h-full">
            <div className="flex items-center border-b-2 border-gray-200 shadow-xs p-4 w-full h-12 justify-between">
                <span>消息列表</span>
                <button className="p-1 hover:bg-gray-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                         className="size-4 text-stone-700">
                        <path d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8z"/>
                    </svg>
                </button>
            </div>
            <div>
                <ul>

                </ul>
            </div>
        </div>
    );
}
