import axios from 'axios';
import { getToken, isTokenValid } from './auth';

// const REACT_WEB_API_URL = 'http://localhost:8080/api/menu';
// const REACT_WEB_API_URL2 = 'http://localhost:8080/api/auth';
// const REACT_WEB_API_URL3 = 'http://localhost:8080/api/orders';
// Khai báo IP máy chủ (Máy Manager)
// LƯU Ý: Thay 192.168.1.15 bằng IPv4 thật của ông
// const API_BASE_URL = 'http://192.168.1.5:8080';
// const REACT_WEB_API_URL = `${API_BASE_URL}/api/menu`;
// const REACT_WEB_API_URL2 = `${API_BASE_URL}/api/auth`;
// const REACT_WEB_API_URL3 = `${API_BASE_URL}/api/orders`;

const REACT_WEB_API_URL = '/api/menu';
const REACT_WEB_API_URL2 = '/api/auth';
const REACT_WEB_API_URL3 = '/api/orders';
// Tạo axios instance
const apiClient = axios.create();

// Request interceptor để thêm token vào header
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token && isTokenValid(token)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor để xử lý lỗi
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.dispatchEvent(new CustomEvent('userLogout'));
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const getMenuList = () => apiClient.get(REACT_WEB_API_URL);
// export const addMenuItem = (menuItem) => axios.post(REACT_WEB_API_URL, menuItem);
// export const getMenuCount = () => apiClient.get(`${REACT_WEB_API_URL}/total`);
export const getMenuCount = async () => {
  try {
    const response = await apiClient.get(REACT_WEB_API_URL);
    return response.data.length;
  } catch (error) {
    console.error('Error fetching menu count:', error);
    throw error;
  }
};

export const getFoodCount = async () => {
  try {
    const response = await getMenuFood();
    return response.data.length;
  } catch (error) {
    console.error('Error fetching food count:', error);
    throw error;
  }
};

export const getDrinkCount = async () => {
  try {
    const response = await getMenuDrink();
    return response.data.length;
  } catch (error) {
    console.error('Error fetching drink count:', error);
    throw error;
  }
};

export const getMenuFood = () => apiClient.get(`${REACT_WEB_API_URL}/food`);
export const getMenuDrink = () => apiClient.get(`${REACT_WEB_API_URL}/drink`);

// export const getMenuByType = () => axios.get(`${REACT_WEB_API_URL}/type/${type}`);
export const getMenuByType = (type) => {
  return apiClient.get(`${REACT_WEB_API_URL}/type/${type}`);
};

export const addMenuItem = (formData) => {
  return apiClient.post(`${REACT_WEB_API_URL}/upload`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};



export const getIDItem = (id) => apiClient.get(`${REACT_WEB_API_URL}/${id}`);
// export const updateMenuItem = (id) => apiClient.put(`${REACT_WEB_API_URL}/update/${id}`);
export const deleteMenuItem = (id) => apiClient.delete(`${REACT_WEB_API_URL}/${id}`);

export const updateMenuItem = (id, formData) => 
  apiClient.put(`${REACT_WEB_API_URL}/update/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  

export const registerUser = (userData) => {
  return apiClient.post(`${REACT_WEB_API_URL2}/register`, userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const loginUser = (userData) => {
  return apiClient.post(`${REACT_WEB_API_URL2}/login`, userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const Logout = (userData) => {
  return apiClient.post(`${REACT_WEB_API_URL2}/logout`, userData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const getallUsers = () => {
  return apiClient.get(`${REACT_WEB_API_URL2}/users`);
}

// ORDER API

// Tạo đơn hàng
// export const createOrder = (orderData) => {
//   return apiClient.post(REACT_WEB_API_URL3, orderData, {
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });
// };

export const createOrder = (orderData) => {
  return apiClient.post(REACT_WEB_API_URL3, orderData, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// Lấy tất cả đơn hàng (admin)
export const getAllOrders = () => {
  return apiClient.get(`${REACT_WEB_API_URL3}/admin/orders`);
};


export const getOrdersCount = async () => {
  try {
    const response = await getAllOrders();
    return response.data.length;
  } catch (error) {
    console.error('Error fetching orders count:', error);
    throw error;
  }
};

export const getOrdersByStatus = async () => {
  try {
    const response = await getAllOrders();
    const orders = response.data;
    
    // Đếm theo status
    const statusCount = orders.reduce((acc, order) => {
      const status = order.status || 'UNKNOWN';
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    
    return statusCount;
  } catch (error) {
    console.error('Error fetching orders by status:', error);
    throw error;
  }
};




// Lấy đơn hàng của 1 user
export const getOrdersByUser = () => {
  return apiClient.get(`${REACT_WEB_API_URL3}/user`);
};

// Cập nhật trạng thái đơn hàng
// export const updateOrderStatus = (orderId, status) => {
//   return apiClient.put(`${REACT_WEB_API_URL3}/${orderId}/status`, null, {
//     params: { status }, // ví dụ: PENDING, SHIPPING, COMPLETED
//   });
// };
export const updateOrderStatus = (orderId, status) => {
  return apiClient.put(`${REACT_WEB_API_URL3}/admin/orders/${orderId}/status`, { status });
};

export const updateUserOrderStatus = (orderId) => {
  return apiClient.put(`${REACT_WEB_API_URL3}/user/orders/${orderId}/cancel`, { }); 
};