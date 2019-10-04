const boxCard = document.getElementsByClassName('gallery__box-cards_js')[0];
const gallery = [
   { id: 0, comment: "0", url: 'https://ispolnu.ru/uploads/services/20180403/1522733306cdab.jpg' },
   { id: 1, comment: "1", url: 'https://icons-for-free.com/iconfiles/png/512/logo+react+react+js+icon-1320184811840217251.png' },
   { id: 2, comment: "2", url: 'https://ispolnu.ru/uploads/services/20180403/1522733306cdab.jpg' },
   { id: 3, comment: "3", url: 'https://icons-for-free.com/iconfiles/png/512/logo+react+react+js+icon-1320184811840217251.png' },
   { id: 4, comment: "4", url: 'https://ispolnu.ru/uploads/services/20180403/1522733306cdab.jpg' },
   { id: 5, comment: "5", url: 'https://icons-for-free.com/iconfiles/png/512/logo+react+react+js+icon-1320184811840217251.png' },
];


function createCard() {
   let card = document.createElement('div');
   let img = document.createElement('img');
   let boxComment = document.createElement('div');
   let comment = document.createElement('p');
   let input = document.createElement('textarea');
   let close = document.createElement('div');

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
   card.insertAdjacentElement('beforeend', close);
   return card, img, boxComment, comment, input, close;
}




function createCardPhoto() {
   gallery.map(photo => {
      let card = document.createElement('div');
      let img = document.createElement('img');
      let boxComment = document.createElement('div');
      let comment = document.createElement('p');
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

      comment.onclick = () => {
         input.value = photo.comment;
         input.classList.add('gallery__input-change_active');
      }

      input.onkeydown = e => {
         if (e.keyCode == 13) {
            comment.innerHTML = input.value;
            photo.comment = input.value;
            input.classList.remove('gallery__input-change_active');
         }
         if (e.keyCode == 27) input.classList.remove('gallery__input-change_active');
      }

      close.onclick = () => {
         for (let i = 0; i < gallery.length; i++) {
            if (photo.id === gallery[i].id) {
               gallery.splice(i, 1);
               card.remove();
            }
         }
      }

   })
}
createCardPhoto();