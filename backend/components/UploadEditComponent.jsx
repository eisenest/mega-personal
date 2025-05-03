import React from 'react'

const UploadEditComponent = (props) => {
    const { onChange, property, record } = props

    const handleUpload = async (event) => {
        const file = event.target.files?.[0]
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)

        const res = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
        })

        const data = await res.json()

        // ✅ Это нужно, чтобы встроенный Upload-компонент не ломался
        onChange(property.name, {
            bucket: '/uploads',
            key: data.url, // data.url — например, "/uploads/12345.png"
            mimeType: file.type,
        })
    }

    const file = record?.params?.[property.name]
    const imageUrl = typeof file === 'object' && file !== null
        ? file.key
        : typeof file === 'string'
            ? file
            : ''

    return (
        <div>
            <label>{property.label}</label>
            <input type="file" onChange={handleUpload} />
            {imageUrl && (
                <div style={{ marginTop: '1rem' }}>
                    <img src={imageUrl} alt="preview" style={{ maxWidth: '200px' }} />
                </div>
            )}
        </div>
    )
}

export default UploadEditComponent
