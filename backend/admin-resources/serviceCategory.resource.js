// admin/resources/service-category.resource.ts
import { ServiceCategory } from '../model/ServiceCategory.js';

// ✅ Рабочий вариант для JS-файла
export const serviceCategoryResource = {
    resource: ServiceCategory,
    options: {
        navigation: { name: 'Услуги' },
        listProperties: ['title', 'slug', 'showPage'],
        editProperties: ['title', 'slug', 'showPage', 'services', 'description', 'subtitle', 'metaTitle', 'metaDescription'],
        showProperties: ['title', 'slug', 'showPage', 'services', 'description', 'subtitle', 'metaTitle', 'metaDescription'],
        filterProperties: ['title', 'slug', 'showPage'],
        properties: {
            slug: { isTitle: true },
            services: {
                reference: 'ServicePage',
                isArray: true,
            },
        },
    },
};

