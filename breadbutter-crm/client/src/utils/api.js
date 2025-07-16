import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Get token from localStorage
function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
}

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Create axios instance for authenticated requests
const authenticatedApiClient = axios.create({
  baseURL: API_BASE,
});

// Add token to authenticated requests
authenticatedApiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const api = {
  clients: {
    getAll: async () => {
      const response = await authenticatedApiClient.get('/clients');
      return response.data;
    },
    create: async (data) => {
      const response = await authenticatedApiClient.post('/clients', data);
      return response.data;
    },
    update: async (id, data) => {
      const response = await authenticatedApiClient.put(`/clients/${id}`, data);
      return response.data;
    },
    delete: async (id) => {
      const response = await authenticatedApiClient.delete(`/clients/${id}`);
      return response.data;
    }
  },
  talents: {
    getAll: async () => {
      const response = await authenticatedApiClient.get('/talents');
      return response.data;
    },
    create: async (data) => {
      const response = await authenticatedApiClient.post('/talents', data);
      return response.data;
    },
    update: async (id, data) => {
      const response = await authenticatedApiClient.put(`/talents/${id}`, data);
      return response.data;
    },
    delete: async (id) => {
      const response = await authenticatedApiClient.delete(`/talents/${id}`);
      return response.data;
    }
  },
  gigs: {
    getAll: async () => {
      const response = await authenticatedApiClient.get('/gigs');
      return response.data;
    },
    create: async (data) => {
      const response = await authenticatedApiClient.post('/gigs', data);
      return response.data;
    },
    update: async (id, data) => {
      const response = await authenticatedApiClient.put(`/gigs/${id}`, data);
      return response.data;
    },
    delete: async (id) => {
      const response = await authenticatedApiClient.delete(`/gigs/${id}`);
      return response.data;
    },
    addNote: async (id, note) => {
      const response = await authenticatedApiClient.post(`/gigs/${id}/notes`, note);
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