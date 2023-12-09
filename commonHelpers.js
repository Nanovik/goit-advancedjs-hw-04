import{a as L,n as d,i as a,S as v}from"./assets/vendor-eea3fddd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();async function f(s,t){const r="https://pixabay.com/api/",n="37675395-9e31173c5a3e62573866f9f7d",e={key:n,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:40,page:t};return await L.get(`${r}?key=${n}&q=${s}&per_page=40&image_type=photo&orientation=horizontal&safesearch=true&page=${t}`,e)}let l=1;const u=document.querySelector(".load-more"),p=document.querySelector(".gallery"),h=document.querySelector(".search-form");h.addEventListener("submit",_);function c(){u.classList.add("hidden-btn")}function _(s){s.preventDefault(),p.innerHTML="",c();const t=s.target.elements.searchQuery.value;t.trim().length?(localStorage.setItem("currentRequest",t),f(t,l=1).then(r=>{if(!r.data.hits.length)throw new Error(a.error({message:"Sorry, there are no images matching your search query. Please try again.",position:"topRight",timeout:4e3,closeOnClick:!0}));a.info({message:`Hooray! We found ${r.data.totalHits} images.`,position:"topRight",timeout:5e3,closeOnClick:!0}),m(r.data.hits),r.data.hits.length<40?(c(),setTimeout(()=>{d.Notify.info("We're sorry, but you've reached the end of search results.")},2e3)):u.classList.remove("hidden-btn")}).catch(r=>console.log(r))):d.Notify.failure("Please fill out the search field."),h.reset()}function m(s){const t=s.map(({webformatURL:n,largeImageURL:e,tags:o,likes:i,views:g,comments:y,downloads:b})=>`
      <div class="photo-card">
        <a href="${e}" class="gallery__link">
            <img src="${n}" alt="${o}" loading="lazy" class="gallery__image" width="300"/>
            <div class="info">
                <p class="info-item">
                <b>Likes</b> <span>${i}&nbsp</span>
                </p>
                <p class="info-item">
                <b>Views</b> <span>${g}&nbsp</span>
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
    `).join("");p.insertAdjacentHTML("beforeend",t),new v(".gallery a").refresh()}u.addEventListener("click",$);function $(){l+=1;const s=localStorage.getItem("currentRequest");f(s,l).then(t=>{m(t.data.hits),t.data.hits.length<40&&(c(),setTimeout(()=>{a.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight",timeout:4e3,closeOnClick:!0})},2e3))}).catch(t=>console.log(t))}
//# sourceMappingURL=commonHelpers.js.map
