// src/services/partnerService.js
import api from './api'; // Import the API instance from api.js

// Fetch a specific partner by ID
export const getPartnerById = async (partnerId) => {
  try {

    const response = await api.get(`/partner/${partnerId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching partner:', error);
    throw new Error('Failed to fetch partner');
  }
};

// Update an existing partner
export const updatePartnerById = async (partnerId, partnerData) => {
  try {
    const response = await api.put(`/partner/${partnerId}`, partnerData);
    return response.data;
  } catch (error) {
    console.error('Error updating partner:', error);
    throw new Error('Failed to update partner');
  }
};

// Get tests by partner ID
export const getTestsByPartnerId = async (partnerId) => {
  try {
    const response = await api.get(`/partner/${partnerId}/tests`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tests:', error);
    throw new Error('Failed to fetch tests');
  }
};

// Update tests by partner ID
export const updateTestsByPartnerId = async (partnerId, tests) => {
  try {
    const jsonTests = { "tests": tests }
    const response = await api.put(`/partner/${partnerId}/tests`, jsonTests);
    return response.data;
  } catch (error) {
    console.error('Error updating tests:', error);
    throw new Error('Failed to update tests');
  }
};

// Get hours by partner ID
export const getHoursById = async (partnerId) => {
  try {
    const response = await api.get(`/partner/${partnerId}/work-hours`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hours:', error);
    throw new Error('Failed to fetch hours');
  }
};

// Update hours by partner ID
export const updateHoursById = async (partnerId, hours) => {
  try {
    const jsonHours = { "workHours": hours }
    const response = await api.put(`/partner/${partnerId}/work-hours`, jsonHours);
    return response.data;
  } catch (error) {
    console.error('Error updating hours:', error);
    throw new Error('Failed to update hours');
  }
};

// Get appointments by partnerID
export const getAppointmentsById = async (partnerId) => {
    try {
      const response = await api.get(`/partner/${partnerId}/appointments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw new Error('Failed to fetch appointments');
    }
  };