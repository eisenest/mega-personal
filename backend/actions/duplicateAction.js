export const duplicateAction = {
    actionType: 'record',
    icon: 'Copy',
    guard: 'Вы уверены, что хотите дублировать эту запись?',
    isVisible: true,
    component: false, // стандартный компонент, без кастомного UI

    handler: async (request, response, context) => {
        const { record, h, resource, currentAdmin } = context
        if (!record) throw new Error('Запись не найдена')

        try {
            // ✅ Получаем все поля как есть
            const data = { ...record.params }

            // ❌ Удаляем технические поля
            delete data._id
            delete data.id
            delete data.createdAt
            delete data.updatedAt
            delete data.uploadImage // поле input[type=file], не нужно копировать

            // 🔁 Генерим новый slug
            const timestamp = Date.now()
            if (typeof data.slug === 'string' && data.slug.length > 0) {
                data.slug = `${data.slug}-copy-${timestamp}`
            } else {
                const fallback = data.title || 'article'
                data.slug = `${fallback.toString().toLowerCase().replace(/\s+/g, '-')}-copy-${timestamp}`
            }

            // ✏️ Добавим пометку "(копия)" к заголовку, если есть
            if (data.title) {
                data.title = `${data.title} (копия)`
            }

            // 🧪 Можно залогировать для отладки
            // console.log('📋 Дублируем запись с полями:', data)

            const newDoc = await resource.create(data)
            const newRecord = resource.build(newDoc)

            return {
                record: newRecord.toJSON(currentAdmin),
                redirectUrl: h.recordActionUrl({
                    resourceId: resource._decorated?.id?.() || resource.id(),
                    recordId: newRecord.id(),
                    actionName: 'edit',
                }),
                notice: {
                    message: 'Запись успешно продублирована',
                    type: 'success',
                },
            }
        } catch (error) {
            console.error('❌ Ошибка при дублировании:', error)
            return {
                notice: {
                    message: `Ошибка при создании: ${error.message}`,
                    type: 'error',
                },
            }
        }
    },
}
