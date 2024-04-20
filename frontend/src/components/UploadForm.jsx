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
      let resultUrl = await convertApi.convert('pdf', 'txt', params)
      let url = resultUrl.files[0].Url
      const file = acceptedFiles[0]
      setName(file?.name?.length > 20 ? file.name.substring(0, 17) + "..." : file.name)
      console.log(url);

      // const allAnswerKeyMap = {
      //   "d6-s1": " #68019114064 68019155182 #68019114065	68019155188 #68019114066	68019155189 #68019114067	68019155193 #68019114068	68019155200 #68019114069	68019155201 #68019114070	68019155207 #68019114071	68019155210 #68019114072	68019155213 #68019114073	68019155218 #68019114074	68019155222 #68019114075	68019155226 #68019114076	68019155231 #68019114077	68019155234 #68019114078	68019155237 #68019114079	68019155241 #68019114080	68019155247 #68019114081	68019155250 #68019114082	68019155256 #68019114083	68019155260 #68019114084	221	 #68019114085	55	 #68019114086	806	 #68019114087	6	 #68019114088	65	 #68019114089	68	 #68019114090	75	 #68019114091	13	 #68019114092	46	 #68019114093	47	 #68019114094	68019155271	 #68019114095	68019155275	 #68019114096	68019155282	 #68019114097	68019155283	 #68019114098	68019155287	 #68019114099	68019155291	 #68019114100	68019155295	 #68019114101	68019155299	 #68019114102	68019155304	 #68019114103	68019155308	 #68019114104	68019155313	 #68019114105	68019155317	 #68019114106	68019155319	 #68019114107	68019155323	 #68019114108	68019155328	 #68019114109	68019155333	 #68019114110	68019155335	 #68019114111	68019155342	 #68019114112	68019155344	 #68019114113	68019155348	 #68019114114	60	 #68019114115	12	 #68019114116	4	 #68019114117	1	 #68019114118	250	 #68019114119	13	 #68019114120	5	 #68019114121	16	 #68019114122	2	 #68019114123	16	 #68019114124	68019155363  #68019114125	68019155366  #68019114126	68019155370  #68019114127	68019155374  #68019114128	68019155379  #68019114129	68019155382  #68019114130	68019155387  #68019114131	68019155391  #68019114132	68019155394  #68019114133	68019155397  #68019114134	68019155401  #68019114135	68019155406  #68019114136	68019155411  #68019114137	68019155413  #68019114138	68019155419  #68019114139	68019155423  #68019114140	68019155428  #68019114141	68019155432  #68019114142	68019155433  #68019114143	68019155438  #68019114144	658	 #68019114145	5	 #68019114146	274	 #68019114147	76	 #68019114148	3	 #68019114149	877	 #68019114150	6	 #68019114151	2	 #68019114152	8	 #68019114153	20",
      //   "d5-s2": " #87827055698	878270219053 #87827055699	878270219058 #87827055700	878270219062 #87827055701	878270219064 #87827055702	878270219069 #87827055703	878270219072 #87827055704	878270219076 #87827055705	878270219079 #87827055706	878270219086 #87827055707	878270219089 #87827055708	878270219091 #87827055709	878270219097 #87827055710	878270219099 #87827055711	878270219104 #87827055712	878270219108 #87827055713	878270219114 #87827055714	878270219118 #87827055715	878270219122 #87827055716	878270219124 #87827055717	878270219130 #87827055718	2	 #87827055719	76	 #87827055720	170	 #87827055721	1600	 #87827055722	1	 #87827055723	18	 #87827055724	10	 #87827055725	25	 #87827055726	5	 #87827055727	3	 #87827055728	878270219141 #87827055729	878270219147 #87827055730	878270219151 #87827055731	878270219153 #87827055732	878270219158 #87827055733	878270219162 #87827055734	878270219167 #87827055735	878270219172 #87827055736	878270219173 #87827055737	878270219179 #87827055738	878270219181 #87827055739	878270219186 #87827055740	878270219190 #87827055741	878270219194 #87827055742	878270219197 #87827055743	878270219201 #87827055744	878270219207 #87827055745	878270219209 #87827055746	878270219213 #87827055747	878270219217 #87827055748	16	 #87827055749	2	 #87827055750	275	 #87827055751	1000	 #87827055752	60	 #87827055753	5	 #87827055754	500	 #87827055755	16	 #87827055756	4	 #87827055757	6588	 #87827055758	878270219231 #87827055759	878270219235 #87827055760	878270219241 #87827055761	878270219244 #87827055762	878270219249 #87827055763	878270219253 #87827055764	878270219258 #87827055765	878270219260 #87827055766	878270219266 #87827055767	878270219267 #87827055768	878270219272 #87827055769	878270219277 #87827055770	878270219281 #87827055771	878270219286 #87827055772	878270219287 #87827055773	878270219291 #87827055774	878270219296 #87827055775	878270219300 #87827055776	878270219305 #87827055777	878270219310 #87827055778	6	 #87827055779	6	 #87827055780	6535	 #87827055781	19	 #87827055782	315	 #87827055783	6	 #87827055784	318	 #87827055785	50	 #87827055786	4	 #87827055787	9"
      // }

      // let answerKeyMap = {}
      let result = { mathsMcq: [], mathsSa: [], physicsMcq: [], physicsSa: [], chemistryMcq: [], chemistrySa: [] };
      const textRes = await axios.get(url)
      const text = textRes.data

      const dateRegex = /Test Date(\s+)([^\s]+)/;
      const timeRegex = /Test Time(\s+)([^\s]+)/;
      const mcqRegex = /Question Type\s*:\s*MCQ[\s\S]*?Question ID\s*:\s*(\d+)[\s\S]*?Option 1 ID\s*:\s*(\d+)[\s\S]*?Option 2 ID\s*:\s*(\d+)[\s\S]*?Option 3 ID\s*:\s*(\d+)[\s\S]*?Option 4 ID\s*:\s*(\d+)[\s\S]*?Status\s*:\s*(\w+)[\s\S]*?Chosen Option\s*:\s*(\d+|--)*/g;
      const saRegex = /Given\s+(\d+|--)[\s\S]*?Question Type : SA(?:[\s\S]*?)Question ID : (\d+)[\s\S]*?Status\s*:\s*(\w+)/g;


      const dateMatch = dateRegex.exec(text)
      const testDateCode = dateMatch ? `d${Number(dateMatch[2].split('/')[0])}` : null
      const timeMatch = timeRegex.exec(text);
      const testTime = timeMatch ? timeMatch[2] : null;
      const testTimeCode = testTime == "9:00" ? "s1" : "s2"
      const testShift = testDateCode + "-" + testTimeCode

      // if (!allAnswerKeyMap[testShift]) {
      //   res.json({ success: false, message: "Shift not allowed" })
      //   return
      // }
      const answerKeyRes = await  axios.get('http://localhost:5173/'+testShift+'.json')
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
              if (answerKeyMap[mcq.QuestionID] === choosedOptionId) {
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

        for (let i = (j - 1) * 10; i < 10 * j; i++) {
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

      setResult({ result, right, wrong, answered })
      setLoading(false)

    } catch (e) {
      setLoading(false)
      toast.error("Something Went Wrong!"+e)
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
