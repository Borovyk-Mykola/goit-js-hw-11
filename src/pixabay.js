import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

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
        return data;
    }

    hasMorePhotos() {
        return this.page < Math.ceil(this.totalPages / this.per_page);
    }
}