import React from 'react'

const ImageUploadEditComponent = (props) => {
    const { record, property, onChange } = props

    const uploadedUrl = record?.params?.[property.name]
    const uploadDir = property?.custom?.uploadDir || ''


    const handleUpload = async (event) => {
        const file = event.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)
        formData.append('dir', uploadDir) // 👈 передаём на сервер

        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        })

        const result = await response.json()
        if (result?.url) {
            onChange(property.name, result.url)
        } else {
            alert('Ошибка при загрузке файла')
        }
    }

    return (
        <div>
            {uploadedUrl && (
                <div style={{ marginBottom: '1rem' }}>
                    <strong>Текущее изображение:</strong><br />
                    <img src={uploadedUrl} alt="Uploaded" style={{ maxWidth: '100%', maxHeight: 200 }} />
                </div>
            )}
            <input type="file" accept="image/*" onChange={handleUpload} />
        </div>
    )
}

export default ImageUploadEditComponent
