// https://github.com/EnCiv/unpoll/issues/6

import { React, useState } from 'react'
import { CheckButton } from '../app/components/check-button'

const Component = CheckButton
const Name = 'CheckButton'

export default {
  title: Name,
  component: Component,
  argTypes: {},
}

const Template = args => {
  const [results, setResults] = useState('')
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div
        style={{
          width: '48em',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
          padding: '1rem',
          backgroundColor: '#fff',
          height: '100vh',
        }}
      >
        <Component
          {...args}
          onDone={(done, value) => setResults(JSON.stringify({ done, value }, null, 2))}
          key="component"
        />
        <div key="results">{`Results: ${results}`}</div>
      </div>
    </div>
  )
}

export const UnChecked = Template.bind({})
UnChecked.args = {}
