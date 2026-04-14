import { describe, it, expect, vi } from 'vitest';
import { isValidEmail, submitForm } from './utils.js';

describe('Бізнес-логіка: Валідація Email', () => {
    // Test 1
    it('коректно пропускає правильний email', () => {
        expect(isValidEmail('test@gmail.com')).toBe(true);
    });

    // Test 2
    it('повертає false для email без символу @', () => {
        expect(isValidEmail('testgmail.com')).toBe(false);
    });

    // Test 3
    it('повертає false для email без домену', () => {
        expect(isValidEmail('test@gmail')).toBe(false);
    });

    // Test 4
    it('блокує поштові скриньки з доменом .ru', () => {
        expect(isValidEmail('ivan@mail.ru')).toBe(false);
    });

    // Test 5
    it('повертає false для порожнього рядка', () => {
        expect(isValidEmail('')).toBe(false);
    });

    // Test 6
    it('повертає false, якщо email містить пробіли', () => {
        expect(isValidEmail('te st@gmail.com')).toBe(false);
    });
});

describe('Бізнес-логіка: Відправка форми (Mocking)', () => {
    // Test 7: Використання Mock-об'єкта
    it('успішно відправляє форму через Mock API, якщо email валідний', async () => {
        const mockEmailService = {
            send: vi.fn().mockResolvedValue("Success") 
        };

        const result = await submitForm('user@ukr.net', 'Привіт!', mockEmailService);

        expect(result.success).toBe(true);
        expect(mockEmailService.send).toHaveBeenCalledTimes(1);
        expect(mockEmailService.send).toHaveBeenCalledWith('user@ukr.net', 'Привіт!');
    });
});