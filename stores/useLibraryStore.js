import { defineStore } from "pinia";
import { getBooks } from "~/api/library";

export const useLibraryStore = defineStore('library', {
    state: () => ({
        books: {},
        loading: false,
        error: null
    }),
    actions: {
        async fetchBooks(query) {
            this.loading = true;
            try {
                const books = await getBooks(query);
                this.books = books
            } catch (error) {
                this.error = `Failed to fetch data for ${query}`;
            } finally {
                this.loading = false;
            }
        },
        getBooks(){
            return this.books;
        },
        getBookImage(id,directory){
            return `https://covers.openlibrary.org/b/${directory}/${id}-L.jpg`
        }
    }
})