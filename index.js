'use strict';

const TITLE_VALIDATION_LENGTH = 100;
const TEXT_VALIDATION_LENGTH = 300;

const postTitleInputNode = document.querySelector('.js-post-title__input');
const postTextInputNode = document.querySelector('.js-post-text__input');
const newPostBtnNode = document.querySelector('.js-new-post__btn');
const postsNode = document.querySelector('.js-posts');
const postsPlaceholder = document.getElementById('js-posts__placeholder');
const postsDate = document.querySelector('.posts__date');
const symbolCount = document.getElementById('symbolCount');
const formValidation = document.getElementById('errorMessage');

const posts = [];

validation();

newPostBtnNode.addEventListener('click', function (e) {
  e.preventDefault();

  const postFromUser = getPostFromUser();

  addPost(postFromUser);

  renderPost();

  clearInputs();
});

postTitleInputNode.addEventListener('input', validation);
postTextInputNode.addEventListener('input', validation);

postTitleInputNode.addEventListener('input', function () {
  validation();
  symbolCount.innerText = `Длина текста ${postTitleInputNode.value.length}`;
});
postTextInputNode.addEventListener('input', function () {
  validation();
  symbolCount.innerText = `Длина текста ${postTextInputNode.value.length}`;
});

function validation() {
  if (postTitleInputNode.value.length > TITLE_VALIDATION_LENGTH) {
    formValidation.innerText = `Длина заголовка не должна привышать ${TITLE_VALIDATION_LENGTH} символов`;
    newPostBtnNode.disabled = true;
  } else if (postTextInputNode.value.length > TEXT_VALIDATION_LENGTH) {
    formValidation.innerText = `Длина поста не должна привышать ${TEXT_VALIDATION_LENGTH} символов`;
    newPostBtnNode.disabled = true;
  } else if (
    !postTitleInputNode.value.length ||
    !postTextInputNode.value.length
  ) {
    formValidation.innerText = 'Поля ввода не могут быть пустыми';
    newPostBtnNode.disabled = true;
  } else {
    newPostBtnNode.disabled = false;
    formValidation.innerText = '';
  }
}

function getPostFromUser() {
  const title = postTitleInputNode.value;
  const text = postTextInputNode.value;

  // создаем локальную дату и время
  let date = new Date();

  date = new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(date);

  return {
    title,
    text,
    date,
  };
}

function addPost({ title, text, date }) {
  posts.push({
    title,
    text,
    date,
  });
}

function getPosts() {
  return posts;
}

function renderPost() {
  const posts = getPosts();

  let postsHTML = ``;

  posts.forEach(post => {
    postsHTML += `
    <div class="posts__item">
        <div class="posts__date">${post.date}</div>
        <p class="post__title">${post.title}</p>
        <p class="post__text">${post.text}</p>
    </div>
    `;
  });
  postsNode.innerHTML = postsHTML;
}

function clearInputs() {
  postTextInputNode.value = '';
  postTitleInputNode.value = '';
  //   formValidation.innerText = '';
}
