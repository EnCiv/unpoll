import React from 'react'

import PercentDoneButton from '../app/components/percent-done-button'

const Component = PercentDoneButton
const Name = 'PercentDoneButton'

export default {
  title: Name,
  component: Component,
  argTypes: {},
}

const Template = args => (
  <>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet" />
    <div style={{ width: '100vw', height: '100vh' }}>
      <div
        style={{
          width: '48em',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
          padding: '1rem',
          backgroundColor: 'black',
          height: '100vh',
        }}
      >
        <Component {...args} />
      </div>
    </div>
  </>
)

export const Default = Template.bind({})
Default.args = {}
export const Percent50 = Template.bind({})
Percent50.args = { name: 'Test', percentComplete: 0.5 }
export const Percent100 = Template.bind({})
Percent100.args = { name: 'Test', percentComplete: 1 }
