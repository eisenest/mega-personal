import path from 'path'
import { Article } from '../model/Article.js'
import uploadFeature from '@adminjs/upload'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const ArticleResource = (componentLoader) => {
    return {
        resource: Article,
        features: [
            uploadFeature({
                componentLoader, // ← обязательно передаём
                provider: {
                    local: {
                        bucket: path.join(__dirname, '../public/uploads'),
                    },
                },
                properties: {
                    key: 'image',  // куда сохраняется путь в Mongo
                    file: 'uploadImage', // имя поля input[type=file]
                },
                uploadPath: (record, filename) => `articles/${Date.now()}-${filename}`,
                validation: {
                    mimeTypes: ['image/png', 'image/jpeg'],
                    maxSize: 10 * 1024 * 1024, // 10MB
                },
            }),
        ],
        options: {
            properties: {
                content: {
                    type: 'richtext', // ← вуаля, встроенный редактор
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
                        edit: false, // путь не редактируется руками
                        filter: false,
                    },
                },
            },
        }
    }
}
