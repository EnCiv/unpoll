// https://github.com/EnCiv/unpoll/issues/9

import React, { useState } from 'react'

import { ActionCard } from '../app/components/action-card'

export default {
    title: 'ActionCard',
    component: ActionCard,
    argTypes: {},
}

const Template = args => {
    const [toggleSelected, setToggleSelected] = useState(false)

    return (
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
                <ActionCard {...args} onDone={(done) => setToggleSelected(!toggleSelected)} />
                <div style={{ color: "purple", backgroundColor: "yellow" }} key="toggle">{`Toggle Selected: ${toggleSelected}`}</div>
            </div>
        </div>
    )
}

export const Normal = Template.bind({})
Normal.args = { name: "Change Lead Topic" }

export const WithQuestion = Template.bind({})
WithQuestion.args = { name: "SKIP", question: "No topics to combine?" }