import axios from 'axios';

// Fallback to local endpoint if environment variable isn't defined
export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

/**
 * Generic API request handler
 */
const apiReq = async (endpoint, method = 'GET', data = null, customConfig = {}) => {
  try {
    const token = localStorage.getItem('authToken');
    
    // Ensure leading slash on endpoints
    const formattedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;

    const config = {
      method,
      url: `${API_BASE_URL}${formattedEndpoint}`,
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        ...(data instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
        ...(customConfig.headers || {}),
      },
      data,
      ...customConfig,
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error('API Request Failed:', error.response?.data || error.message);
    throw error.response?.data?.message || error.message || 'API request failed';
  }
};

// 🧑‍🎓 Auth and Profile Functions
const signupUser = async (formData) => {
  return await apiReq('/users/signup', 'POST', formData);
};

const loginUser = async (formData) => {
  return await apiReq('/users/login', 'POST', formData);
};

const googleLogin = async (credential) => {
  return await apiReq('/users/google-login', 'POST', { credential });
};

const getUserData = async () => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('No token found in localStorage');
  return await apiReq('/users/getUser', 'GET');
};

const updateProfile = async (formData) => {
  const token = localStorage.getItem('authToken');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return await apiReq('/users/update-profile', 'PUT', formData, config);
};

const changePassword = async (formData) => {
  return await apiReq('/users/change-password', 'PUT', formData);
};

const getUserRole = async (token) => {
  return await apiReq('/users/getUserRole', 'GET', null, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// 📚 Tutor-Related Functions
const becomeTutor = async (formData) => {
  const token = localStorage.getItem('authToken');
  if (!token) throw new Error('Authentication required');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return await apiReq('/tutor/become-tutor', 'POST', formData, config);
};

const getAllTutors = async (filters = {}) => {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value);
    }
  });

  try {
    const queryString = params.toString();
    const endpoint = queryString ? `/tutor?${queryString}` : '/tutor';
    const tutors = await apiReq(endpoint);
    return Array.isArray(tutors) ? tutors : [];
  } catch (error) {
    console.error('Failed to fetch tutors:', error);
    return [];
  }
};

const getTutorById = async (tutorId) => {
  if (!tutorId) throw new Error('Tutor ID is required');

  try {
    const response = await apiReq(`/tutor/${tutorId}`);
    return response?.tutor || response;
  } catch (error) {
    console.error(`Error fetching tutor ${tutorId}:`, error);
    throw error;
  }
};

const rateTutor = async (tutorId, rating, review = '') => {
  const user = await getUserData();
  return await apiReq('/tutor/rate', 'POST', {
    tutorId,
    userId: user._id,
    rating,
    review,
  });
};

const verifyTutorStatus = async (userId) => {
  try {
    const user = await apiReq(`/users/${userId}`);
    return user?.role === 'Tutor';
  } catch (error) {
    console.error('Error verifying tutor status:', error);
    return false;
  }
};

// 💬 Chat API Functions
const createOrGetConversation = async (otherUserId) => {
  return await apiReq('/chat/conversation', 'POST', { otherUserId });
};

const getUserConversations = async () => {
  return await apiReq('/chat/conversations');
};

const getMessages = async (conversationId) => {
  return await apiReq(`/chat/messages/${conversationId}`);
};

const sendMessage = async (conversationId, text) => {
  return await apiReq('/chat/messages', 'POST', { conversationId, text });
};

// 🤝 Hiring API Functions
const sendHireRequest = async (tutorId) => {
  return await apiReq('/hire/request', 'POST', { tutorId });
};

const checkHireStatus = async (tutorId) => {
  return await apiReq(`/hire/status/${tutorId}`, 'GET');
};

const cancelHireRequest = async (tutorId) => {
  return await apiReq('/hire/cancel', 'POST', { tutorId });
};

const acceptHireRequest = async (studentId) => {
  return await apiReq('/hire/accept', 'POST', { studentId });
};

const rejectHireRequest = async (studentId) => {
  return await apiReq('/hire/reject', 'POST', { studentId });
};

const getUserNotifications = async () => {
  return await apiReq('/hire/notifications', 'GET');
};

const getTutorHireRequests = async () => {
  return await apiReq('/hire/requests', 'GET');
};

// 👑 Admin API Functions
export const getAllUsers = async (role = null) => {
  const params = role ? { role } : {};
  return await apiReq('/admin/users', 'GET', null, { params });
};

export const getUserDetails = async (userId) => {
  const response = await apiReq(`/admin/users/${userId}`, 'GET');
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await apiReq(`/admin/users/${userId}`, 'DELETE');
  return response.data;
};

export const getPendingTutors = async () => {
  return await apiReq('/admin/pending-tutors', 'GET');
};

export const processTutorRequest = async (userId, action) => {
  const response = await apiReq(`/admin/tutor-requests/${userId}`, 'PUT', { action });
  return response.data;
};

// Named Exports
export {
  getUserNotifications,
  sendHireRequest,
  checkHireStatus,
  cancelHireRequest,
  acceptHireRequest,
  rejectHireRequest,
  getTutorHireRequests,
  becomeTutor,
  getAllTutors,
  getTutorById,
  rateTutor,
  verifyTutorStatus,
  signupUser,
  loginUser,
  googleLogin,
  getUserData,
  updateProfile,
  changePassword,
  getUserRole,
  getMessages,
  createOrGetConversation,
  sendMessage,
  getUserConversations,
};