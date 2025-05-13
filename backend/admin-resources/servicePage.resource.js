import { ServicePage } from '../model/ServicePage.js'
import {duplicateAction} from "../actions/duplicateAction.js";
import uploadFeature from "@adminjs/upload";
import path, {dirname} from "path";
import {fileURLToPath} from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const ServicePageResource = (componentLoader) => {
    return {
        resource: ServicePage,
        features: [
            uploadFeature({
                componentLoader,
                provider: {
                    local: {
                        bucket: path.join(__dirname, '../public/uploads'),
                    },
                },
                properties: {
                    key: 'image',
                    file: 'uploadImage',
                    mimeType: 'imageMimeType',
                    filename: 'imageFilename',
                    filePath: 'imagePath',
                    filesToDelete: 'imageFilesToDelete',
                },
                uploadPath: (record, filename) => `service-page/${Date.now()}-${filename}`,
                validation: {
                    mimeTypes: ['image/png', 'image/jpeg'],
                    maxSize: 10 * 1024 * 1024,
                },
            }),
            uploadFeature({
                componentLoader,
                provider: {
                    local: {
                        bucket: path.join(__dirname, '../public/uploads'),
                    },
                },
                properties: {
                    key: 'previewImage',
                    file: 'uploadPreviewImage',
                    mimeType: 'previewMimeType',
                    filename: 'previewFilename',
                    filePath: 'previewPath',
                    filesToDelete: 'previewFilesToDelete',
                },
                uploadPath: (record, filename) => `service-page/preview-${Date.now()}-${filename}`,
                validation: {
                    mimeTypes: ['image/png', 'image/jpeg'],
                    maxSize: 10 * 1024 * 1024,
                },
            }),
        ],

        options: {
            navigation: 'Услуги',
            listProperties: ['title', 'slug', 'description'],
            editProperties: [
                'title',
                'description',
                'metaTitle',
                'metaDescription',
                'uploadImage',
                'uploadPreviewImage',
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
                'metaTitle',
                'metaDescription',
                'uploadImage',
                'image',
                'uploadPreviewImage',
                'previewImage',
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
                uploadImage: {
                    isVisible: { list: false, show: false, edit: true, filter: false },
                },
                image: {
                    isVisible: { list: true, show: true, edit: false, filter: false },
                },
                uploadPreviewImage: {
                    isVisible: { list: false, show: false, edit: true, filter: false },
                },
                previewImage: {
                    isVisible: { list: true, show: true, edit: false, filter: false },
                },
                slug: {
                    isTitle: true,
                },
                problems: { type: 'mixed', isArray: true, props: { max: 6 } },
                employees: { type: 'mixed', isArray: true },
                advantages: { type: 'mixed', isArray: true, props: { max: 6 } },
                mission: {
                    type: 'textarea',
                    isVisible: { list: false, show: true, edit: true, filter: false },
                    label: 'Юридическая информация',
                },
                missionCards: { type: 'mixed', isArray: true, props: { max: 6 } },
                recruitmentSteps: { type: 'mixed', isArray: true },
                resultSteps: { type: Array, props: { max: 6 } },
                faq: { type: 'mixed', isArray: true },
            },
            actions: {
                duplicate: duplicateAction,
            },
        },
    }
}
