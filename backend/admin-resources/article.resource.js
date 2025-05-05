import path from 'path'
import { Article } from '../model/Article.js'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { duplicateAction } from '../actions/duplicateAction.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const ArticleResource = {
    resource: Article,
    options: {
        navigation: 'Блог',
        properties: {
            content: {
                type: 'richtext', // ← вуаля, встроенный редактор
            },
            image: {
                components: {
                    edit: 'ImageUploadEditComponent', // ✅ правильно
                },
                custom: {
                    uploadDir: 'articles', // 👈 передаём нужную поддиректорию
                },
            },
        },
        actions: {
            duplicate: duplicateAction,
        },
    }
}
