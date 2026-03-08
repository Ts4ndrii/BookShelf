import { test, expect } from '@playwright/test';
import path from 'path';

const getLocalUrl = (filename) => 'file:///' + path.resolve(filename).replace(/\\/g, '/');

test('Навігація: Перехід з головної сторінки на сторінку Історії', async ({ page }) => {
    await page.goto(getLocalUrl('index.html'));

    await expect(page).toHaveTitle(/Книги світу/);

    await page.click('a[href="history.html"].card-btn');

    await expect(page.locator('h1.history_title')).toHaveText('Книги, що змінили історію');
});

test('Форма: Заповнення контактної форми на сторінці Автора', async ({ page }) => {
    await page.goto(getLocalUrl('author.html'));

    await page.fill('#inputName', 'Андрій Ціпкайло');
    await page.fill('#inputEmail', 'test@ukr.net');
    await page.fill('#inputMsg', 'Тестовий текст  повідомлення.');

    page.on('dialog', async dialog => {
        expect(dialog.message()).toContain('Повідомлення успішно відправлено');
        await dialog.accept();
    });

    await page.click('.about_contact-btn');
});