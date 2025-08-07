import ReactMarkdown from 'react-markdown';

function ResponseDisplay({ messages, botName }) {

    return (
        <div>
        {messages.map((msg,index) => (
            <div key={index} className='message-bubble'>
                <strong>{msg.sender === 'user' ? 'You' : botName}:</strong>
                <ReactMarkdown>{msg.text}</ReactMarkdown>
            </div>
        ))}
        </div>
    );
}

export default ResponseDisplay;
