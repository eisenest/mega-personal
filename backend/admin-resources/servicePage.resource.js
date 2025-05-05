import { ServicePage } from '../model/ServicePage.js'
import {duplicateAction} from "../actions/duplicateAction.js";

export const ServicePageResource = {
    resource: ServicePage,
    options: {
        navigation: 'Услуги',
        listProperties: ['title', 'slug', 'description'],
        editProperties: [
            'title',
            'description',
            'slug',
            'problems',
            'employees',
            'advantages',
            'mission',
            'missionCards',
            'recruitmentSteps',
            'resultSteps',
            'faq',
        ],
        showProperties: [
            'title',
            'description',
            'slug',
            'problems',
            'employees',
            'advantages',
            'mission',
            'missionCards',
            'recruitmentSteps',
            'resultSteps',
            'faq',
            'createdAt',
            'updatedAt'
        ],
        properties: {
            slug: {
                isTitle: true,
            },
            problems: {
                type: 'mixed',
                isArray: true,
                props: {
                    max: 6
                }
            },
            employees: {
                type: 'mixed',
                isArray: true
            },
            advantages: {
                type: 'mixed',
                isArray: true,
                props: {
                    max: 6
                }
            },
            mission: {
                type: 'textarea',
                isVisible: { list: false, show: true, edit: true, filter: false },
                label: 'Юридическая информация',
            },
            missionCards: {
                type: 'mixed',
                isArray: true,
                props: {
                    max: 6
                }
            },
            recruitmentSteps:{
                type: 'mixed',
                isArray: true,
            },
            resultSteps: {
                type: Array,
                props: {
                    max: 6
                }
            },
            faq: {
                type: 'mixed',
                isArray: true,
            },
        },
        actions: {
            duplicate: duplicateAction,
        },
    },
}
