import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! 👋 How can I help you today?", sender: 'bot', time: new Date() }
    ]);
    const [inputText, setInputText] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const { user } = useAuth();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    // specific event listener to open chat from other components
    useEffect(() => {
        const handleOpenChat = () => setIsOpen(true);
        window.addEventListener('open-chat', handleOpenChat);
        return () => window.removeEventListener('open-chat', handleOpenChat);
    }, []);

    // Mock bot responses
    const generateBotResponse = (userMessage) => {
        const lowerMsg = userMessage.toLowerCase();

        if (lowerMsg.includes('hello') || lowerMsg.includes('hi')) {
            return `Hello${user?.username ? ' ' + user.username : ''}! Welcome to ShopNow. Looking for anything specific?`;
        }
        if (lowerMsg.includes('order') || lowerMsg.includes('track')) {
            return "You can track your orders in the 'My Orders' section of your profile.";
        }
        if (lowerMsg.includes('return') || lowerMsg.includes('refund')) {
            return "Our return policy allows returns within 30 days. Check our Returns page for more details.";
        }
        if (lowerMsg.includes('price') || lowerMsg.includes('cost')) {
            return "Prices vary by product. Check out our latest deals on the homepage!";
        }
        if (lowerMsg.includes('thank')) {
            return "You're welcome! Happy shopping! 🛍️";
        }

        return "I'm just a bot, but our support team is available 24/7 if you need more help!";
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputText.trim()) return;

        const newUserMessage = {
            id: Date.now(),
            text: inputText,
            sender: 'user',
            time: new Date()
        };

        setMessages(prev => [...prev, newUserMessage]);
        setInputText('');
        setIsTyping(true);

        // Simulate bot delay
        setTimeout(() => {
            const botResponseText = generateBotResponse(newUserMessage.text);
            const newBotMessage = {
                id: Date.now() + 1,
                text: botResponseText,
                sender: 'bot',
                time: new Date()
            };
            setMessages(prev => [...prev, newBotMessage]);
            setIsTyping(false);
        }, 1500);
    };

    if (!isOpen) {
        return (
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center animate-bounce-slow"
                aria-label="Open Chat"
            >
                <div className="relative">
                    <MessageCircle className="w-8 h-8" />
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                </div>
            </button>
        );
    }

    return (
        <div className="fixed bottom-6 right-6 z-50 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden flex flex-col transition-all duration-300 animate-slide-up h-[500px] max-h-[80vh]">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white flex items-center justify-between shadow-md">
                <div className="flex items-center gap-2">
                    <div className="bg-white/20 p-1.5 rounded-lg">
                        <ShoppingBag className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">ShopNow Assistant</h3>
                        <div className="flex items-center gap-1.5 opacity-90">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                            <span className="text-xs">Online</span>
                        </div>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                        title="Minimize"
                    >
                        <Minimize2 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                        title="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
                <div className="text-center text-xs text-gray-400 my-2">Today</div>

                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] rounded-2xl px-4 py-2.5 shadow-sm text-sm ${msg.sender === 'user'
                                ? 'bg-blue-600 text-white rounded-br-none'
                                : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-gray-600'
                                }`}
                        >
                            <p>{msg.text}</p>
                            <span className={`text-[10px] block text-right mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                                }`}>
                                {msg.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-white dark:bg-gray-700 rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-600">
                            <div className="flex gap-1">
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all border-none"
                    />
                    <button
                        type="submit"
                        disabled={!inputText.trim()}
                        className="p-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>
            </form>
        </div>
    );
}
