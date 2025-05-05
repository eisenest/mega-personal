import React from 'react'
import { BasePropertyProps } from 'adminjs'

const UploadEditComponentCustom = (props) => {
    const { record, property, onChange } = props

    const uploadedFile = record.params[property.name]
    const handleChange = (event) => {
        const file = event.target.files[0]
        onChange(property.name, file)
    }

    return (
        <div>
            {uploadedFile && (
                <p>
                    Загружено: <a href={uploadedFile} target="_blank" rel="noreferrer">{uploadedFile}</a>
                </p>
            )}
            <input type="file" onChange={handleChange} />
        </div>
    )
}

export default UploadEditComponentCustom
