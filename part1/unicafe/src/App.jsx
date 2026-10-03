import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'

const StatisticLine = ({text, value}) => {
  return (
    <>
      <p>{text}: {value}</p>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const totalFeedbacks = good + neutral + bad;
  const average = (good - bad)/(totalFeedbacks);
  const positive = parseFloat(((good/totalFeedbacks)*100).toFixed(2));

  if (totalFeedbacks == 0) {
    return (
      <div>
        <h2>statistics</h2>
        <p>No feedback given yet</p>
      </div>
    )
  } else {
    return (
      <div>
        <h2>statistics</h2>
        <StatisticLine text={"good"} value={good}/>
        <StatisticLine text={"neutral"} value={neutral}/>
        <StatisticLine text={"bad"} value={bad}/>
        <StatisticLine text={"average"} value={average}/>
        <StatisticLine text={"positive"} value={positive}/>
        <strong><StatisticLine text={"Total feedbacks collected"} value={totalFeedbacks}/></strong>
      </div>
    )
  }
}

const Button = ({btn_fn , text}) => {
  return (
    <>
      <button onClick={btn_fn}>{text}</button>
    </>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button btn_fn={() => setGood(good + 1)} text={"good"}/>
      <Button btn_fn={() => setNeutral(neutral + 1)} text={"neutral"} />
      <Button btn_fn={() => setBad(bad + 1)} text={"bad"}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
