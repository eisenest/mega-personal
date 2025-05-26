import type { Directive } from 'vue'

function formatDate(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 8)

    let result = ''
    if (digits.length >= 2) result += digits.slice(0, 2) + '.'
    else if (digits.length > 0) result += digits

    if (digits.length >= 4) result += digits.slice(2, 4) + '.'
    else if (digits.length > 2) result += digits.slice(2)

    if (digits.length > 4) result += digits.slice(4)

    return result
}

export const dateMask: Directive = {
    mounted(el: HTMLInputElement) {
        const handler = (e: Event) => {
            const input = e.target as HTMLInputElement
            input.value = formatDate(input.value)
            input.dispatchEvent(new Event('input', { bubbles: true }))
        }

        el.addEventListener('input', handler)
    }
}
