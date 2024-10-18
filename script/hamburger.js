// Hamburger menu
const menu_btn = document.querySelector(".hamburger");
const menu = document.querySelector(".mobile_nav");
menu_btn.addEventListener('click', function() {
	menu_btn.classList.toggle('is-active');
	menu.classList.toggle('is-active');


});