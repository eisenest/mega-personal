import { PartnershipFAQ } from '../model/PartnershipFAQ.js';

export const partnershipFAQResource = {
    resource: PartnershipFAQ,
    options: {
        navigation: { name: 'Партнерская программа'},
        listProperties: ['_id', 'updatedAt'],
        editProperties: ['faq'],
        showProperties: ['faq', 'createdAt', 'updatedAt'],
        properties: {
            faq: {
                type: 'mixed',
                isArray: true,
            },
        },
    },
};
