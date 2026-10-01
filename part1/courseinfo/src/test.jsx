import { useState } from "react";

// const Display = (props) => {
//     return (
//         <h1>{props.counter}</h1>
//     )
// }

// const Button = (props) => {
//     return (
//         <button onClick={props.onClick}>{props.text}</button>
//     )
// }

// const Test = () => {
//     const [ counter, setCounter ] = useState(0);
//     console.log(`rendering ${counter}`)
//     return (
//         <>
//             <Display counter={counter} />
//             <Button onClick = {() => setCounter(counter + 1)} text = "plus" />
//             <Button onClick = {() => setCounter(0)}  text = 'reset'/>
    
//         </>
//     )
// }

const Test = () => {
    const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  // const [total, setTotal] = useState(0)
  let total = left + right;

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
    // setTotal(left + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
    // setTotal(left + right)
  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(' ')}</p>
      <p>total {total}</p>
    </div>
  )
  
}

export default Test