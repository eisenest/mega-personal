import { ContactInfo } from '../model/ContactInfo.js'

export const ContactInfoResource = {
    resource: ContactInfo,
    options: {
        navigation: 'Контакты',
        properties: {
            legalInfo: {
                type: 'textarea',
                isVisible: { list: false, show: true, edit: true, filter: false },
                label: 'Юридическая информация',
            },
            mapEmbedUrl: {
                type: 'textarea',
                isVisible: { list: false, show: true, edit: true, filter: false },
                label: 'Карта (iframe)',
            },
        },
        actions: {
            new: { isAccessible: true }, // запрещаем создавать новые записи
            delete: { isAccessible: true }, // запрещаем удаление
        },
    },
}
