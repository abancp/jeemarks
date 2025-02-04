import { Toaster } from 'sonner'
import './App.css'
import UploadForm from './components/UploadForm'

function App() {

  return (
    <div className="main">
      <Toaster/>
      <header>
        <h5 className='branding'>JEEMARKS</h5>
        <h4 className='df'><a className='link' href="https://github.com/abancp/jeemarks" target="_blank" rel="noopener noreferrer">source code</a><span className='credit-span'><h4 > created by <span><a className='link' href="https://github.com/abancp" target="_blank" rel="noopener noreferrer">abancp</a></span></h4></span></h4>
      </header>
      <h5 className='branding'>Score Checker for JEE April 2025 B.E/B.TECH</h5>
      <h6 className=''>Available : 22-shift-1 | 29-shift-1</h6>
      {/* <h5 className='b-tech-h2'>B.E/B.TECH</h5> */}
      <h4 className='main-h4'>Upload Your <span className='response-sheet-h4'>Response Sheet</span> Now</h4>
      <UploadForm />
    </div>
  )
}

export default App
