import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Matrix computation API
export const computeMatrix = async (operation, data) => {
  try {
    const response = await api.post('/api/compute', {
      operation,
      ...data
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Computation failed');
  }
};

// Projects API
export const getProjects = async () => {
  try {
    const response = await api.get('/api/projects');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to load projects');
  }
};

export const saveProject = async (projectData) => {
  try {
    const response = await api.post('/api/projects', projectData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to save project');
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    const response = await api.put(`/api/projects/${projectId}`, projectData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to update project');
  }
};

export const deleteProject = async (projectId) => {
  try {
    const response = await api.delete(`/api/projects/${projectId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || 'Failed to delete project');
  }
};

export default api;
