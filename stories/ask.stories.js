import { React, useState } from 'react'
import { Ask } from '../app/components/ask';

const Component = Ask
const Name = 'Ask'

export default {
    title: Name,
    component: Component,
    argTypes: {},
}

const Template = args => {
    const [doneCount, setDoneCount] = useState(0)
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
                <Ask {...args} onDone={() => setDoneCount(doneCount + 1)} key="1" />
                <div key="2">{`Done Count: ${doneCount}, ${JSON.stringify(asks)}`}</div>
            </div>
        </div>
    )
}

var asks = [{ topic1: '', question1: '' }, { topic2: '', question2: '' }]

export const Normal = Template.bind({})
Normal.args = {
    majorLine: "What topics would you like to ask the candidates",
    minorLine: "What questions do you have regarding the topics",
    asks
}
