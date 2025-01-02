// Add methods for localStorage handling to the store

import { defineStore } from 'pinia';
import { getUsersData } from '~/api/user';

export const useUserStore = defineStore('user', {

  state: () => ({
    userData: {},
    loading: false,
    error: null,
    results: 0,
    selectedGender: 'ALL',
    selectedNationality: 'ALL',
  }),
  actions: {
    async fetchUser(filter) {
      this.loading = true;
      try {
        const users = await getUsersData(filter);
        this.userData = users;
      } catch (error) {
        this.error = 'Failed to fetch data';
      } finally {
        this.loading = false;
      }
    },
    saveSelections(gender: string, nationality: string) {
      this.selectedGender = gender;
      this.selectedNationality = nationality;

      localStorage.setItem('selectedGender', gender);
      localStorage.setItem('selectedNationality', nationality);
    },
    loadFromLocalStorage() {
      this.selectedGender = localStorage.getItem('selectedGender') || 'ALL';
      this.selectedNationality = localStorage.getItem('selectedNationality') || 'ALL';
    },
    getUsersData() {
      return this.userData;
    },
  },
});
