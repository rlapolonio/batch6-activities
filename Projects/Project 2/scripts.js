window.addEventListener('scroll', function() {
    let header = document.querySelector('.header');
    let windowPosition = window.scrollY > 0;
    header.classList.toggle('scrolling-active', windowPosition);
    header.classList.toggle('scrolling-activeQ', windowPosition);
})

const hamburger = document.getElementById('hamburger');
const burgerMenu = document.getElementById('burger-menu');

hamburger.addEventListener('click', () => {
    burgerMenu.classList.toggle('show');
});