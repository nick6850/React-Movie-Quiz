import { useState, useEffect } from 'react'
import he from 'he';
import arrayShuffle from 'array-shuffle';
import { v4 as uuidv4 } from 'uuid';
import gif from '../loading.gif'

export default function Quiz() {
  const [quizData, setQuizData] = useState([]);
  const [quizElements, setQuizElements] = useState([]);
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)
  const [round, setRound] = useState(0)





  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&category=11&difficulty=easy&type=multiple')
      .then(res => res.json())
      .then(data => {
        data = data.results.map(quizObject => {
          return {
            question: he.decode(quizObject.question),
            correct_answer: quizObject.correct_answer,
            answers: arrayShuffle([...quizObject.incorrect_answers, quizObject.correct_answer]),
            user_choice: '',
            id: uuidv4()
          };
        });
        setQuizData(data);
      });
  }, [round]);

  useEffect(() => {
    if (quizData.length > 0) {
      setQuizElements(
        quizData.map(quizObject => (
          <div className='quizObject' key={quizObject.id}>
            <div className='question'>{quizObject.question}</div>
            <div className='answers'>
              {quizObject.answers.map(answer => ( 
                <div
                  style={{ background: quizObject.user_choice === answer ? '#0088ff70' : 'initial' }}
                  onClick={() => setUserChoice(quizObject.id, answer)}
                  className='answer'
                  key={answer}
                >
                  {he.decode(answer)}
                </div>
              ))}
            </div>
          </div>
        ))
      );
    }
  }, [quizData]);

  function setUserChoice(id, answer) {
    setQuizData(prev => {
      return prev.map(quizObject => {
        return quizObject.id === id ? { ...quizObject, user_choice: answer } : quizObject;
      });
    });
  }

  function checkAnswers() {
    setQuizElements(
      quizData.map(quizObject => {
        if (quizObject.correct_answer === quizObject.user_choice) {
          setScore(prev => prev + 1);
        }
        return (
          <div className='quizObject' key={quizObject.id}>
            <div className='question'>{quizObject.question}</div>
            <div className='answers'>
              {quizObject.answers.map(answer => (
                <div
                  style={{ background: answer === quizObject.correct_answer ? '#92D7A0' : answer === quizObject.user_choice ? '#F4D9D9' : 'initial' }}
                  className='answer'
                  key={answer}
                >
                  {he.decode(answer)}
                </div>
              ))}
            </div>
          </div>
        );
      })
    );
    setChecked(true);
  }
  

  function startNewRound() {
    setQuizData([])
    setQuizElements([])
    setChecked(false)
    setScore(0)
    setRound( prev => prev + 1)
  }

  return (
    <div className="quiz">
      {quizData.length === 0 && (
        <img id='gif' src={gif} alt="Your GIF"/>
      )}
      {quizData.length > 0 && quizElements}
      {!checked ? (
        <button onClick={checkAnswers} className="checkBtn">
          Check answers
        </button>
      ) : (
        <div className="results">
          <div className="score">
            You scored <span id="score">{score}/5 </span> correct answers
          </div>
          <button onClick={startNewRound}>New round</button>
        </div>
      )}
    </div>
  );  
}
