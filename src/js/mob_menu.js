const menu = document.querySelector('.backdrop');
const openMenuBtn = document.querySelector('.burger-menu-wrap');
const closeMenuBtn = document.querySelector('.menu-close-btn');

const openMenu = () => {
  menu.classList.add('is-open');
};

const closeMenu = () => {
  menu.classList.remove('is-open');
};

openMenuBtn.addEventListener('click', openMenu);
closeMenuBtn.addEventListener('click', closeMenu);
