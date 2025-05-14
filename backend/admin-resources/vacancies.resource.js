import { Vacancies } from '../model/Vacancies.js'
import { VacanciesFAQ } from '../model/Vacancies.js'
import { VacanciesReview } from '../model/Vacancies.js'
import { VacanciesPhotos } from '../model/Vacancies.js'
import uploadFeature from '@adminjs/upload'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const vacanciesResources = (componentLoader) => ([
    {
        resource: Vacancies,
        options: {
            navigation: { name: 'Вакансии', icon: 'UserCheck' },
            name: 'Открытые вакансии',
            sort: { sortBy: 'position', direction: 'asc' },
            listProperties: ['position', 'title', 'subtitle'],
            editProperties: ['position', 'title', 'subtitle', 'services'],
            properties: {
                position: {
                    isVisible: { list: true, show: true, edit: true, filter: false },
                },
                title: { label: 'Название' },
                subtitle: { label: 'Подзаголовок' },
                services: { label: 'Сферы', isArray: true },
            },
        },
    },
    {
        resource: VacanciesFAQ,
        options: {
            navigation: { name: 'Вакансии', icon: 'UserCheck' },
            name: 'FAQ',
            properties: {
                faq: {
                    label: 'Вопросы и ответы',
                    isArray: true,
                    type: 'mixed',
                    subProperties: [
                        { path: 'question', label: 'Вопрос' },
                        { path: 'answer', label: 'Ответ' }
                    ]
                },
                createdAt: { label: 'Создано' },
                updatedAt: { label: 'Обновлено' },
            },
        },
    },
    {
        resource: VacanciesReview,
        features: [
            uploadFeature({
                componentLoader,
                provider: { local: { bucket: path.join(__dirname, '../public/uploads') } },
                properties: {
                    key: 'image',
                    file: 'uploadImage',
                },
                uploadPath: (record, filename) => `users/${Date.now()}-${filename}`,
            })
        ],
        options: {
            navigation: { name: 'Вакансии', icon: 'UserCheck' },
            name: 'Отзывы сотрудников',
            sort: { sortBy: 'position', direction: 'asc' },
            listProperties: ['position', 'name', 'role', 'date'],
            editProperties: ['position', 'uploadImage', 'name', 'role', 'advantages', 'disadvantages', 'date'],
            properties: {
                position: {
                    isVisible: { list: true, show: true, edit: true, filter: false },
                },
                uploadImage: {
                    isVisible: {
                        list: false,
                        show: false,
                        edit: true,
                        filter: false,
                    },
                },
                image: {
                    isVisible: {
                        list: true,
                        show: true,
                        edit: false,
                        filter: false,
                    },
                },
                createdAt: { label: 'Создано' },
                updatedAt: { label: 'Обновлено' },
            },
        },
    },
    {
        resource: VacanciesPhotos,
        features: [
            uploadFeature({
                componentLoader,
                provider: { local: { bucket: path.join(__dirname, '../public/uploads') } },
                properties: {
                    key: 'image',
                    file: 'uploadImage',
                },
                uploadPath: (record, filename) => `employees/${Date.now()}-${filename}`,
            })
        ],
        options: {
            navigation: { name: 'Вакансии', icon: 'UserCheck' },
            name: 'Фотографии с работы',
            sort: { sortBy: 'position', direction: 'asc' },
            listProperties: ['position', 'image'],
            editProperties: ['position', 'uploadImage'],
            properties: {
                position: {
                    isVisible: { list: true, show: true, edit: true, filter: false },
                },
                uploadImage: {
                    isVisible: {
                        list: false,
                        show: false,
                        edit: true,
                        filter: false,
                    },
                },
                image: {
                    isVisible: {
                        list: true,
                        show: true,
                        edit: false,
                        filter: false,
                    },
                },
                createdAt: { label: 'Создано' },
                updatedAt: { label: 'Обновлено' },
            },
        },
    }
])
