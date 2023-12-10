import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { Notify } from 'notiflix';
import { fetchImageByRequest } from './request-api';

let page = 1;
const per_page = 40;

const gallery = new SimpleLightbox('.gallery a');

const loadMoreBtn = document.querySelector('.load-more');
const galleryContainer = document.querySelector('.gallery');
const form = document.querySelector('.search-form');

form.addEventListener('submit', onInputSearch);

loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function hideBtn() {
  loadMoreBtn.classList.add('hidden-btn');
}

async function onInputSearch(event) {
  event.preventDefault();
  galleryContainer.innerHTML = '';
  hideBtn();

  const userRequest = event.target.elements.searchQuery.value;

  try {

    if (!userRequest.trim().length) {
      Notify.failure('Please fill out the search field.');

    } else {
      localStorage.setItem('currentRequest', userRequest);
      const { data } = await fetchImageByRequest(userRequest, (page = 1));
      if (!data.hits.length) {
        // throw new Error(
          Notify.failure('Sorry, there are no images matching your search query. Please try again.');
          // iziToast.error({
          //   message: `Sorry, there are no images matching your search query. Please try again.`,
          //   position: 'topRight',
          //   timeout: 4000,
          //   closeOnClick: true,
          // });
        // );
      }

      // Notify.info(`Hooray! We found ${data.totalHits} images.`);
      iziToast.info({
        message: `Hooray! We found ${data.totalHits} images.`,
        position: 'topRight',
        timeout: 5000,
        closeOnClick: true,
      });
      renderImages(data.hits);
      gallery.refresh();
      if (data.hits.length < 40) {
        hideBtn();
        setTimeout(() => {
          // Notify.info("We're sorry, but you've reached the end of search results.");
          iziToast.info({
            message: "We're sorry, but you've reached the end of search results.",
            position: 'topRight',
            timeout: 5000,
            closeOnClick: true,
          });
        }, 2000);
      } else {
        loadMoreBtn.classList.remove('hidden-btn');
      }
    }
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
  
  form.reset();
}

async function onLoadMoreBtnClick() {
  page += 1;
  const currentRequest = localStorage.getItem('currentRequest');
  try {
    const { data } = await fetchImageByRequest(currentRequest, page);

    renderImages(data.hits);
    gallery.refresh();

    if (data.hits.length < 40) {
      hideBtn();
      setTimeout(() => {
        // Notify.info("We're sorry, but you've reached the end of search results.");
        iziToast.info({
          message: "We're sorry, but you've reached the end of search results.",
          position: 'topRight',
          timeout: 4000,
          closeOnClick: true,
        });
      }, 1000);
    }
    // })
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}

function renderImages(arr) {
  const markup = arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
        }) => `
          <div class="photo-card">
            <a href="${largeImageURL}" class="gallery__link">
              <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery__image" width="300"/>
              <div class="info">
                <p class="info-item">
                  <b>Likes</b> <span>${likes}&nbsp</span>
                </p>
                <p class="info-item">
                  <b>Views</b> <span>${views}&nbsp</span>
                </p>
                <p class="info-item">
                  <b>Comments</b> <span>${comments}&nbsp</span>
                </p>
                <p class="info-item">
                  <b>Downloads</b> <span>${downloads}</span>
                </p> 
              </div>
            </a>
          </div>
        `)
    .join('');
  galleryContainer.insertAdjacentHTML('beforeend', markup);
}
