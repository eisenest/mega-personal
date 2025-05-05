import { About } from '../model/About.js';

export const aboutResource = {
    resource: About,
    options: {
        navigation: { name: 'О компании', icon: 'Information' },
        listProperties: ['_id', 'updatedAt'],
        editProperties: ['keyNumber', 'services'],
        showProperties: ['keyNumber', 'services', 'createdAt', 'updatedAt'],
        properties: {
            keyNumber: {
                type: 'mixed',
                isArray: true,
            },
            services: {
                type: 'string',
                isArray: true,
            },
        },
    },
};
