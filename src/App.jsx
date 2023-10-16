import { useState } from 'react'
import Home from './components/Home'
import Quiz from './components/Quiz'

function App(){
  
  const [quizOn, setQuizOn] = useState(false)

  function toggleQuiz(){
    setQuizOn(prev => !prev)
  }

  return (
    <main>
      <div className="background">
        {quizOn ? <Quiz/>: <Home toggleQuiz = {toggleQuiz} />}
      </div>
    </main>
  )
}

export default App
