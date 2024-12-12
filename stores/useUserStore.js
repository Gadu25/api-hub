import { defineStore } from 'pinia';
import { getUsersData } from '~/api/user';

export const useUserStore = defineStore('user', {
    state: () => ({
        userData: {},
        loading: false,
        error: null
    }),
    actions: {
        async fetchUser(filter) {
            this.loading = true;

            console.log(filter)
            try{
                const users = await getUsersData(filter);
                this.userData = users;
            } catch(error) {
                this.error = `Failed to fetch data`;
            } finally {
                this.loading = false
            }
        },
        getUsersData() {
            return this.userData
        }
    }
})