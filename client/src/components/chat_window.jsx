import ResponseDisplay from './ResponseDisplay';
import { useEffect, useRef } from 'react';

function ChatWindow({ messages, isTyping, botName }) {
    const anchor = useRef(null);

    useEffect(() => {
        anchor.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    return (
        <div className='chat-window'>
            <ResponseDisplay messages={messages} botName={botName} />
            {isTyping &&(
                <div>
                    <strong>{botName} is typing...</strong>
                </div>
            )}
            <div ref={anchor}/>
        </div>
    );
}

export default ChatWindow;
