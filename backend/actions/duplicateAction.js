export const duplicateAction = {
    actionType: 'record',
    icon: 'Copy',
    guard: 'Вы уверены, что хотите дублировать эту запись?',
    isVisible: true,
    component: false, // ← ключевая строка

    handler: async (request, response, context) => {
        const { record, h, resource, currentAdmin } = context
        if (!record) throw new Error('Запись не найдена')

        try {
            const data = record.toJSON()
            delete data._id
            delete data.id

            const timestamp = Date.now()

            if (typeof data.slug === 'string' && data.slug.length > 0) {
                data.slug = `${data.slug}-copy-${timestamp}`
            } else {
                const fallback = data.title || 'article'
                data.slug = `${fallback.toString().toLowerCase().replace(/\s+/g, '-')}-copy-${timestamp}`
            }

            if (data.title) {
                data.title = `${data.title} (копия)`
            }

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
    }

}
