import { useState } from 'react'

const Header = (props) => {
  return(
  <h1>
    {props.title}
  </h1>
  )
}

const Button = (props) => {
  return(
    <div>
      <ButtonLine text={props.text1} task={props.task1}> </ButtonLine>
      <ButtonLine text={props.text2} task={props.task2}> </ButtonLine>
      <ButtonLine text={props.text3} task={props.task3}> </ButtonLine>
    </div>
  )
}

const ButtonLine = (props) => {
  return (
    <button onClick={props.task}>
      {props.text}
    </button>
  )
} 

const Statistics = (props) => {
  
  if(props.sum === 0){
    return(
      <div>
        <h4> No feedback given</h4>
      </div>
    )
  }
  return (
    <table> 
      <thead>
      <StatisticLine text={props.good} operation={props.goodFunc}></StatisticLine>
      <StatisticLine text={props.neutral} operation={props.neutralFunc}></StatisticLine>
      <StatisticLine text={props.bad} operation={props.badFunc}></StatisticLine>

      <StatisticLine text={props.text1} operation={props.value1}></StatisticLine>
      <StatisticLine text={props.text2} operation={props.value2}></StatisticLine>
      <StatisticLine text={props.text3} operation={props.value3}></StatisticLine>
      </thead>
    </table> 
  )
}

const StatisticLine = (props) => {
  return(
   
    <tr>{props.text} {props.operation}</tr>
  )
}

const Anecdotes = (props) => {
  let query = props.getVote
  let quote = props.anecdote
  return(
    <div>
      <h2>
        Anecdote of the day
      </h2>
      <div>
        {quote[query]} 
      </div>
      <div>
        has {props.voteCount[query]}
      </div>
      
      <button onClick={props.add}>
        {props.textVote}
      </button>

      <button onClick={props.nextQuote}>
        {props.text}
      </button>
    </div>
  )
}

const MostVotes = (props) => {
  let max = 0
  console.log(props.votes)
  console.log(props.quote)

  const getMax = () =>
  {
    for (const [key, value] of Object.entries(props.votes)) {
      max = Math.max(max, value)
    }
    for (const [key, value] of Object.entries(props.votes)) {
      if(max === parseInt(value)){

        console.log(key, 'this is key')
        max = key
        return key
      }
      console.log(max, "this is the indices");

      
    }

  }

  return (
    <div> 
      <h2>
        Anecdote with most votes
      </h2>
      <div>
        {props.quote[getMax()]}
      </div>
      <div>
        has {props.votes[getMax()]}
      </div>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [votes, setVotes] = useState({0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0, 7:0})
  const [selected, setSelected] = useState(0)

  const increaseGood = () => setGood(good +1)
  const increaseNeutral = () => setNeutral(neutral +1)
  const increaseBad = () => setBad(bad +1)

  const calcSum = () => {return good + bad + neutral}
  const calcAvg = () => {return (good - bad) / calcSum()}
  const calcPos = () => {return (good / calcSum()) * (100) + '%'}

  const getNewAnecdote = () => {setSelected(Math.floor(Math.random() * 8))}
  const updateVotes = () => {
    const copy = { ...votes}
    copy[selected] = parseInt(copy[selected]) + 1
    setVotes(copy)
  }
  
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  return (
    <div>
      <Anecdotes add={updateVotes} nextQuote={getNewAnecdote} voteCount={votes} getVote={selected} textVote='vote' text='next anecdote' anecdote={anecdotes}> </Anecdotes>

      <MostVotes votes={votes} quote={anecdotes}> </MostVotes>

      <Header title='give feedback'> </Header>
      <div>
        <Button text1='good' task1={increaseGood} text2='neutral' task2={increaseNeutral}
        text3='bad' task3={increaseBad}> </Button> 
      </div>
      <Header title='statistics'> </Header>
      <Statistics good='good' goodFunc={good} bad='bad' badFunc={bad} neutral='neutral' neutralFunc={neutral} text1='all' value1={calcSum()} sum={calcSum()}
      text2='average' value2={calcAvg()} text3='positive' value3={calcPos()}> </Statistics>
    </div>
  )
}

export default App