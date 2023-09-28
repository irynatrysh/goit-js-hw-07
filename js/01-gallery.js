import { galleryItems } from './gallery-items.js';

console.log(galleryItems);

const divRef = document.querySelector(".gallery");

function createGalleryMarkup(items) {
    return items
        .map(
            (item) =>
                `<div class="gallery__item">
            <a class="gallery__link" href="${item.original}">
            <img
            class="gallery__image"
            src="${item.preview}"
            data-source="${item.original}"
            alt="${item.description}"
            />
            </a></div>`
        )
        .join("");
}

const addGalleryMarkup = createGalleryMarkup(galleryItems);

divRef.innerHTML = addGalleryMarkup;
divRef.addEventListener("click", onImageClick);

function onImageClick(evt) {
    evt.preventDefault();

    if (evt.target.nodeName !== "IMG") {
        return;
    }
    const imgSource = evt.target.dataset.source;

    const modal = basicLightbox.create(
        `<img src="${imgSource}"
        width="800" height="600">`
    );

    modal.show();
    
    const handleKeyDownImage = (evt) => {
        if (evt.code !== 'Escape') return;
        
        modal.close();
        document.removeEventListener('keydown', handleKeyDownImage);
    };

    document.addEventListener('keydown', handleKeyDownImage);
}