"use strict";

typeOfDevice();
accordionFaq();
signUpForm();

// Preloader
window.onload = function () {
	document.body.classList.add('loaded_hiding');
	window.setTimeout(function () {
		document.body.classList.add('loaded');
		document.body.classList.remove('loaded_hiding');
	}, 100);
};

//Type of device
function typeOfDevice() {
	const isMobile = {
		Android: function () {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function () {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		ios: function () {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function () {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function () {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function () {
			return (
				isMobile.Android() ||
				isMobile.BlackBerry() ||
				isMobile.ios() ||
				isMobile.Opera() ||
				isMobile.Windows());
		}
	};
	if (isMobile.any()) {
		document.body.classList.add('_touch');
	
		let menuArrows = document.querySelectorAll('.menu__arrow');
		if (menuArrows.length > 0) {
			for (let index = 0; index < menuArrows.length; index++) {
				const menuArrow = menuArrows[index];
				menuArrow.addEventListener('click', function (e) {
					menuArrow.parentElement.classList.toggle('_active');
				});
			}
		}
	} else {
		document.body.classList.add('_pc');
	}
}

//Burger Menu
	const iconMenu = document.querySelector('.menu__icon');
	const menuBody = document.querySelector('.menu__body');
	const buttonMini = document.querySelector('.header__button_mini');
	
	if (iconMenu) {
		iconMenu.addEventListener("click", function (e) {
			document.body.classList.toggle('_lock');
			iconMenu.classList.toggle('_active');
			menuBody.classList.toggle('_active');
			buttonMini.classList.toggle('_active');
		});
	}

// Slider
const swiper = new Swiper('.directions-slider', {
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev'
	},

	autoHeight: false,
	slidesPerView: 3,
	spaceBetween: 30,
	watchOverflow: true,
	loop: true,
	speed: 800,
	breakpoints: {
		320: {
			slidesPerView: 1.3,
		},
		480: {
			slidesPerView: 2.3,
		},
		992: {
			slidesPerView: 3.3,
		},
		1440: {
			slidesPerView: 4.3,
		},
	},
	observer: true,
	observeParents: true,
	observeSlideChildren: true,
});


const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.pageYOffset - document.querySelector('header').offsetHeight;

			if (iconMenu.classList.contains('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}
			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}

// Scroll animation
function onEntry(entry) {
	entry.forEach(change => {
	  if (change.isIntersecting) {
		 change.target.classList.add('show-block');
	  }
	});
 }
 let options = { threshold: [0.5] };
 let observer = new IntersectionObserver(onEntry, options);
 let elements = document.querySelectorAll('.about, .teachers__item_1, .teachers__item_2, .teachers__item_3, .teachers__item_4, .teachers__item_6, .schedule__container, .faq, .sign-up__container');
 for (let elm of elements) {
	observer.observe(elm);
}

// FAQ
function accordionFaq() {
	const items = document.querySelectorAll(".accordion button");

	function toggleAccordion() {
		const itemToggle = this.getAttribute('aria-expanded');
	
		for (let i = 0; i < items.length; i++) {
			items[i].setAttribute('aria-expanded', 'false');
		}
			
		if (itemToggle == 'false') {
			this.setAttribute('aria-expanded', 'true');
			}
		}

		items.forEach(item => item.addEventListener('click', toggleAccordion));
}

// Form
function signUpForm() {
	const select = document.querySelector('.select');
	const selectValue = document.querySelector('.select_value');
	const selectDropdown = document.querySelector('.select_dropdown');

	selectDropdown.addEventListener('click', e => {
		const option = e.target.closest('.select_option');
		if (option) {
			selectValue.textContent = option.textContent;
			e.target.closest('.select').blur();
			select.dispatchEvent(new CustomEvent('change', { detail: option.textContent }));
		}
	});

	var phoneInput = document.querySelector(".user-box__phone");
	phoneInput.addEventListener("keydown", function (event) {
		if (
			!(
				event.key == "ArrowLeft" ||
				event.key == "ArrowRight" ||
				event.key == "Backspace" ||
				event.key == "Tab"
			)
		) {
			event.preventDefault();
		}
		
	var mask = "+(111) 111-111-111";
		if (/[0-9\+\ \-\(\)]/.test(event.key)) {
			var currentString = this.value;
			var currentLength = currentString.length;
			if (/[0-9]/.test(event.key)) {
				if (mask[currentLength] == "1") {
					this.value = currentString + event.key;
				} else {
					for (var i = currentLength; i < mask.length; i++) {
						if (mask[i] == "1") {
							this.value = currentString + event.key;
							break;
						}
						currentString += mask[i];
					}
				}
			}
		}
	});
}



