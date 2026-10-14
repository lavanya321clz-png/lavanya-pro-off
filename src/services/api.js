// API Client Service for ASP.NET Core & PostgreSQL Backend
const API_BASE = '/api';

async function handleResponse(response) {
  if (!response.ok) {
    let errorDetail = '';
    try {
      const errJson = await response.json();
      errorDetail = errJson.message || errJson.error || JSON.stringify(errJson);
    } catch {
      try {
        errorDetail = await response.text();
      } catch {
        errorDetail = response.statusText;
      }
    }
    throw new Error(`API Error (${response.status}): ${errorDetail || response.statusText}`);
  }
  if (response.status === 204) return null;
  return await response.json();
}

export const api = {
  // DB Health & Status
  async getDbStatus() {
    try {
      const res = await fetch(`${API_BASE}/database/status`);
      return await handleResponse(res);
    } catch (err) {
      console.warn('Backend DB Status error:', err);
      return { connected: false, error: err.message };
    }
  },

  // Cases
  async getCases() {
    const res = await fetch(`${API_BASE}/cases`);
    return await handleResponse(res);
  },
  async getCase(id) {
    const res = await fetch(`${API_BASE}/cases/${id}`);
    return await handleResponse(res);
  },
  async createCase(caseData) {
    const res = await fetch(`${API_BASE}/cases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(caseData),
    });
    return await handleResponse(res);
  },
  async updateCase(caseData) {
    const res = await fetch(`${API_BASE}/cases/${caseData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(caseData),
    });
    return await handleResponse(res);
  },
  async deleteCase(id) {
    const res = await fetch(`${API_BASE}/cases/${id}`, {
      method: 'DELETE',
    });
    return await handleResponse(res);
  },

  // Clients
  async getClients() {
    const res = await fetch(`${API_BASE}/clients`);
    return await handleResponse(res);
  },
  async createClient(clientData) {
    const res = await fetch(`${API_BASE}/clients`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientData),
    });
    return await handleResponse(res);
  },
  async updateClient(clientData) {
    const res = await fetch(`${API_BASE}/clients/${clientData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clientData),
    });
    return await handleResponse(res);
  },
  async deleteClient(id) {
    const res = await fetch(`${API_BASE}/clients/${id}`, {
      method: 'DELETE',
    });
    return await handleResponse(res);
  },

  // Appointments
  async getAppointments() {
    const res = await fetch(`${API_BASE}/appointments`);
    return await handleResponse(res);
  },
  async createAppointment(apptData) {
    const res = await fetch(`${API_BASE}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apptData),
    });
    return await handleResponse(res);
  },
  async updateAppointment(apptData) {
    const res = await fetch(`${API_BASE}/appointments/${apptData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apptData),
    });
    return await handleResponse(res);
  },
  async deleteAppointment(id) {
    const res = await fetch(`${API_BASE}/appointments/${id}`, {
      method: 'DELETE',
    });
    return await handleResponse(res);
  },

  // Tasks
  async getTasks() {
    const res = await fetch(`${API_BASE}/tasks`);
    return await handleResponse(res);
  },
  async createTask(taskData) {
    const res = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    return await handleResponse(res);
  },
  async updateTask(taskData) {
    const res = await fetch(`${API_BASE}/tasks/${taskData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(taskData),
    });
    return await handleResponse(res);
  },
  async deleteTask(id) {
    const res = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'DELETE',
    });
    return await handleResponse(res);
  },

  // Records
  async getRecords() {
    const res = await fetch(`${API_BASE}/records`);
    return await handleResponse(res);
  },
  async createRecord(recordData) {
    const res = await fetch(`${API_BASE}/records`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recordData),
    });
    return await handleResponse(res);
  },
  async updateRecord(recordData) {
    const res = await fetch(`${API_BASE}/records/${recordData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recordData),
    });
    return await handleResponse(res);
  },
  async deleteRecord(id) {
    const res = await fetch(`${API_BASE}/records/${id}`, {
      method: 'DELETE',
    });
    return await handleResponse(res);
  },

  // Notifications
  async getNotifications() {
    const res = await fetch(`${API_BASE}/notifications`);
    return await handleResponse(res);
  },
  async createNotification(notifData) {
    const res = await fetch(`${API_BASE}/notifications`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notifData),
    });
    return await handleResponse(res);
  },
  async updateNotification(notifData) {
    const res = await fetch(`${API_BASE}/notifications/${notifData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(notifData),
    });
    return await handleResponse(res);
  },
  async deleteNotification(id) {
    const res = await fetch(`${API_BASE}/notifications/${id}`, {
      method: 'DELETE',
    });
    return await handleResponse(res);
  },

  // Activities
  async getActivities() {
    const res = await fetch(`${API_BASE}/activities`);
    return await handleResponse(res);
  },
  async createActivity(activityData) {
    const res = await fetch(`${API_BASE}/activities`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(activityData),
    });
    return await handleResponse(res);
  },

  // Users
  async getUsers() {
    const res = await fetch(`${API_BASE}/users`);
    return await handleResponse(res);
  },
  async createUser(userData) {
    const res = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await handleResponse(res);
  },
  async updateUser(userData) {
    const res = await fetch(`${API_BASE}/users/${userData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return await handleResponse(res);
  },

  // RBAC Matrix
  async getRbacMatrix() {
    const res = await fetch(`${API_BASE}/rbac`);
    return await handleResponse(res);
  },
  async updateRbacMatrix(matrix) {
    const res = await fetch(`${API_BASE}/rbac`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(matrix),
    });
    return await handleResponse(res);
  },
};
