export function isValidEmail(email) {
    const pattern = /^[^ ]+@[^ ]+\.(?!ru$)[a-z]{2,3}$/;
    return pattern.test(email);
}

export async function submitForm(email, message, emailApiService) {
    if (!isValidEmail(email)) {
        return { success: false, error: "Invalid email" };
    }
    
    try {
        await emailApiService.send(email, message);
        return { success: true };
    } catch (error) {
        return { success: false, error: "API Error" };
    }
}