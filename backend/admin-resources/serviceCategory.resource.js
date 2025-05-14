// admin/resources/service-category.resource.ts
import { ServiceCategory } from '../model/ServiceCategory.js';

export const serviceCategoryResource = {
    resource: ServiceCategory,
    options: {
        navigation: { name: 'Услуги' },
        sort: { sortBy: 'position', direction: 'asc' }, // ← сортировка по умолчанию
        listProperties: ['position', 'title', 'slug', 'showPage'],
        editProperties: ['position', 'title', 'slug', 'showPage', 'services', 'description', 'subtitle', 'metaTitle', 'metaDescription'],
        showProperties: ['position', 'title', 'slug', 'showPage', 'services', 'description', 'subtitle', 'metaTitle', 'metaDescription'],
        filterProperties: ['title', 'slug', 'showPage'],
        properties: {
            position: {
                isVisible: { list: true, show: true, edit: true, filter: false },
            },
            slug: { isTitle: true },
            services: {
                reference: 'ServicePage',
                isArray: true,
            },
        },
    },
};

