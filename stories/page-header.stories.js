import React from 'react'

import { PageHeader } from '../app/components/page-header'

export default {
    title: 'PageHeader',
    component: PageHeader,
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
          padding: 0,
          color: 'white',
          backgroundColor: 'black',
          height: '100vh',
        }}
      >
        <PageHeader {...args} />
      </div>
    </div>
  </>
  )
  
export const HeaderTest = Template.bind({});
HeaderTest.args = { 
    majorLine: 'What topics would you like to ask the candidates about?',
    minorLine: 'What questions do you have regarding those topics?' 
};
