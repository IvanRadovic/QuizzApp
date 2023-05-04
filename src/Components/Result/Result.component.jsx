import { useState, useEffect } from "react";
import "./Result.style.scss"

const Result = ({totalQuestions, result, onTryAgain}) => {

    const [name, setName] = useState('');
    const [highScores, setHighScores] = useState([]);
    const [showScores, setShowScores] = useState(false);

    useEffect(() => {
        setHighScores(JSON.parse(localStorage.getItem('highScores')) || []);
    },[]);


    /* ---- Save score ---- */
    const handleSave = () => {
        const score = {
            name:name,
            score: result.score
        };

        const newHighScores = [...highScores].sort((a,b) => b.score - a.score);

        setHighScores(newHighScores);
        setShowScores(true);
        localStorage.setItem('highScores', JSON.stringify(newHighScores));
    }

    /* ---- Reset resutl ---  */

    const handleTryAgain = () => {
      setShowScores(false);
      setHighScores([]);
      onTryAgain();
    }

    return ( 
        <div className="result">
            <h3>Result</h3>
            <p>
              Total Questions: <span>{totalQuestions.length}</span>
            </p>
            <p>
              Total Score: <span>{result.score}</span>
            </p>
            <p>
              Correct Answers: <span>{result.correctAnswers}</span>
            </p>
            <p>
              Wrong Answers: <span>{result.wrongAnswers}</span>
            </p>
            <button onClick={handleTryAgain}>Try again</button>
            {!showScores ?
                <>
                    <h3>
                        Enter your name bellow <br/> to save your score!
                    </h3>
                    <input placeholder="Your name" value={name} onChange={(ev) => setName(ev.target.value)}/>
                    <button onClick={handleSave}>
                        Save your results!
                    </button>
                </> :
                <>
                    <table>
                        <thead>
                            <tr>
                                <th>Ranking</th>
                                <th>Name</th>
                                <th>Score</th>
                            </tr>
                        </thead>
                        <tbody>
                            {highScores.map((highScore, i) =>{
                                return(
                                    <tr key={`${highScore.score}${highScore.name}${i}`}>
                                        <td>{i + 1}</td>
                                        <td>{highScore.name}</td>
                                        <td>{highScore.score}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </>
            }
          </div>
     );
}
 
export default Result;