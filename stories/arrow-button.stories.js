import React from 'react'

import { ArrowButton } from '../app/components/arrow-button'

export default {
  title: 'ArrowButton',
  component: ArrowButton,
  argTypes: {},
}

const Template = args => (
  <div style={{ width: '100vw', height: '100vh' }}>
    <div
      style={{
        width: '48em',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        padding: 0,
        backgroundColor: 'black',
        height: '100vh',
      }}
    >
      <ArrowButton {...args} />
    </div>
  </div>
)



export const ArrowButtonNormal = Template.bind({})
ArrowButtonNormal.args = { name: 'START', onClick: () => console.info('click') }