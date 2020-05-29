import React from 'react';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const sum = course.parts.reduce( ((a,c) => a + c.exercises), 0)
  return(
    <p><b>Total of {sum} exercises</b></p>
  )
}

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Content = ({ course }) => (
  <div>
    {course.parts.map(part =>
      <Part key={part.id} name={part.name} exercises={part.exercises} />)}
  </div>
)

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
)

export default Course
