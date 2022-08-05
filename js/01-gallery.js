import { galleryItems } from './gallery-items.js';
// Change code below this line
const galleryRefs = document.querySelector(".gallery");
galleryRefs.insertAdjacentHTML('beforeend',createGalleryMarkup(galleryItems));
galleryRefs.addEventListener('click', onGalleryItemClick);
let  instance;

function createGalleryMarkup ( images){
    return images
      .map(({preview, original, description}) =>
        `<div class="gallery__item">
          <a class="gallery__link" href="${original}">
             <img
             class="gallery__image"
             src="${preview}"
             data-source="${original}"
             alt="${description}"
             />
         </a>
        </div>
        `)
        .join('');

}

function onGalleryItemClick(evt){
    evt.preventDefault();
    if(evt.target.nodeName !== "IMG"){
        return
    }
    onOpenModal(evt);
}

function onOpenModal(evt){
    instance = basicLightbox.create(
        `<img src="${evt.target.dataset.source}">`,
        {
          onShow: (instance) => {
            window.addEventListener("keydown", onEscKeyPress);
          },
          onClose: (instance) => {
            window.removeEventListener("keydown", onEscKeyPress);
          },
        }
      );
      instance.show();
    }

function onCloseModal() {
    instance.close();
}
function onEscKeyPress(evt) {
    if (evt.code === "Escape") {
        onCloseModal();
    }
  }