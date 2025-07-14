import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const api = {
  clients: {
    getAll: async () => {
      const response = await apiClient.get('/clients');
      return response.data;
    },
    create: async (data) => {
      const response = await apiClient.post('/clients', data);
      return response.data;
    },
    update: async (id, data) => {
      const response = await apiClient.put(`/clients/${id}`, data);
      return response.data;
    },
    delete: async (id) => {
      const response = await apiClient.delete(`/clients/${id}`);
      return response.data;
    }
  },
  talents: {
    getAll: async () => {
      const response = await apiClient.get('/talents');
      return response.data;
    },
    create: async (data) => {
      const response = await apiClient.post('/talents', data);
      return response.data;
    },
    update: async (id, data) => {
      const response = await apiClient.put(`/talents/${id}`, data);
      return response.data;
    },
    delete: async (id) => {
      const response = await apiClient.delete(`/talents/${id}`);
      return response.data;
    }
  },
  gigs: {
    getAll: async () => {
      const response = await apiClient.get('/gigs');
      return response.data;
    },
    create: async (data) => {
      const response = await apiClient.post('/gigs', data);
      return response.data;
    },
    update: async (id, data) => {
      const response = await apiClient.put(`/gigs/${id}`, data);
      return response.data;
    },
    delete: async (id) => {
      const response = await apiClient.delete(`/gigs/${id}`);
      return response.data;
    },
    addNote: async (id, note) => {
      const response = await apiClient.post(`/gigs/${id}/notes`, note);
      return response.data;
    }
  },
  ai: {
    summarize: async (data) => {
      const response = await apiClient.post('/ai/summarize', data);
      return response.data;
    },
    extractTasks: async (data) => {
      const response = await apiClient.post('/ai/extract-tasks', data);
      return response.data;
    }
  },
  integrations: {
    slack: async (data) => {
      const response = await apiClient.post('/integrations/slack', data);
      return response.data;
    },
    notion: async (data) => {
      const response = await apiClient.post('/integrations/notion', data);
      return response.data;
    },
    whatsapp: async (data) => {
      const response = await apiClient.post('/integrations/whatsapp', data);
      return response.data;
    },
    webhook: async (data) => {
      const response = await apiClient.post('/integrations/webhook', data);
      return response.data;
    }
  }
}; 