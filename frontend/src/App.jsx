import './App.css'
import UploadForm from './components/UploadForm'

function App() {

  return (
    <div className="main">
      <header>
        <h5 className='branding'>JEESCORE</h5>
        <h4 className='df'><a className='link' href="https://github.com/abancp/jeescore" target="_blank" rel="noopener noreferrer">source code</a><span className='credit-span'><h4 > created by <span><a className='link' href="https://github.com/abancp" target="_blank" rel="noopener noreferrer">abancp</a></span></h4></span></h4>
      </header>
      <h5 className='branding'>Score Checker for JEE April 2024 B.E/B.TECH</h5>
      {/* <h5 className='b-tech-h2'>B.E/B.TECH</h5> */}
      <h4 className='main-h4'>Upload Your <span className='response-sheet-h4'>Response Sheet</span> Now</h4>
      <UploadForm />
    </div>
  )
}

export default App
