import type { Directive } from 'vue'

function formatPhone(value: string): string {
    // Удаляем все, кроме цифр
    const digits = value.replace(/\D/g, '')

    // Убираем первую 8 или 7, если есть
    const clean = digits.replace(/^7|8/, '')

    let result = '+7'

    if (clean.length > 0) result += ' (' + clean.substring(0, 3)
    if (clean.length >= 4) result += ') ' + clean.substring(3, 6)
    if (clean.length >= 7) result += '-' + clean.substring(6, 8)
    if (clean.length >= 9) result += '-' + clean.substring(8, 10)

    return result
}

export const phoneMask: Directive = {
    mounted(el: HTMLInputElement) {
        el.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement
            target.value = formatPhone(target.value)
            // генерируем событие для v-model
            target.dispatchEvent(new Event('input'))
        })
    }
}
