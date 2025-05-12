import ChatView from "@/components/custom/ChatView";
import CodeView from "@/components/custom/CodeView";

const Chat = () => {
    return (
        <div className="p-10 pt-4 ">
            <div className='grid grid-cols-1 md:grid-cols-4 gap-10'>
                    <div className="md:col-span-1">
                        <ChatView />
                    </div>
                    <div className="md:col-span-3">
                        <CodeView />
                    </div>
            </div>
        </div>
    )
}

export default Chat;