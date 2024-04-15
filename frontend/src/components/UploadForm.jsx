import React, { useCallback, useState } from 'react'
import Dropzone from 'react-dropzone'
import axios from 'axios'
import ResultPopup from './ResultPopup'
import ConvertApi from 'convertapi-js'
import { toast } from 'sonner'
function UploadForm() {

  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(false)
  const [name, setName] = useState("Drop here, or click to select")
  const onDrop = useCallback(async acceptedFiles => {
    try {
      console.log("uploading...");
      setLoading(true)
      let convertApi = ConvertApi.auth('meHku4AKGvNfMvn2')
      let params = convertApi.createParams()
      params.add('file', acceptedFiles[0])
      let result = await convertApi.convert('pdf', 'txt', params)
      let url = result.files[0].Url
      // let url = "https://v2.convertapi.com/d/jniyjtnyax9a11m3x1q903i758wajofw/cdn3_digialm_com_per_g28_pub_2083_touchstone_AssessmentQPHTMLMode1.txt"
      const file = acceptedFiles[0]
      setName(file?.name?.length > 20 ? file.name.substring(0, 17) + "..." : file.name)
      console.log(url);
      const response = await axios.post('http://localhost:3001/', { url: url });
      console.log(response.data.result);
      setResult(response.data);
    } catch (e) {
      toast.error("Something Went Wrong!")
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
      {result && <ResultPopup result={result.result} right={result.right} wrong={result.wrong} />}
    </form>
  )
}

export default UploadForm
