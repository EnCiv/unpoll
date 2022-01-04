import { React, useState, useEffect } from 'react'
import { UserLogin } from '../app/components/user-login'

const Component = UserLogin
const Name = 'UserLogin'

export default {
  title: Name,
  component: Component,
  argTypes: {},
}

// after the user logs in, call OnDone to go to the next page in the story
function OnDoneOnLoggedIn(props) {
  useEffect(() => props.onDone && props.onDone(true)) // if user is or does log in - call onDone
  return <div>logged in</div>
}

const Template = args => {
  // stubbing for sockets for useAuth are in .storybook/preview.js
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
          color: 'white',
          height: '100vh',
        }}
      >
        <Component {...args} key="component" onDone={results => setResults(results)}>
          <OnDoneOnLoggedIn />
        </Component>
        <div key="results">{`Results: ${results}`}</div>
        <div key="user">{`User: ${JSON.stringify(args.user, null, 2)}`}</div>
      </div>
    </div>
  )
}

export const UnChecked = Template.bind({})
UnChecked.args = {}
export const UserInfo = Template.bind({})
UserInfo.args = { userInfo: { email: 'success@email.com' } }
