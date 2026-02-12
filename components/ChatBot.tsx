import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { pushGTMEvent } from '../services/gtmService';

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hi! I am Nova, your virtual banking assistant. How can I help you today?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const toggleChat = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    // GTM tracking for chat interaction
    pushGTMEvent({
      event: newState ? 'chat_open' : 'chat_close'
    });
  };

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    
    // Add user message
    const newMessages = [...messages, { role: 'user', text: userText, timestamp: new Date() } as ChatMessage];
    setMessages(newMessages);
    setIsLoading(true);

    // GTM Event
    pushGTMEvent({
      event: 'chat_message_sent',
      message_length: userText.length
    });

    // Get response from Gemini
    const responseText = await sendMessageToGemini(userText, newMessages);

    setIsLoading(false);
    setMessages(prev => [...prev, { role: 'model', text: responseText, timestamp: new Date() } as ChatMessage]);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
          isOpen ? 'bg-red-500 rotate-90' : 'bg-nova-orange'
        } text-white`}
        aria-label="Toggle chat assistant"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-10 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-nova-blue to-blue-900 p-4 flex items-center space-x-3">
            <div className="bg-white/10 p-2 rounded-full">
              <Bot className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-white font-bold">Nova Assistant</h3>
              <p className="text-blue-200 text-xs flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-1"></span>
                Powered by Gemini
              </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-nova-orange text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none border border-gray-100'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 border border-gray-100 shadow-sm flex items-center space-x-2">
                  <Loader2 size={16} className="animate-spin text-nova-blue" />
                  <span className="text-xs text-gray-400">Nova is thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about loans, accounts..."
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-nova-blue focus:bg-white transition-all"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 bg-nova-blue text-white rounded-full hover:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChatBot;