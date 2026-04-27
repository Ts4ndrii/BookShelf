// Hamburger menu
const menu_btn = document.querySelector(".hamburger");
const menu = document.querySelector(".mobile_nav");
menu_btn.addEventListener('click', function() {
	menu_btn.classList.toggle('is-active');
	menu.classList.toggle('is-active');

	posthog.capture('hamburger_clicked', {
		category: 'navigation',
		element: 'hamburger_menu',
		is_active: menu.classList.contains('is-active') // передаємо статус: відкрили чи закрили меню
	});


});