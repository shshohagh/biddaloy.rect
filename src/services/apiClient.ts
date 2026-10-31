import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { LaravelApiConfig, OfflineQueuedAction } from '../types';

const STORAGE_KEY_CONFIG = 'dataclick_laravel_api_config';
const STORAGE_KEY_OFFLINE_QUEUE = 'dataclick_offline_queue';

// Default config targeting standard Laravel API route
export const getStoredApiConfig = (): LaravelApiConfig => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Failed to parse api config from storage', e);
  }
  return {
    baseUrl: 'https://api.dataclick.in/api/v1',
    bearerToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.pos_demo_token',
    useMockFallback: true,
    isConnected: true,
    lastSyncTime: new Date().toLocaleTimeString(),
  };
};

export const saveApiConfig = (config: LaravelApiConfig) => {
  localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  window.dispatchEvent(new CustomEvent('dataclick-config-updated', { detail: config }));
};

// Offline Queue helpers
export const getOfflineQueue = (): OfflineQueuedAction[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_OFFLINE_QUEUE);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read offline queue', e);
  }
  return [];
};

export const queueOfflineAction = (action: Omit<OfflineQueuedAction, 'id' | 'timestamp'>) => {
  const queue = getOfflineQueue();
  const newAction: OfflineQueuedAction = {
    ...action,
    id: `queue_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
  };
  queue.push(newAction);
  localStorage.setItem(STORAGE_KEY_OFFLINE_QUEUE, JSON.stringify(queue));
  window.dispatchEvent(new CustomEvent('dataclick-offline-queue-changed', { detail: queue }));
  return newAction;
};

export const clearOfflineQueue = () => {
  localStorage.removeItem(STORAGE_KEY_OFFLINE_QUEUE);
  window.dispatchEvent(new CustomEvent('dataclick-offline-queue-changed', { detail: [] }));
};

// Create configured Axios instance
const config = getStoredApiConfig();

export const apiClient: AxiosInstance = axios.create({
  baseURL: config.baseUrl,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Interceptor: Bearer Token injection & Dynamic Base URL
apiClient.interceptors.request.use(
  (reqConfig: InternalAxiosRequestConfig) => {
    const activeConfig = getStoredApiConfig();
    if (activeConfig.bearerToken) {
      reqConfig.headers.Authorization = `Bearer ${activeConfig.bearerToken}`;
    }
    if (activeConfig.baseUrl && reqConfig.baseURL !== activeConfig.baseUrl) {
      reqConfig.baseURL = activeConfig.baseUrl;
    }
    return reqConfig;
  },
  (error) => Promise.reject(error)
);

// Interceptor: Standardized Error Handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (!navigator.onLine) {
      console.warn('Network offline, action will be handled in offline mode');
    }

    if (error.response) {
      // Laravel validation errors (HTTP 422)
      if (error.response.status === 422) {
        const errorData = error.response.data as any;
        const messages = errorData?.errors ? Object.values(errorData.errors).flat().join(', ') : 'Validation failed';
        return Promise.reject(new Error(`Validation Error: ${messages}`));
      }

      // Laravel Auth expired (HTTP 401)
      if (error.response.status === 401) {
        return Promise.reject(new Error('Session expired or unauthorized. Please verify Bearer Token in API settings.'));
      }

      // Laravel Server Error (HTTP 500)
      if (error.response.status >= 500) {
        return Promise.reject(new Error('Backend server error. Reverting to offline/local storage.'));
      }
    }

    return Promise.reject(error);
  }
);
