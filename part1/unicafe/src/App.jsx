import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'

const Statistics = ({good, neutral, bad}) => {
  const totalFeedbacks = good + neutral + bad;
  const average = (good - bad)/(totalFeedbacks);
  const positive = parseFloat(((good/totalFeedbacks)*100).toFixed(2));

  return (
    <div>
      <h2>statistics</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>average: {(average || average == 0) ? average : "No responses yet"}</p>
      <p>positive: {positive ? positive+'%' : "No positive reviews yet"}</p>
      <p><strong>Total feedbacks collected: {totalFeedbacks}</strong></p>
    </div>
  )
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // const totalFeedbacks = good + neutral + bad;
  // const average = (good - bad)/(totalFeedbacks);
  // const positive = parseFloat(((good/totalFeedbacks)*100).toFixed(2));
  // console.log(positive);

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
      {/* <h2>statistics</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
      <p>average: {(average || average == 0) ? average : "No responses yet"}</p>
      <p>positive: {positive ? positive+'%' : "No positive reviews yet"}</p>
      <p><strong>Total feedbacks collected: {totalFeedbacks}</strong></p> */}
    </div>
  )
}

export default App
