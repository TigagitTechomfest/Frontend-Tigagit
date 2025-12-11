import { create } from 'zustand';
import api from '../services/api';

const useChatStore = create((set, get) => ({
  // ============= STATE =============
  messages: [], // Array of {id, user_id, message, sender, created_at}
  isLoading: false,
  isSending: false,
  error: null,
  isHistoryLoaded: false,

  // ============= ACTIONS =============

  /**
   * Fetch chat history dari database
   */
  fetchChatHistory: async () => {
    set({ isLoading: true, error: null });

    try {
      console.log('📖 Fetching chat history...');

      const response = await api.get('/chat/history');

      console.log('✅ Chat history loaded:', response.data.data);

      set({
        messages: response.data.data || [],
        isHistoryLoaded: true,
        isLoading: false,
      });

      return response.data.data;
    } catch (err) {
      console.error('❌ Fetch chat history error:', err);
      set({
        error: err.response?.data?.message || err.message || 'Failed to fetch chat history',
        isLoading: false,
      });
      throw err;
    }
  },

  /**
   * Send message ke AI dan simpan di database
   * @param {string} message - User message
   */
  sendMessage: async (message) => {
    if (!message.trim()) {
      set({ error: 'Message cannot be empty' });
      return;
    }

    set({ isSending: true, error: null });

    try {
      console.log('💬 Sending message:', message);

      const response = await api.post('/chat/send', {
        message: message,
      });

      console.log('✅ Message sent successfully:', response.data.data);

      // Add both user and AI messages to store
      const { user_message, ai_message } = response.data.data;

      set((state) => ({
        messages: [
          ...state.messages,
          {
            id: user_message.id,
            user_id: user_message.user_id,
            message: user_message.message,
            sender: user_message.sender,
            created_at: user_message.created_at,
          },
          {
            id: ai_message.id,
            user_id: ai_message.user_id,
            message: ai_message.message,
            sender: ai_message.sender,
            created_at: ai_message.created_at,
          },
        ],
        isSending: false,
      }));

      return response.data.data;
    } catch (err) {
      console.error('❌ Send message error:', err);
      set({
        error: err.response?.data?.message || err.message || 'Failed to send message',
        isSending: false,
      });
      throw err;
    }
  },

  /**
   * Add temporary message UI (untuk optimistic update)
   * Belum saved ke DB, hanya untuk display
   */
  addTemporaryMessage: (message, sender = 'user') => {
    set((state) => ({
      messages: [
        ...state.messages,
        {
          id: `temp-${Date.now()}`,
          message: message,
          sender: sender,
          created_at: new Date().toISOString(),
          isTemporary: true,
        },
      ],
    }));
  },

  /**
   * Clear all messages
   */
  clearMessages: () => {
    set({
      messages: [],
      isHistoryLoaded: false,
      error: null,
    });
  },

  /**
   * Clear error
   */
  clearError: () => {
    set({ error: null });
  },

  /**
   * Reset store
   */
  resetChat: () => {
    set({
      messages: [],
      isLoading: false,
      isSending: false,
      error: null,
      isHistoryLoaded: false,
    });
  },

  /**
   * Get last AI message (untuk mengambil response terakhir)
   */
  getLastAiMessage: () => {
    const { messages } = get();
    return messages.findLast((msg) => msg.sender === 'ai');
  },

  /**
   * Get all user messages
   */
  getUserMessages: () => {
    const { messages } = get();
    return messages.filter((msg) => msg.sender === 'user');
  },

  /**
   * Get message count
   */
  getMessageCount: () => {
    return get().messages.length;
  },
}));

export default useChatStore;