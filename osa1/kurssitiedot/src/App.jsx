const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <>
      <Header course={course} />
      <Content
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3} />
    </>

  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <>
      Osa1: {props.part1}. Tehtäviä: {props.exercises1}.
      Osa2: {props.part2}. Tehtäviä: {props.exercises2}.
      Osa3: {props.part3}. Tehtäviä: {props.exercises3}.
    </>
  )
}

export default App