import posthog from 'posthog-js'
import * as Sentry from "@sentry/browser";

Sentry.init({
  	dsn: "https://2b966455ebaf1f03c5e0c6f5ef67287b@o4511290805846016.ingest.de.sentry.io/4511290808205392",
  	integrations: [
		Sentry.browserTracingIntegration(),
		Sentry.replayIntegration(),
	],
	// Tracing: Записувати 100% транзакцій для моніторингу продуктивності.
	// У продакшені рекомендується зменшити це значення (наприклад, до 0.1), щоб зберегти ресурси.
	tracesSampleRate: 1.0,

	replaysOnErrorSampleRate: 1.0, // Записувати всі сесії, які призводять до помилок
	replaysSessionSampleRate: 0.1, // Записувати 10% всіх сесій для загального моніторингу

	environment: "development", // Змініть на "production" при релізі
  sendDefaultPii: true
});

posthog.init('phc_ygQvS6fEFPqTHqTef3okYXxPsUoJFYXbVcVf5ELqarSf', {
    api_host: 'https://eu.i.posthog.com',
    defaults: '2026-01-30'
})

// Email check
const input = document.querySelector(".inputEmail"),
emailIcon = document.querySelector(".email-icon")
if (input && emailIcon) {
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
}

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

			posthog.capture('message_sent', {
                category: 'contact_form',
                priority: 'high',
                has_name: params.from_name !== "" // Перевіряємо, чи ввів користувач ім'я
            });
		})
	}
	else {
		alert("Введіть коректну пошту!")
	}
}
window.SendMail = SendMail;

//Video toggle
const video = document.querySelector(".video_box");
const videoBtn = document.querySelector(".video_btn");

if (videoBtn && video) {
	videoBtn.addEventListener("click", function () {
		video.classList.toggle("is-active");

		posthog.capture('video_toggled', {
				category: 'engagement',
				is_active: video.classList.contains("is-active") // передаємо статус: відкрили чи закрили
			});
	})

	document.addEventListener("DOMContentLoaded", () => {
		const statusElement = document.getElementById("app-status");
		if (statusElement) {
			statusElement.textContent = `Статус: ${import.meta.env.VITE_APP_STATUS}`;
		}
	});
}

posthog.onFeatureFlags(() => {
    const videoBtn = document.querySelector(".video_btn");
    
    if (videoBtn) {
        if (posthog.isFeatureEnabled('show-video-feature')) {
            videoBtn.style.display = 'block';
        } else {
            videoBtn.style.display = 'none';
        }
    }
});

// Test button to trigger an error for Sentry
function breakWorld() {
	throw new Error("Sentry Test Error: Something went wrong!");
}