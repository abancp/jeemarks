import React from 'react'

function ResultPopup({ result,right,wrong }) {
    return (
        <div className='popup'>
            <div className="popup-main">

                <pre>
                    <h4>Total Questions : 75</h4>
                    <h4>Right : {right}</h4>
                    <h4>Wrong : {wrong}</h4>
                    <h4>Dropped : {75-(Number(right)+Number(wrong))}</h4>
                    <h4>You scored : {right*4-wrong}</h4>
                </pre>

                <table border={0} className='result-table'>
                    <tr>
                        <th>Answer</th>
                        <th>QuestionID</th>
                        <th>Picked Answer/Option ID</th>
                        <th>Correct Answer/Option ID</th>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Mark</th>
                    </tr>
                    <h3>Maths MCQ</h3>
                    {
                        result.mathsMcq.map((mcq) => (
                            <tr>
                            {mcq.map((a)=>(
                                <td>{a}</td>
                                ))}
                            </tr>
                        ))
                    }
                    <h3>Maths SA</h3>
                    {
                        result.mathsSa.map((sa) => (
                            <tr>
                            {sa.map((a)=>(
                                <td>{a}</td>
                                ))}
                            </tr>
                        ))
                    }
                    <h3>Physics MCQ</h3>
                    {
                        result.physicsMcq.map((mcq) => (
                            <tr>
                            {mcq.map((a)=>(
                                <td>{a}</td>
                                ))}
                            </tr>
                        ))
                    }
                    <h3>Physics SA</h3>
                    {
                        result.physicsSa.map((sa) => (
                            <tr>
                            {sa.map((a)=>(
                                <td>{a}</td>
                                ))}
                            </tr>
                        ))
                    }
                    <h3>Chemistry MCQ</h3>
                    {
                        result.chemistryMcq.map((mcq) => (
                            <tr>
                            {mcq.map((a)=>(
                                <td>{a}</td>
                                ))}
                            </tr>
                        ))
                    }
                    <h3>Chemistry SA</h3>
                    {
                        result.chemistrySa.map((mcq) => (
                            <tr>
                            {mcq.map((a)=>(
                                <td>{a}</td>
                                ))}
                            </tr>
                        ))
                    }

                </table>
            </div>
        </div>
    )
}

export default ResultPopup
