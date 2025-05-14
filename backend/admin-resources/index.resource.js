import path from 'path'
import { fileURLToPath } from 'url'
import uploadFeature from '@adminjs/upload'
import {
    IndexClient,
    IndexAdvantage,
    IndexReview,
    IndexKeyNumber,
    IndexCase
} from '../model/Index.js'
import { duplicateAction } from '../actions/duplicateAction.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const IndexPageResources = (componentLoader) => ([
    {
        resource: IndexKeyNumber,
        options: {
            navigation: 'Главная',
            sort: { sortBy: 'position', direction: 'asc' },
            listProperties: ['position', 'number', 'description'],
            editProperties: ['position', 'number', 'description'],
            properties: {
                position: {
                    isVisible: { list: true, show: true, edit: true, filter: false },
                },
            },
            actions: {
                new: { isAccessible: async () => (await IndexKeyNumber.countDocuments()) === 6 },
                duplicate: duplicateAction,
            }
        }
    },
    {
        resource: IndexAdvantage,
        features: [
            uploadFeature({
                componentLoader,
                provider: { local: { bucket: path.join(__dirname, '../public/uploads') } },
                properties: {
                    key: 'image',
                    file: 'uploadImage',
                },
                uploadPath: (record, filename) => `advantages/${Date.now()}-${filename}`,
            })
        ],
        options: {
            navigation: 'Главная',
            sort: { sortBy: 'position', direction: 'asc' },
            listProperties: ['position', 'title', 'slug'],
            editProperties: ['position', 'title', 'slug', 'uploadImage', 'thesis'],
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
                thesis: {
                    isArray: true,
                    props: {
                        max: 4,
                    },
                },
            },
            actions: {
                duplicate: duplicateAction,
            },
        },
    },
    {
        resource: IndexClient,
        features: [
            uploadFeature({
                componentLoader,
                provider: { local: { bucket: path.join(__dirname, '../public/uploads') } },
                properties: {
                    key: 'image',
                    file: 'uploadImage',
                },
                uploadPath: (record, filename) => `clients/${Date.now()}-${filename}`,
            })
        ],
        options: {
            navigation: 'Главная',
            sort: { sortBy: 'position', direction: 'asc' },
            listProperties: ['position', 'image', 'url'],
            editProperties: ['position', 'uploadImage', 'url'],
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
            },
            actions: {
                duplicate: duplicateAction,
            },
        }
    },
    {
        resource: IndexReview,
        features: [
            uploadFeature({
                componentLoader,
                provider: { local: { bucket: path.join(__dirname, '../public/uploads') } },
                properties: {
                    key: 'image',
                    file: 'uploadImage',
                },
                uploadPath: (record, filename) => `reviews/${Date.now()}-${filename}`,
            })
        ],
        options: {
            navigation: 'Главная',
            sort: { sortBy: 'position', direction: 'asc' },
            listProperties: ['position', 'company', 'person', 'role'],
            editProperties: ['position', 'uploadImage', 'company', 'person', 'role', 'text'],
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
            },
            actions: {
                duplicate: duplicateAction,
            },
        }
    },
    {
        resource: IndexCase,
        options: {
            navigation: 'Главная',
            sort: { sortBy: 'position', direction: 'asc' },
            listProperties: ['position', 'title'],
            editProperties: ['position', 'title', 'task', 'decision', 'summary'],
            properties: {
                position: {
                    isVisible: { list: true, show: true, edit: true, filter: false },
                },
                task: { type: 'richtext' },
                decision: { type: 'richtext' },
                summary: { type: 'richtext' },
            },
            actions: {
                duplicate: duplicateAction,
            },
        },
    }
])
