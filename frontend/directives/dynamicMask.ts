import type { Directive } from 'vue'

export const dynamicMask: Directive = {
    mounted(el, binding) {
        const mask = binding.value
        if (!mask) return

        const handleInput = (e: Event) => {
            const input = e.target as HTMLInputElement
            const raw = input.value.replace(/\W/g, '') // убираем всё, кроме букв и цифр
            let result = ''
            let rawIndex = 0

            for (let i = 0; i < mask.length && rawIndex < raw.length; i++) {
                const maskChar = mask[i]
                const rawChar = raw[rawIndex]

                if (maskChar === '#') {
                    if (/\d/.test(rawChar)) {
                        result += rawChar
                        rawIndex++
                    }
                } else if (maskChar === 'A') {
                    if (/[A-Za-zА-Яа-я]/.test(rawChar)) {
                        result += rawChar
                        rawIndex++
                    }
                } else {
                    result += maskChar
                }
            }

            // ✅ Только если форматирование что-то изменило
            if (input.value !== result) {
                input.value = result
                input.dispatchEvent(new Event('input', { bubbles: true }))
            }
        }

        el.addEventListener('input', handleInput)
    }
}
