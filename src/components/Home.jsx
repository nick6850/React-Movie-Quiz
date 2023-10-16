export default function Home(props){
    return (
          <div className='home'>
            <h1>React Movie Quiz</h1>
            <div className="description">Test your film knowledge with this interactive movie quiz built with React</div>
            <button onClick={props.toggleQuiz}>Start Quiz</button>
          </div>
    )
  }