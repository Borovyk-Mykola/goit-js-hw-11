import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const TOTAL_HITS_KEY = 'Total hits'

export class Pixabay {
    key = '28194821-49041d995ecd04735d9e20d11'
    page = 1;
    per_page = 40;
    query = '';
    totalPages = 0;

    async getPhotos() {
        const params = {
            page: this.page,
            q: this.query,
            per_page: this.per_page,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
        };

        const urlAXIOS = `?key=${this.key}`;
        const { data } = await axios.get(urlAXIOS, { params, });
        localStorage.setItem(TOTAL_HITS_KEY, data.totalHits);
        return data;
    }

    hasMorePhotos() {
        const freetotalHits = localStorage.getItem(TOTAL_HITS_KEY);
        return this.page < this.totalPages / this.per_page && this.page < freetotalHits / this.per_page;
    }
}