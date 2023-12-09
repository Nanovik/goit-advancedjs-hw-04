import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { Notify } from 'notiflix';
import { fetchImageByRequest } from './request-api';

let page = 1;
const loadMoreBtn = document.querySelector('.load-more');
const galleryContainer = document.querySelector('.gallery');
const form = document.querySelector('.search-form');
form.addEventListener('submit', onInputSearch);

function hideBtn() {
  loadMoreBtn.classList.add('hidden-btn');
}

function onInputSearch(event) {
  event.preventDefault();
  galleryContainer.innerHTML = '';
  hideBtn();

  const userRequest = event.target.elements.searchQuery.value;
  if (!userRequest.trim().length) {
      Notify.failure('Please fill out the search field.');

    } else {
        localStorage.setItem('currentRequest', userRequest);

        fetchImageByRequest(userRequest, (page = 1))
        .then(response => {
            if (!response.data.hits.length) {
                throw new Error(
                    // Notify.failure('Sorry, there are no images matching your search query. Please try again.')
                    iziToast.error({
                        message: `Sorry, there are no images matching your search query. Please try again.`,
                        position: 'topRight',
                        timeout: 4000,
                        closeOnClick: true,
                    })               
                );
            }

            // Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
            iziToast.info({
                message: `Hooray! We found ${response.data.totalHits} images.`,
                position: 'topRight',
                timeout: 5000,
                closeOnClick: true,
            });         
            renderImages(response.data.hits);
            if (response.data.hits.length < 40) {
                hideBtn();
                setTimeout(() => {
                    Notify.info("We're sorry, but you've reached the end of search results.");
                }, 2000);
            } else {
                loadMoreBtn.classList.remove('hidden-btn');
            }
        })
      .catch(error => console.log(error));
  }

  form.reset();
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

  const gallery = new SimpleLightbox('.gallery a');
  gallery.refresh();
}

loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);
function onLoadMoreBtnClick() {
  page += 1;
  const currentRequest = localStorage.getItem('currentRequest');

  fetchImageByRequest(currentRequest, page)
    .then(response => {
      renderImages(response.data.hits);
      if (response.data.hits.length < 40) {
        hideBtn();
        setTimeout(() => {
        //   Notify.info("We're sorry, but you've reached the end of search results.");
            iziToast.info({
                message: "We're sorry, but you've reached the end of search results.",
                position: 'topRight',
                timeout: 4000,
                closeOnClick: true,
            });                 
        }, 2000);
      }
    })
    .catch(error => console.log(error));
}
