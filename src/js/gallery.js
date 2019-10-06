const
   gallerySection = document.getElementsByClassName('gallery_js')[0],
   boxCard = gallerySection.getElementsByClassName('gallery__box-cards_js')[0],
   inputUrl = gallerySection.getElementsByClassName('gallery__input_url_js')[0],
   inputComment = gallerySection.getElementsByClassName('gallery__input_comment_js')[0],
   btnAddPost = gallerySection.getElementsByClassName('gallery__btn_add-post_js')[0],
   modalAddPost = gallerySection.getElementsByClassName('gallery__modal_js')[0],
   openModal = gallerySection.getElementsByClassName('gallery__btn_open-modal')[0],
   bigImg = gallerySection.getElementsByClassName('gallery__img-big_js')[0],
   modalBigImg = gallerySection.getElementsByClassName('gallery__modal-big-img_js')[0];


// создать локальное хранилище с key 'gallery' если его ещё нет
if (!localStorage.getItem("gallery")) {
   let galleryDefault = [
      { id: 'photo1570296458531', comment: "tree on a background of stars", url: 'https://2i.by/wp-content/uploads/2015/07/miniatyura1.jpg' },
      { id: 'photo1570296458533', comment: "stars in the sky", url: 'https://cdn-st1.rtr-vesti.ru/vh/pictures/hd/172/806/8.jpg' },
      { id: 'photo1570296458534', comment: "field with spikelets", url: 'https://i.ytimg.com/vi/-6PdUhK1q3E/maxresdefault.jpg' },
      { id: 'photo1570296458535', comment: "trees in the field", url: 'https://bigpicture.ru/wp-content/uploads/2011/06/1309.jpg' },
      { id: 'photo1570296458536', comment: "road in the field", url: 'https://cs8.pikabu.ru/post_img/big/2017/12/24/6/1514109360155876505.jpg' },
      { id: 'photo1570296458537', comment: "mountains on the background of stars", url: 'https://spacegid.com/wp-content/uploads/2015/04/IMG_0531-1024x683.jpg' },
      { id: 'photo1570296458538', comment: "stars in the sky", url: 'https://cdn-st1.rtr-vesti.ru/vh/pictures/hd/172/806/8.jpg' },
      { id: 'photo1570296458539', comment: "field with spikelets", url: 'https://i.ytimg.com/vi/-6PdUhK1q3E/maxresdefault.jpg' },
   ];
   localStorage.setItem("gallery", JSON.stringify(galleryDefault));
}
// получить данные с локального хранилища и распарсить
const gallery = JSON.parse(localStorage.getItem('gallery'));

// на основе массива объектов gallery создаёт карточки с изображениями
// и присваивает им события
function createCardsPhoto() {
   gallery.map(photo => {
      let card = document.createElement('div');
      let img = document.createElement('img');
      let boxComment = document.createElement('div');
      let comment = document.createElement('div');
      let input = document.createElement('textarea');
      let close = document.createElement('div');

      card.id = photo.id;
      img.src = photo.url;
      comment.innerHTML = photo.comment;

      close.innerHTML = '&times;';

      card.classList.add('gallery__card');
      img.classList.add('gallery__img');
      boxComment.classList.add('gallery__box-comment');
      comment.classList.add('gallery__comment');
      input.classList.add('gallery__input-change');
      close.classList.add('gallery__close');

      card.insertAdjacentElement('beforeend', img);
      boxComment.insertAdjacentElement('beforeend', comment);
      boxComment.insertAdjacentElement('beforeend', input);
      card.insertAdjacentElement('beforeend', boxComment);
      boxCard.insertAdjacentElement('beforeend', card);
      card.insertAdjacentElement('beforeend', close);

      boxComment.onclick = () => {
         input.value = photo.comment;
         input.classList.add('gallery__input-change_active');
      }
      // следить за input
      input.onkeydown = e => {
         // enter
         if (e.keyCode == 13) {
            comment.innerHTML = input.value;
            photo.comment = input.value;
            console.log(gallery);
            rewritingLocalStorage();
            input.classList.remove('gallery__input-change_active');
         }
         //esc
         else if (e.keyCode == 27) input.classList.remove('gallery__input-change_active');
      }
      // 'покинул' input
      input.onblur = () => input.classList.remove('gallery__input-change_active');
      // удалить карточку с изображением
      close.onclick = () => {
         for (let i = 0; i < gallery.length; i++) {
            if (photo.id === gallery[i].id) {
               gallery.splice(i, 1);
               rewritingLocalStorage();
               card.remove();
            }
         }
      }
      // увеличить
      img.onclick = () => {
         modalBigImg.classList.add('gallery__modal-big-img_active');
         bigImg.src = photo.url;
      }
   })
}


// скрыть модальное окно по клику вне изображения
modalBigImg.addEventListener("click", e => {
   if (e.target == modalBigImg) {
      modalBigImg.classList.remove('gallery__modal-big-img_active');
   }
})
// генерация ID
function idGeneration() {
   return `photo${+new Date}`;
}

// отчистить локальное хранилище
function rewritingLocalStorage() {
   localStorage.clear("gallery");
   localStorage.setItem("gallery", JSON.stringify(gallery));
}

// открыть модальное окно в котором можно добавить изображение
openModal.onclick = () => {
   modalAddPost.classList.add('gallery__modal_active');
   // по умолчанию в инпуте будет ссылка на картинку
   inputUrl.value = 'https://cs8.pikabu.ru/post_img/big/2017/12/24/6/1514109360155876505.jpg';
}

modalAddPost.onclick = e => {
   if (e.target == modalAddPost) {
      hiddenModalAddPost();
   }
}


// 'опубликовать' новое изображения
btnAddPost.onclick = () => {
   addNewItenGallery();
   rewritingLocalStorage();
   deleteCards();
   createCardsPhoto();
   clearInput();
   hiddenModalAddPost();
}

function hiddenModalAddPost() {
   modalAddPost.classList.remove('gallery__modal_active');
}
// добавляет объект изображения в массив изображений
function addNewItenGallery() {
   let newItemGallery = {
      id: idGeneration(),
      comment: `${inputComment.value}`,
      url: `${inputUrl.value}`,
   };
   gallery.push(newItemGallery);
}

// удалить все карточки
function deleteCards() {
   boxCard.innerHTML = "";
}
// почистить инпуты в модальном окне
function clearInput() {
   inputUrl.value = '';
   inputComment.value = '';
}

createCardsPhoto(); 
