import Quiz from './Components/Quiz/Quiz.component'
import { jsQuizz } from "./Constants/constats";

function App() {
  return (
    <Quiz questions={jsQuizz.questions}/>
  )
}

export default App
