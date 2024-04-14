import React, { useCallback, useState } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import ResultPopup from './ResultPopup'

function UploadForm() {

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(false)
  const [name, setName] = useState("Drop here, or click to select")
  const onDrop = useCallback(async acceptedFiles => {
    try {
      console.log("uploading...");
      setLoading(true)
      const file = acceptedFiles[0]
      setName(file?.name?.length > 20 ? file.name.substring(0, 17) + "..." : file.name)
      const formData = new FormData();
      formData.append('pdfFile', file);
      const response = await axios.post('https://jeescore.onrender.com/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data.result);
      setResult(response.data);
    } catch (e) {
      
    }
  }, [])

  return (
    <form className='main-form'>
      <Dropzone onDrop={onDrop} accept={{ 'application/pdf': ['.pdf'] }}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()} className='file-input'>
              <input {...getInputProps()} />
              <p>{name}</p>
            </div>
          </section>
        )}
      </Dropzone>
      {result&&<ResultPopup result={result.result} right={result.right} wrong={result.wrong}/>}
    </form>
  )
}

export default UploadForm
