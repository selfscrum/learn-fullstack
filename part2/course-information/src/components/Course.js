import React from 'react'

const Header = ({ title }) => <h1>{title}</h1>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => (
  <>
    {
    parts.map(part => <Part key={part.id} part={part} />
    )}
  </>
)

const Course = ({course}) => (
<>
  <Header title={course.name} />
  <Content parts={course.parts} />
</>
)

export default Course