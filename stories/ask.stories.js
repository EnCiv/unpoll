import { React, useState } from 'react'
import { Ask } from '../app/components/ask'

const Component = Ask
const Name = 'Ask'

export default {
  title: Name,
  component: Component,
  argTypes: {},
}

const Template = args => {
  const [results, setResults] = useState({ done: false, values: [] })
  return (
    <div style={{ width: 'calc(100vw - 2rem)', minHeight: 'calc(100vh - 2rem)' }}>
      <div
        style={{
          width: '48em',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
          padding: '1rem',
          backgroundColor: '#fff',
          minHeight: 'calc(100vh - 2rem)',
        }}
      >
        <Ask {...args} onDone={(done, values) => setResults({ done, values })} key="1" />
        <div key="2">{`Results: ${JSON.stringify(results)}`}</div>
      </div>
    </div>
  )
}

const asks = [
  [
    { name: 'Topic 1', defaultValue: '', maxLength: 50 },
    { name: 'Question 1', defaultValue: '', maxLength: 280 },
  ],
  [
    { name: 'Topic 2', defaultValue: '', maxLength: 50 },
    { name: 'Question 2', defaultValue: '', maxLength: 280 },
  ],
]

export const Normal = Template.bind({})
Normal.args = {
  majorLine: 'What topics would you like to ask the candidates',
  minorLine: 'What questions do you have regarding the topics',
  asks,
}

export const Simplified = Template.bind({})
Simplified.args = {
  majorLine: "What questions do you want to ask the Presidential Candidates?",
  minorLine: "Please think of 2",
  asks: [[{ name: 'Questions 1', defaultValue: '', maxLength: 280 }], [{ name: 'Question 2', defaultValue: '', maxLength: 280 }]]
}
