const baseURL = 'https://pixabay.com/api/';

export class Pixabay {
    key = '28194821-49041d995ecd04735d9e20d11';
    page = 1;
    per_page = 40;
    query = '';
    totalPages = 0;

    async getPhotos() {
        const data = await fetch(`${baseURL}?key=${this.key}&q=${this.query}&page=${this.page}&per_page=${this.per_page}&image_type='photo'&orientation='horizontal'&safesearch=true`)
        .then(r => r.json());
        return data;
    }

    get query() {
        this.query;
    }

    set query(newQuery) {
        this.query = newQuery;
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