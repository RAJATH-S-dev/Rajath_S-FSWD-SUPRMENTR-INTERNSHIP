// src/services/api.js

const BASE_URL = 'http://localhost:5000/api';

export const messageService = {
  // Fetch all messages
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/messages`);
    if (!response.ok) throw new Error('Failed to fetch messages');
    return response.json();
  },

  // Create a new message
  create: async (text) => {
    const response = await fetch(`${BASE_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!response.ok) throw new Error('Failed to create message');
    return response.json();
  }
};