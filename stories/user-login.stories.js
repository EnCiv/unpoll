import { React, useState } from 'react'
import { UserLogin } from '../app/components/user-login'

const Component = UserLogin
const Name = 'UserLogin'

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
          backgroundColor: 'black',
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
export const UserInfo = Template.bind({})
UserInfo.args = { userInfo: { email: 'success@email.com' } }
