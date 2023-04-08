baseURL = 'https://pixabay.com/api/';

export class Pixabay {
    page = 1;
    per_page = 40;
    query = '';
    totalPages = 0;

    async getPhotos() {
        const params = {
            key: '28194821-49041d995ecd04735d9e20d11',
            page: this.page,
            q: this.query,
            per_page: this.per_page,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        }

        const { data } = await axios.get({ params, });
        return data;
    }

    get query() {
        this.query;
    }

    set query(newQuery) {
        this.#query = newQuery;
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    setTotal(total) {
        this.totalPages = total;
    }

    hasMorePhotos() {
        return this.page < Math.ceil(this.totalPages / this.per_page);
    }
}