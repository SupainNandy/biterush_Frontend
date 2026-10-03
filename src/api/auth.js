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
  },

  // Send OTP
  sendOtp: async (email) => {
    const response = await apiClient.post('/auth/send-otp', { email });
    return response.data;
  },

  // Verify OTP
  verifyOtp: async (data) => {
    const response = await apiClient.post('/auth/verify-otp', data);
    return response.data;
  },

  // Reset Password
  resetPassword: async (data) => {
    const response = await apiClient.post('/auth/reset-password', data);
    return response.data;
  },

  // Google OAuth Auth
  googleAuth: async (googleData) => {
    const response = await apiClient.post('/auth/google', googleData);
    return response.data;
  }
};
