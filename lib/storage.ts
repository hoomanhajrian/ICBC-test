/**
 * Utility functions for localStorage persistence
 */

const STORAGE_KEYS = {
  RESULTS: 'icbc-test-results',
  PREFERENCES: 'icbc-test-preferences',
};

export const storage = {
  /**
   * Save test results to localStorage
   */
  saveResults: (results: any[]) => {
    try {
      localStorage.setItem(STORAGE_KEYS.RESULTS, JSON.stringify(results));
    } catch (error) {
      console.error('Error saving results:', error);
    }
  },

  /**
   * Load test results from localStorage
   */
  loadResults: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.RESULTS);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading results:', error);
      return [];
    }
  },

  /**
   * Save user preferences
   */
  savePreferences: (preferences: Record<string, any>) => {
    try {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(preferences));
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  },

  /**
   * Load user preferences
   */
  loadPreferences: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      return data ? JSON.parse(data) : {};
    } catch (error) {
      console.error('Error loading preferences:', error);
      return {};
    }
  },

  /**
   * Clear all stored data
   */
  clearAll: () => {
    try {
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};
