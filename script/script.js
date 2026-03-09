// Email check
const input = document.querySelector(".inputEmail"),
emailIcon = document.querySelector(".email-icon")
input.addEventListener("keyup", () =>{
	let pattern = /^[^ ]+@[^ ]+\.(?!ru$)[a-z]{2,3}$/;
	if(input.value === "")
	{
		emailIcon.classList.replace("uil-check-circle", "uil-envelope");
		return emailIcon.style.color = "#b4b4b4";
	}
	if(input.value.match(pattern))
	{
		emailIcon.classList.replace("uil-envelope", "uil-check-circle");
		return emailIcon.style.color = "#4bb543"
	}
	emailIcon.classList.replace("uil-check-circle", "uil-envelope");
	emailIcon.style.color = "#de0611"
})

// Email form sending
// eslint-disable-next-line no-unused-vars
function SendMail() {
	let pattern = /^[^ ]+@[^ ]+\.(?!ru$)[a-z]{2,3}$/;
	let email_id = document.getElementById("inputEmail").value
	if (pattern.test(email_id)) {
		var params = {
			from_name : document.getElementById("inputName").value,
			email_id : document.getElementById("inputEmail").value,
			message : document.getElementById("inputMsg").value
		}
		emailjs.send("service_buzlf0w", "template_7cpkzx8", params).then(function () {
			alert("Повідомлення успішно відправлено, очікуйте на відповідь.");
		})
	}
	else {
		alert("Введіть коректну пошту!")
	}
}

//Video toggle
const video = document.querySelector(".video_box");
const videoBtn = document.querySelector(".video_btn");

videoBtn.addEventListener("click", function () {
	video.classList.toggle("is-active");
})

document.addEventListener("DOMContentLoaded", () => {
    const statusElement = document.getElementById("app-status");
    if (statusElement) {
        // Vite підставляє значення з .env під час збірки або запуску
        statusElement.textContent = `Статус: ${import.meta.env.VITE_APP_STATUS}`;
    }
});