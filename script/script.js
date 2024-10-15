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
function SendMail() {
	let pattern = /^[^ ]+@[^ ]+\.(?!ru$)[a-z]{2,3}$/;
	email_id = document.getElementById("inputEmail").value
	if (pattern.test(email_id)) {
		var params = {
			from_name : document.getElementById("inputName").value,
			email_id : document.getElementById("inputEmail").value,
			message : document.getElementById("inputMsg").value
		}
		emailjs.send("service_buzlf0w", "template_7cpkzx8", params).then(function (res) {
			alert("Повідомлення успішно відправлено, очікуйте на відповідь.");
		})
	}
	else {
		alert("Введіть коректну пошту!")
	}
}