import{a as L,S as v,n as f,i as a}from"./assets/vendor-eea3fddd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();async function p(r,t){const s="https://pixabay.com/api/",n="37675395-9e31173c5a3e62573866f9f7d",e={key:n,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:t};return await L.get(`${s}?key=${n}&q=${r}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true&page=${t}`,e)}let l=1;const d=new v(".gallery a"),u=document.querySelector(".load-more"),m=document.querySelector(".gallery"),h=document.querySelector(".search-form");h.addEventListener("submit",_);u.addEventListener("click",$);function c(){u.classList.add("hidden-btn")}async function _(r){r.preventDefault(),m.innerHTML="",c();const t=r.target.elements.searchQuery.value;try{if(!t.trim().length)f.Notify.failure("Please fill out the search field.");else{localStorage.setItem("currentRequest",t);const{data:s}=await p(t,l=1);s.hits.length||f.Notify.failure("Sorry, there are no images matching your search query. Please try again."),a.info({message:`Hooray! We found ${s.totalHits} images.`,position:"topRight",timeout:5e3,closeOnClick:!0}),g(s.hits),d.refresh(),s.hits.length<40?(c(),setTimeout(()=>{a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:5e3,closeOnClick:!0})},2e3)):u.classList.remove("hidden-btn")}}catch(s){console.log(s),console.log(s.message)}h.reset()}async function $(){l+=1;const r=localStorage.getItem("currentRequest");try{const{data:t}=await p(r,l);g(t.hits),d.refresh(),t.hits.length<40&&(c(),setTimeout(()=>{a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:4e3,closeOnClick:!0})},1e3))}catch(t){console.log(t),console.log(t.message)}}function g(r){const t=r.map(({webformatURL:s,largeImageURL:n,tags:e,likes:o,views:i,comments:y,downloads:b})=>`
          <div class="photo-card">
            <a href="${n}" class="gallery__link">
              <img src="${s}" alt="${e}" loading="lazy" class="gallery__image" width="300"/>
              <div class="info">
                <p class="info-item">
                  <b>Likes</b> <span>${o}&nbsp</span>
                </p>
                <p class="info-item">
                  <b>Views</b> <span>${i}&nbsp</span>
                </p>
                <p class="info-item">
                  <b>Comments</b> <span>${y}&nbsp</span>
                </p>
                <p class="info-item">
                  <b>Downloads</b> <span>${b}</span>
                </p> 
              </div>
            </a>
          </div>
        `).join("");m.insertAdjacentHTML("beforeend",t)}
//# sourceMappingURL=commonHelpers.js.map
