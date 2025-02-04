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
      let convertApi = ConvertApi.auth('secret_8a8ELGPlaeRm7HsT')
      let params = convertApi.createParams()
      params.add('file', acceptedFiles[0])
      let resultUrl = await convertApi.convert('pdf', 'txt', params)
      let url = resultUrl.files[0].Url
      const file = acceptedFiles[0]
      setName(file?.name?.length > 20 ? file.name.substring(0, 17) + "..." : file.name)
      console.log(url);
      let result = { mathsMcq: [], mathsSa: [], physicsMcq: [], physicsSa: [], chemistryMcq: [], chemistrySa: [] };
      const textRes = await axios.get(url)
      //const textRes = await axios.get("https://v2.convertapi.com/d/s7laec634gkw1anwil2c72haxrj4ec9q/cdn3.digialm.com__per_g28_pub_2083_touchstone_AssessmentQPHTMLMode1__2083O24353_2083O24353S15D60288_17382973526108172_KL13101127_2083O24353S15D60288E1.html.txt")
      const text = textRes.data

      const dateRegex = /Test Date(\s+)([^\s]+)/;
      const timeRegex = /Test Time(\s+)([^\s]+)/;
      const mcqRegex = /Question Type\s*:\s*MCQ[\s\S]*?Question ID\s*:\s*(\d+)[\s\S]*?Option 1 ID\s*:\s*(\d+)[\s\S]*?Option 2 ID\s*:\s*(\d+)[\s\S]*?Option 3 ID\s*:\s*(\d+)[\s\S]*?Option 4 ID\s*:\s*(\d+)[\s\S]*?Status\s*:\s*(\w+)[\s\S]*?Chosen Option\s*:\s*(\d+|--)*/g;
      const saRegex = /Give\s+(\d+|--)[\s\S]*?Question Type : SA(?:[\s\S]*?)Question ID : (\d+)[\s\S]*?Status\s*:\s*(\w+)/g;
      //const saRegex = /Q\.(\d+)[\s\S]*?Question Type\s*:\s*SA[\s\S]*?Question ID\s*:\s*(\d+)[\s\S]*?Status\s*:\s*(\w+)/g;


      const dateMatch = dateRegex.exec(text)
      const testDateCode = dateMatch ? `d${Number(dateMatch[2].split('/')[0])}` : null
      const timeMatch = timeRegex.exec(text);
      const testTime = timeMatch ? timeMatch[2] : null;
      const testTimeCode = testTime == "9:00" ? "s1" : "s2"
      const testShift = testDateCode + "-" + testTimeCode
      console.log(testShift, dateMatch)
      // if (!allAnswerKeyMap[testShift]) {
      //   res.json({ success: false, message: "Shift not allowed" })
      //   return
      // }
      const answerKeyRes = await axios.get('http://localhost:5173/' + testShift + '.json')
      //const answerKeyRes = await  axios.get('https://jeemarks.vercel.app/'+testShift+'.json')
      const answerKeyMap = answerKeyRes.data
      // let a = allAnswerKeyMap[testShift].split('#').map((a) => (a.split('\t').filter((a) => a != " ").map((a) => a.trim())))
      // for (let QNA of a) {
      //   if (QNA[0] != undefined) {
      //     answerKeyMap[QNA[0]] = QNA[1]
      //   }
      // }

      let mcqMatches;
      const mcqResults = [];

      while ((mcqMatches = mcqRegex.exec(text)) !== null) {
        mcqResults.push({
          QuestionType: 'MCQ',
          QuestionID: mcqMatches[1],
          Option1ID: mcqMatches[2],
          Option2ID: mcqMatches[3],
          Option3ID: mcqMatches[4],
          Option4ID: mcqMatches[5],
          Status: mcqMatches[6],
          ChosenOption: mcqMatches[7] || '--' // Use '--' as placeholder if Chosen Option is missing
        });
      }

      let saMatches;
      const saResults = [];

      while ((saMatches = saRegex.exec(text)) !== null) {
        saResults.push({
          QuestionType: 'SA',
          QuestionID: saMatches[2],
          GivenAnswer: saMatches[1] === '--' ? '--' : parseInt(saMatches[1]), // Convert to integer if not "--"
          Status: saMatches[3]
        });
      }

      console.log(mcqResults, saResults)

      let answered = 0, right = 0, wrong = 0, notAnswered = 0
      let j = 1
      while (j <= 3) {
        for (let i = (j - 1) * 20; i < 20 * j; i++) {
          let mcq = mcqResults[i]
          let qResultArray = []
          let choosedOptionId = mcq["Option" + mcq.ChosenOption + "ID"]
          if (mcq.Status === 'Not') {
            notAnswered++
            qResultArray = ["----", mcq.QuestionID, "-----", answerKeyMap[mcq.QuestionID], "MCQ", "Not Answered", "0"]
          } else if (mcq.Status === 'Marked') {
            if (mcq.ChosenOption !== '--') {
              answered++
              if (Array.isArray(answerKeyMap[mcq.QuestionID]) ? answerKeyMap[mcq.QuestionID].includes(choosedOptionId) : answerKeyMap[mcq.QuestionID] === choosedOptionId) {
                right++
                qResultArray = ["Right", mcq.QuestionID, choosedOptionId, answerKeyMap[mcq.QuestionID], "MCQ", "Marked & Answered", "+4"]
              } else {
                wrong++
                qResultArray = ["Wrong", mcq.QuestionID, choosedOptionId, answerKeyMap[mcq.QuestionID], "MCQ", "Marked & Answered", "-1"]
              }
            } else {
              notAnswered++
              qResultArray = ["-----", mcq.QuestionID, "-----", answerKeyMap[mcq.QuestionID], "MCQ", "Marked & Not Answered", "0"]
            }
          } else {
            answered++
            let choosedOptionId = mcq["Option" + mcq.ChosenOption + "ID"]
            if (answerKeyMap[mcq.QuestionID] === choosedOptionId) {
              right++
              qResultArray = ["Right", mcq.QuestionID, choosedOptionId, answerKeyMap[mcq.QuestionID], "MCQ", "Answered", "+4"]
            } else {
              wrong++
              qResultArray = ["Wrong", mcq.QuestionID, choosedOptionId, answerKeyMap[mcq.QuestionID], "MCQ", "Answered", "-1"]
            }
          }
          switch (j) {
            case 1: {
              //Maths
              result.mathsMcq.push(qResultArray)
              break
            }
            case 2: {
              //Physics
              result.physicsMcq.push(qResultArray)
              break
            }
            case 3: {
              //Chemistry
              result.chemistryMcq.push(qResultArray)
              break
            }
          }
        }

        for (let i = (j - 1) * 5; i < 5 * j; i++) {
          let sa = saResults[i]
          let qResultArray = []
          let choosedOptionId = sa.GivenAnswer
          if (sa.Status === 'Not') {
            notAnswered++
            qResultArray = ["----", sa.QuestionID, "-----", answerKeyMap[sa.QuestionID], "SA", "Not Answered", "0"]
          } else if (sa.Status === 'Marked') {
            if (sa.GivenAnswer !== '--') {
              answered++
              if (Number(answerKeyMap[sa.QuestionID]) === Number(choosedOptionId)) {
                right++
                qResultArray = ["Right", sa.QuestionID, choosedOptionId, answerKeyMap[sa.QuestionID], "SA", "Marked & Answered", "+4"]
              } else {
                wrong++
                qResultArray = ["Wrong", sa.QuestionID, choosedOptionId, answerKeyMap[sa.QuestionID], "SA", "Marked & Answered", "-1"]
              }
            } else {
              notAnswered++
              qResultArray = ["----", sa.QuestionID, choosedOptionId, answerKeyMap[sa.QuestionID], "SA", "Marked & Not Answered", "0"]
            }
          } else {
            answered++
            let choosedOptionId = sa.GivenAnswer
            if (Number(answerKeyMap[sa.QuestionID]) === Number(choosedOptionId)) {
              right++
              qResultArray = ["Right", sa.QuestionID, choosedOptionId, answerKeyMap[sa.QuestionID], "SA", "Answered", "+4"]
            } else {
              wrong++
              qResultArray = ["Wrong", sa.QuestionID, choosedOptionId, answerKeyMap[sa.QuestionID], "SA", "Answered", "-1"]
            }
          }
          switch (j) {
            case 1: {
              //Maths
              result.mathsSa.push(qResultArray)
              break
            }
            case 2: {
              //Physics
              result.physicsSa.push(qResultArray)
              break
            }
            case 3: {
              //Chemistry
              result.chemistrySa.push(qResultArray)
              break
            }
          }
        }
        j++
      }
      console.log({ result, right, wrong, answered })
      setResult({ result, right, wrong, answered })
      setLoading(false)

    } catch (e) {
      setLoading(false)
      console.log(e)
      toast.error("Something Went Wrong!" + e)
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
      {loading && <div className='lbg'> <div className='spinner'></div> Uploading...  This will take few minuts </div>}
      {result && <ResultPopup result={result.result} right={result.right} wrong={result.wrong} />}
    </form>
  )
}

export default UploadForm
