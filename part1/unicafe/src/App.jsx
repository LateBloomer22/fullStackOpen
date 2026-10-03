import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'

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
        <p>good: {good}</p>
        <p>neutral: {neutral}</p>
        <p>bad: {bad}</p>
        <p>average: {average}</p>
        <p>positive: {positive}%</p>
        <p><strong>Total feedbacks collected: {totalFeedbacks}</strong></p>
      </div>
    )
  }
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
