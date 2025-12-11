import { useState, useEffect, useRef } from 'react';
import Card from './Card';
import api from '../../services/api';
import SiAgit from '../../assets/images/SiAgit.png';
import { Send, AlertCircle, Loader } from 'lucide-react';

const ChatCard = () => {
  const [messages, setMessages] = useState([]); // Local state only
  const [messageInput, setMessageInput] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!messageInput.trim()) {
      return;
    }

    const userMessage = messageInput;
    setMessageInput('');
    setError(null);

    // Add user message to UI immediately
    setMessages(prev => [...prev, {
      id: `user-${Date.now()}`,
      message: userMessage,
      sender: 'user',
      created_at: new Date().toISOString(),
    }]);

    setIsSending(true);

    try {
      console.log('💬 Sending message:', userMessage);

      const response = await api.post('/chat/send', {
        message: userMessage,
      });

      console.log('✅ AI Response:', response.data.data);

      const { ai_message } = response.data.data;

      // Add AI response to UI
      setMessages(prev => [...prev, {
        id: ai_message.id,
        message: ai_message.message,
        sender: ai_message.sender,
        created_at: ai_message.created_at,
      }]);

      setIsSending(false);
    } catch (err) {
      console.error('❌ Error sending message:', err);
      setError(err.response?.data?.message || err.message || 'Gagal mengirim pesan');
      setIsSending(false);

      // Add error message to chat
      setMessages(prev => [...prev, {
        id: `error-${Date.now()}`,
        message: '⚠️ Maaf, terjadi kesalahan. Silakan coba lagi.',
        sender: 'ai',
        created_at: new Date().toISOString(),
        isError: true,
      }]);
    }
  };

  return (
    <Card className="bg-gradient-to-br from-cyan-50 to-emerald-100 border border-cyan-200 hover:shadow-lg transition-all duration-300">
      <div className="space-y-4 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-20 h-20 flex-shrink-0">
              <img
                src={SiAgit}
                alt="SiAgit AI"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Chat SiAgit</h2>
              <p className="text-sm text-gray-600">Yuk, Tanyakan seputar kesehatan dan nutrisi dengan Bot Ai SiAgit</p>
            </div>
          </div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-cyan-700 hover:text-cyan-800 font-semibold text-sm px-3 py-1 hover:bg-cyan-100 rounded-lg transition-colors whitespace-nowrap"
          >
            {expanded ? 'Tutup' : 'Buka'}
          </button>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-white rounded-lg p-4 border border-red-200">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-gray-700 font-medium text-sm mb-2">
                  Terjadi kesalahan
                </p>
                <p className="text-gray-600 text-xs">{error}</p>
              </div>
              <button
                onClick={() => setError(null)}
                className="text-red-600 hover:text-red-800 text-xs underline whitespace-nowrap"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {/* Chat Messages - Only show when expanded */}
        {expanded && (
          <div className="flex-1 min-h-96 max-h-96 overflow-y-auto space-y-3 bg-white rounded-lg p-4 border border-cyan-200">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 mb-4 opacity-50">
                  <img
                    src={SiAgit}
                    alt="SiAgit"
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-gray-600 text-sm font-medium">
                  Halo! 👋 Saya SiAgit, asisten kesehatan Anda.
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  Mulai percakapan dengan bertanya tentang kesehatan, nutrisi, atau fitur aplikasi!
                </p>
              </div>
            ) : (
              <>
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${
                      msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    {/* Avatar */}
                    {msg.sender === 'ai' && (
                      <div className="w-8 h-8 flex-shrink-0">
                        <img
                          src={SiAgit}
                          alt="SiAgit"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    )}

                    {/* Message Bubble */}
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${
                        msg.sender === 'user'
                          ? 'bg-cyan-500 text-white rounded-br-none'
                          : msg.isError
                          ? 'bg-red-100 text-red-900 rounded-bl-none'
                          : 'bg-gray-100 text-gray-900 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm leading-relaxed break-words">
                        {msg.message}
                      </p>
                      <p
                        className={`text-xs mt-1 ${
                          msg.sender === 'user'
                            ? 'text-cyan-100'
                            : msg.isError
                            ? 'text-red-700'
                            : 'text-gray-500'
                        }`}
                      >
                
                      </p>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator - AI sedang merespon */}
                {isSending && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 flex-shrink-0">
                      <img
                        src={SiAgit}
                        alt="SiAgit"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="max-w-xs px-4 py-3 rounded-lg bg-gray-100 rounded-bl-none">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: '0.1s' }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </>
            )}
          </div>
        )}

        {/* Input Form - Only show when expanded */}
        {expanded && (
          <form
            onSubmit={handleSendMessage}
            className="flex-shrink-0 flex gap-2 bg-white rounded-lg p-3 border border-cyan-200"
          >
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Ketik pertanyaan Anda..."
              disabled={isSending}
              className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={isSending || !messageInput.trim()}
              className="px-4 py-2 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSending ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </button>
          </form>
        )}

        {/* Quick Preview - When collapsed */}
        {!expanded && messages.length > 0 && (
          <div className="bg-white rounded-lg p-3 border border-cyan-200">
            <p className="text-gray-600 text-xs font-medium mb-2">Pesan terakhir:</p>
            <p className="text-gray-700 text-sm line-clamp-2">
              {messages[messages.length - 1]?.message}
            </p>
          </div>
        )}

        {/* CTA Button when collapsed and no messages */}
        {!expanded && messages.length === 0 && (
          <button
            onClick={() => setExpanded(true)}
            className="w-full px-4 py-2 bg-cyan-500 text-white rounded-lg font-medium hover:bg-cyan-600 transition-colors text-sm"
          >
            Mulai Percakapan dengan SiAgit →
          </button>
        )}
      </div>
    </Card>
  );
};

export default ChatCard;