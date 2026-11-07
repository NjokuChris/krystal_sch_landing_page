import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, Smile, X } from 'lucide-react';

interface Message {
    id: number;
    from: 'christian' | 'user';
    text: string;
    time: string;
}

function now() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const GREETING: Message = {
    id: 0,
    from: 'christian',
    text: "Hey! 👋 How can I help you?",
    time: now(),
};

export default function ChatWidget() {
    const [open, setOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<Message[]>([GREETING]);
    const [unread, setUnread] = useState(1);
    const [showEmoji, setShowEmoji] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Scroll to bottom whenever messages change
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Clear unread badge when opened
    useEffect(() => {
        if (open) {
            setUnread(0);
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [open]);

    // Auto-reply after user sends
    const sendMessage = () => {
        const text = input.trim();
        if (!text) return;

        const userMsg: Message = { id: Date.now(), from: 'user', text, time: now() };
        setMessages((prev) => [...prev, userMsg]);
        setInput('');
        setShowEmoji(false);

        // Simulate a reply after 1.2 s
        setTimeout(() => {
            const reply: Message = {
                id: Date.now() + 1,
                from: 'christian',
                text: "Thanks for reaching out! Our team will get back to you shortly. You can also request a demo to see Krystal in action. 🚀",
                time: now(),
            };
            setMessages((prev) => [...prev, reply]);
            if (!open) setUnread((n) => n + 1);
        }, 1200);
    };

    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') sendMessage();
    };

    const emojis = ['😊', '👍', '🙏', '🎉', '❓', '📚'];

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

            {/* Chat panel */}
            <div
                role="dialog"
                aria-modal="true"
                aria-label="Chat with Christian from Krystal"
                className={`w-80 sm:w-[340px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${
                    open
                        ? 'opacity-100 scale-100 pointer-events-auto'
                        : 'opacity-0 scale-90 pointer-events-none'
                }`}
                style={{ maxHeight: '480px' }}
            >
                {/* Header */}
                <div className="bg-[#6B1F2B] px-4 py-3 flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                            C
                        </div>
                        {/* Online dot */}
                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#6B1F2B]" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-white font-semibold text-sm leading-tight">Christian</p>
                        <p className="text-white/70 text-xs">from Krystal · Online</p>
                    </div>
                    <button
                        onClick={() => setOpen(false)}
                        aria-label="Close chat"
                        className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                    >
                        <X className="w-4 h-4" aria-hidden="true" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50" style={{ minHeight: '220px' }}>
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex items-end gap-2 ${msg.from === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            {msg.from === 'christian' && (
                                <div className="w-7 h-7 rounded-full bg-[#6B1F2B] flex items-center justify-center text-white text-xs font-bold shrink-0 mb-0.5">
                                    C
                                </div>
                            )}
                            <div
                                className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                                    msg.from === 'user'
                                        ? 'bg-[#6B1F2B] text-white rounded-br-sm'
                                        : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'
                                }`}
                            >
                                {msg.text}
                                <span className={`block text-[10px] mt-1 ${msg.from === 'user' ? 'text-white/60' : 'text-gray-400'}`}>
                                    {msg.time}
                                </span>
                            </div>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>

                {/* Emoji picker */}
                {showEmoji && (
                    <div className="px-4 py-2 bg-white border-t border-gray-100 flex gap-2">
                        {emojis.map((e) => (
                            <button
                                key={e}
                                onClick={() => { setInput((v) => v + e); setShowEmoji(false); inputRef.current?.focus(); }}
                                className="text-xl hover:scale-125 transition-transform"
                                aria-label={`Insert ${e}`}
                            >
                                {e}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input */}
                <div className="px-3 py-3 bg-white border-t border-gray-100 flex items-center gap-2">
                    <button
                        onClick={() => setShowEmoji((v) => !v)}
                        aria-label="Emoji picker"
                        className="text-gray-400 hover:text-[#6B1F2B] transition-colors shrink-0"
                    >
                        <Smile className="w-5 h-5" aria-hidden="true" />
                    </button>
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKey}
                        placeholder="Write a reply…"
                        aria-label="Chat message input"
                        className="flex-1 text-sm text-gray-700 placeholder-gray-400 bg-transparent outline-none"
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim()}
                        aria-label="Send message"
                        className="shrink-0 w-8 h-8 rounded-full bg-[#6B1F2B] flex items-center justify-center text-white disabled:opacity-40 hover:bg-[#541828] transition-colors"
                    >
                        <Send className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                </div>

                {/* Powered by */}
                <div className="text-center text-[10px] text-gray-400 py-1.5 bg-white border-t border-gray-50">
                    Powered by <span className="font-semibold text-[#6B1F2B]">Krystal</span>
                </div>
            </div>

            {/* FAB toggle button */}
            <button
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? 'Close chat' : 'Open chat'}
                className="w-14 h-14 rounded-full bg-[#6B1F2B] text-white shadow-lg hover:bg-[#541828] hover:shadow-xl transition-all duration-200 flex items-center justify-center relative"
                style={{ animation: 'pulse-ring 2.5s infinite' }}
            >
                {open ? (
                    <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                    <MessageCircle className="w-6 h-6" aria-hidden="true" />
                )}
                {/* Unread badge */}
                {!open && unread > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {unread}
                    </span>
                )}
            </button>
        </div>
    );
}
