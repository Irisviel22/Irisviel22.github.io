---
---

/* 
Copied from https://github.com/derekkedziora/jekyll-demo/blob/master/scripts/mode-switcher.js
https://github.com/derekkedziora/jekyll-demo
Creative Commons Attribution 4.0 International License
*/

let systemInitiatedDark = window.matchMedia("(prefers-color-scheme: dark)"); 
let theme = sessionStorage.getItem('theme');

const iconSun = "{{ site.baseurl }}/assets/img/sun.svg";
const iconMoon = "{{ site.baseurl }}/assets/img/moon.svg";


function changeIconImgSrc(src) {
	document.getElementById("theme-toggle-img").src = src;
	document.getElementById("theme-toggle-img--mobile").src = src;
}

// new

function setTheme(theme) {
	if (theme === "dark") {
		document.documentElement.setAttribute('data-theme', 'dark');
		sessionStorage.setItem('theme', 'dark');
		changeIconImgSrc(iconMoon);
	} else {
		document.documentElement.setAttribute('data-theme', 'light');
		sessionStorage.setItem('theme', 'light');
		changeIconImgSrc(iconSun);
	}
}

if (theme) {
	setTheme(theme); // 如果用户已经选择了主题，应用用户选择的主题
} else if (systemInitiatedDark.matches) {
	setTheme("dark"); // 如果用户没有选择主题但系统偏好暗色模式，则应用夜间模式
} else {
	setTheme("light"); // 默认应用日间模式
}

// old

// if (systemInitiatedDark.matches) {
// 	changeIconImgSrc(iconMoon);
// } else {
// 	changeIconImgSrc(iconSun);
// }

// function prefersColorTest(systemInitiatedDark) {
//   if (systemInitiatedDark.matches) {
//   	document.documentElement.setAttribute('data-theme', 'dark');		
//    	changeIconImgSrc(iconMoon);
//    	sessionStorage.setItem('theme', '');
//   } else {
//   	document.documentElement.setAttribute('data-theme', 'light');
//     changeIconImgSrc(iconSun);
//     sessionStorage.setItem('theme', '');
//   }
// }

// new

function prefersColorTest(systemInitiatedDark) {
	if (systemInitiatedDark.matches) {
		setTheme("dark");
	} else {
		setTheme("light");
	}
}

systemInitiatedDark.addListener(prefersColorTest);

//old

// function modeSwitcher() {
// 	let theme = sessionStorage.getItem('theme');
// 	if (theme === "dark") {
// 		document.documentElement.setAttribute('data-theme', 'light');
// 		sessionStorage.setItem('theme', 'light');
// 		changeIconImgSrc(iconSun);
// 	}	else if (theme === "light") {
// 		document.documentElement.setAttribute('data-theme', 'dark');
// 		sessionStorage.setItem('theme', 'dark');
// 		changeIconImgSrc(iconMoon);
// 	} else if (systemInitiatedDark.matches) {	
// 		document.documentElement.setAttribute('data-theme', 'light');
// 		sessionStorage.setItem('theme', 'light');
// 		changeIconImgSrc(iconSun);
// 	} else {
// 		document.documentElement.setAttribute('data-theme', 'dark');
// 		sessionStorage.setItem('theme', 'dark');
// 		changeIconImgSrc(iconMoon);
// 	}
// }

// if (theme === "dark") {
// 	document.documentElement.setAttribute('data-theme', 'dark');
// 	sessionStorage.setItem('theme', 'dark');
// 	changeIconImgSrc(iconMoon);
// } else if (theme === "light") {
// 	document.documentElement.setAttribute('data-theme', 'light');
// 	sessionStorage.setItem('theme', 'light');
// 	changeIconImgSrc(iconSun);
// }


// new
function modeSwitcher() {
	let currentTheme = sessionStorage.getItem('theme');
	if (currentTheme === "dark") {
		setTheme("light");
	} else {
		setTheme("dark");
	}
}