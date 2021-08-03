import { React, useState } from 'react'
import { NavBar } from '../app/components/nav-bar';

const Component = NavBar
const Name = 'NavBar'

export default {
    title: Name,
    component: Component,
    argTypes: {},
}

const Template = args => {
    const [backCount, setBackCount] = useState(0)
    const [redoCount, setRedoCount] = useState(0)
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
                <Component {...args} onBackButton={() => setBackCount(backCount + 1)} onRedoButton={() => setRedoCount(redoCount + 1)} />
                <div>{`Back Count: ${backCount}`}</div>
                <div>{`Redo Count: ${redoCount}`}</div>
            </div>
        </div>
    )
}

export const NavigationBar = Template.bind({})
NavigationBar.args = { navSteps: 7, currentStep: 1 }