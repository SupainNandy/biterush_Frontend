import apiClient from './axios';

export const authAPI = {
  // Sign Up API
  signup: async (userData) => {
    const response = await apiClient.post('/auth/signup', userData);
    return response.data;
  },
  
  // Sign In API
  signin: async (credentials) => {
    const response = await apiClient.post('/auth/signin', credentials);
    return response.data;
  },

  // Sign Out API
  signout: async () => {
    const response = await apiClient.get('/auth/signout');
    return response.data;
  }
};
