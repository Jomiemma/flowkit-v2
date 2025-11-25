// API Configuration and Base URL
// Automatically use the same host IP that the frontend is accessed from
const getApiBaseUrl = () => {
  // If environment variable is set, use it
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // Otherwise, use the current host (works for both localhost and network IP)
  const currentHost = window.location.hostname;
  return `http://${currentHost}:5000/api`;
};

const API_BASE_URL = getApiBaseUrl();

// Helper function to get auth token
export const getToken = () => {
  return localStorage.getItem("token");
};

// Helper function to save auth token
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// Helper function to remove auth token
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Helper function to save user data
export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

// Helper function to get user data
export const getUser = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

// Helper function to remove user data
export const removeUser = () => {
  localStorage.removeItem("user");
};

// Helper function to check if user is authenticated
export const isAuthenticated = () => {
  return !!getToken();
};

// Base fetch function with authentication
const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();

  const config = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    const data = await apiFetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
    if (data.token) {
      saveToken(data.token);
      saveUser(data.user);
    }
    return data;
  },

  login: async (credentials) => {
    const data = await apiFetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
    if (data.token) {
      saveToken(data.token);
      saveUser(data.user);
    }
    return data;
  },

  logout: () => {
    removeToken();
    removeUser();
  },

  getMe: async () => {
    return await apiFetch("/auth/me");
  },

  updatePassword: async (passwordData) => {
    return await apiFetch("/auth/update-password", {
      method: "PUT",
      body: JSON.stringify(passwordData),
    });
  },
};

// User API calls
export const userAPI = {
  getAll: async () => {
    return await apiFetch("/users");
  },

  getRelievers: async () => {
    return await apiFetch("/users/relievers");
  },

  getById: async (id) => {
    return await apiFetch(`/users/${id}`);
  },

  updateProfile: async (profileData) => {
    return await apiFetch("/users/profile", {
      method: "PUT",
      body: JSON.stringify(profileData),
    });
  },

  uploadSignature: async (signatureData) => {
    return await apiFetch("/users/signature", {
      method: "POST",
      body: JSON.stringify({ signature: signatureData }),
    });
  },
};

// Leave API calls
export const leaveAPI = {
  create: async (leaveData) => {
    return await apiFetch("/leaves", {
      method: "POST",
      body: JSON.stringify(leaveData),
    });
  },

  getMyLeaves: async () => {
    return await apiFetch("/leaves/my-leaves");
  },

  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    return await apiFetch(`/leaves${queryParams ? `?${queryParams}` : ""}`);
  },

  update: async (id, leaveData) => {
    return await apiFetch(`/leaves/${id}`, {
      method: "PUT",
      body: JSON.stringify(leaveData),
    });
  },

  delete: async (id) => {
    return await apiFetch(`/leaves/${id}`, {
      method: "DELETE",
    });
  },

  approve: async (id, comment = "") => {
    return await apiFetch(`/leaves/${id}/approve`, {
      method: "PUT",
      body: JSON.stringify({ comment }),
    });
  },

  reject: async (id, reason) => {
    return await apiFetch(`/leaves/${id}/reject`, {
      method: "PUT",
      body: JSON.stringify({ reason }),
    });
  },

  cancel: async (id) => {
    return await apiFetch(`/leaves/${id}/cancel`, {
      method: "PUT",
    });
  },
};

// Dashboard API calls
export const dashboardAPI = {
  getStats: async () => {
    return await apiFetch("/dashboard/stats");
  },

  getGraphData: async () => {
    return await apiFetch("/dashboard/graph");
  },

  getLeaveProgress: async (leaveId) => {
    return await apiFetch(`/dashboard/progress/${leaveId}`);
  },

  getAllData: async () => {
    return await apiFetch("/dashboard/all");
  },
};

// HOD API calls
export const hodAPI = {
  getDashboardStats: async () => {
    return await apiFetch("/hod/dashboard/stats");
  },

  getLeaves: async () => {
    return await apiFetch("/hod/leaves");
  },

  approveLeave: async (id, comment = "") => {
    return await apiFetch(`/hod/leaves/${id}/approve`, {
      method: "PUT",
      body: JSON.stringify({ comment }),
    });
  },

  rejectLeave: async (id, reason) => {
    return await apiFetch(`/hod/leaves/${id}/reject`, {
      method: "PUT",
      body: JSON.stringify({ reason }),
    });
  },
};

// HR API calls
export const hrAPI = {
  getDashboardStats: async () => {
    return await apiFetch("/hr/dashboard/stats");
  },

  getLeaves: async () => {
    return await apiFetch("/hr/leaves");
  },

  approveLeave: async (id, comment = "") => {
    return await apiFetch(`/hr/leaves/${id}/approve`, {
      method: "PUT",
      body: JSON.stringify({ comment }),
    });
  },

  rejectLeave: async (id, reason) => {
    return await apiFetch(`/hr/leaves/${id}/reject`, {
      method: "PUT",
      body: JSON.stringify({ reason }),
    });
  },
};

// GED API calls
export const gedAPI = {
  getDashboardStats: async () => {
    return await apiFetch("/ged/dashboard/stats");
  },

  getLeaves: async () => {
    return await apiFetch("/ged/leaves");
  },

  approveLeave: async (id, comment = "") => {
    return await apiFetch(`/ged/leaves/${id}/approve`, {
      method: "PUT",
      body: JSON.stringify({ comment }),
    });
  },

  rejectLeave: async (id, reason) => {
    return await apiFetch(`/ged/leaves/${id}/reject`, {
      method: "PUT",
      body: JSON.stringify({ reason }),
    });
  },
};

export default {
  auth: authAPI,
  user: userAPI,
  leave: leaveAPI,
  dashboard: dashboardAPI,
  hod: hodAPI,
  hr: hrAPI,
  ged: gedAPI,
};
