import './css/styles.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';

import { createCard } from './createCard';
import { Pixabay } from './pixabay';

const refs = {
    form: document.querySelector('.search-form'),
    gallery: document.querySelector('.gallery'),
    btnLoadMore: document.querySelector('.load-more'),
    btnSubmit: document.querySelector('[type="submit"]'),
    searchInput: document.querySelector('[name="searchQuery"]'),
};

const modalSimpleLightbox = new SimpleLightbox('.gallery a', {
    captionDelay: 250,
});
  
refs.btnLoadMore.classList.add('is-hidden');
  
const pixaby = new Pixabay();
    const options = {
    root: null,
    rootMargin: '100px',
    threshold: 1.0,
    };
  
    const loadMorePhotos = async function (entries, observer) {
    entries.forEach(async entry => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        pixaby.incrementPage();
  
        try {
          const { hits } = await pixaby.getPhotos();
          const markup = createCard(hits);
          refs.gallery.insertAdjacentHTML('beforeend', markup);
  
          if (pixaby.hasMorePhotos) {
            const lastItem = document.querySelector('.gallery a:last-child');
            observer.observe(lastItem);
          } else
          Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
  
            modalSimpleLightbox.refresh();
          scrollPage();
        } catch (error) {
            Notiflix.Notify.failure(error.message, 'Something went wrong!');
          clearPage();
        } finally {}
      }
    });
  };
  
  const observer = new IntersectionObserver(loadMorePhotos, options);
  
  const onSubmitClick = async event => {
    event.preventDefault();
  
    const {
      elements: { searchQuery },
    } = event.target;
  
    const search_query = searchQuery.value.trim().toLowerCase();
  
    if (!search_query) {
      clearPage();
      Notiflix.Notify.info('Enter data to search!');
  
      refs.searchInput.placeholder = 'What`re we looking for?';
      return;
    }
  
    pixaby.query = search_query;
  
    clearPage();
  
    try {
      
      const { hits, total } = await pixaby.getPhotos();
  
      if (hits.length === 0) {
        Notiflix.Notify.failure(
          `Sorry, there are no images matching your ${search_query}. Please try again.`);
        return;
      }
  
      const markup = createCard(hits);
      refs.gallery.insertAdjacentHTML('beforeend', markup);
  
      pixaby.setTotal(total);
      Notiflix.Notify.success(`Hooray! We found ${total} images.`);
  
      if (pixaby.hasMorePhotos) {
        //refs.btnLoadMore.classList.remove('is-hidden');
  
        const lastItem = document.querySelector('.gallery a:last-child');
        observer.observe(lastItem);
      }
  
      modalSimpleLightbox.refresh();
      // scrollPage();
    } catch (error) {
        Notiflix.Notify.failure(error.message, 'Something went wrong!');
  
      clearPage();
    } finally {
      
    }
  };
  
  const onLoadMore = async () => {
    pixaby.incrementPage();
  
    if (!pixaby.hasMorePhotos) {
      refs.btnLoadMore.classList.add('is-hidden');
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    }
    try {
      const { hits } = await pixaby.getPhotos();
      const markup = createCard(hits);
      refs.gallery.insertAdjacentHTML('beforeend', markup);
  
      modalLightboxGallery.refresh();
    } catch (error) {
        Notiflix.Notify.failure(error.message, 'Something went wrong!');
  
      clearPage();
    }
  };
  
  function clearPage() {
    pixaby.resetPage();
    refs.gallery.innerHTML = '';
    refs.btnLoadMore.classList.add('is-hidden');
  }
  
  refs.form.addEventListener('submit', onSubmitClick);
  refs.btnLoadMore.addEventListener('click', onLoadMore);
  
  //  smooth scrolling
  function scrollPage() {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();
  
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
  
  //Button smooth scroll up
  
  window.addEventListener('scroll', scrollFunction);
  
  function scrollFunction() {
    if (document.body.scrollTop > 30 || document.documentElement.scrollTop > 30) {
      refs.btnUpWrapper.style.display = 'flex';
    } else {
      refs.btnUpWrapper.style.display = 'none';
    }
  }
  refs.btnUp.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });