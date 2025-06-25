import { useEffect, useState } from 'react';
import InputForm from './components/InputForm';
import ChatWindow from './components/ChatWindow';

function App() {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState('');
  
  async function handleSubmit(e) {
    e.preventDefault();
    
    setPrompt('');
    setIsTyping(true);

    setMessages(prev => [...prev, {sender: 'user', text: prompt}]);
    
    const res = await fetch('http://localhost:3000/api/gemini', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({prompt}),
    });

    const data = await res.json();

    setMessages(prev => [...prev, {sender:'bot', text: data.response}]);
    setIsTyping(false);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <ChatWindow messages={messages} isTyping={isTyping} botName='William Bot' />
      <InputForm prompt={prompt} placeholder='Type a message' setPrompt={setPrompt} handleSubmit={handleSubmit}/>
    </div>
  );
}

export default App;
