import React from 'react'

const Header = ({ title }) => <h1>{title}</h1>

const Total = ({ sum }) => <p><strong>Number of exercises: {sum}</strong></p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => (
  <>
    {
    parts.map(part => <Part key={part.id} part={part} />
    )}
    <Total sum={parts.reduce((previous,current) => previous+current.exercises , 0)} />
  </>
)

const Course = ({course}) => (
<>
  <Header title={course.name} />
  <Content parts={course.parts} />
</>
)

export default Course