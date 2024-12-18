// stores/userStore.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    selectedGender: '',
    selectedNationality: ''
  }),

  actions: {
    // Helper method to check if we're in a browser environment
    isBrowser() {
      return typeof window !== 'undefined';
    },

    setSelectedGender(gender: string) {
      this.selectedGender = gender;
      if (this.isBrowser()) {
        localStorage.setItem('selectedGender', gender); // Save to localStorage only if in the browser
      }
    },

    setSelectedNationality(nationality: string) {
      this.selectedNationality = nationality;
      if (this.isBrowser()) {
        localStorage.setItem('selectedNationality', nationality); // Save to localStorage only if in the browser
      }
    },

    saveSelections(gender: string, nationality: string) {
      this.setSelectedGender(gender);
      this.setSelectedNationality(nationality);
    },

    // Method to load from localStorage if available
    loadFromLocalStorage() {
      if (this.isBrowser()) {
        const savedGender = localStorage.getItem('selectedGender');
        const savedNationality = localStorage.getItem('selectedNationality');
        if (savedGender) this.selectedGender = savedGender;
        if (savedNationality) this.selectedNationality = savedNationality;
      }
    }
  },

  // Using a lifecycle hook to load data from localStorage when the store is first initialized
  persist: true
});
