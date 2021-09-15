// https://github.com/EnCiv/unpoll/issues/15

import React, { useState } from 'react'
import CardStore from '../app/components/card-store'
import CardListGrouper from '../app/components/card-list-grouper'

export default {
    title: 'CardStore',
    component: CardStore,
    argTypes: {},
}

const Template = args => {
    const [backgroundColor, setBackgroundColor] = useState("white")
    return (
        <div style={{ width: '100vw', minHeight: '100vh', backgroundColor: backgroundColor, }}>
            <div
                style={{
                    width: '48em',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    textAlign: 'center',
                    padding: 0,
                    backgroundColor: "black",
                    minHeight: '100vh',
                }}
            >
                <CardStore {...args} onDone={(e) => backgroundColor === "white" ? setBackgroundColor("black") : setBackgroundColor("white")} >
                    <CardListGrouper />
                </CardStore>
            </div>
        </div>
    )
}

const cards = [
    { _id: 'abc123', description: 'Healthcare' },
    { _id: 'abc124', description: 'Social Justice' },
    { _id: 'abc125', description: 'Drug Use' },
    { _id: 'abc126', description: 'Mental Illness' },
    { _id: 'abc130', description: 'Infrastructure' },
    { _id: 'abc127', description: 'Traffic' },
    { _id: 'abc128', description: 'Roads' },
    { _id: 'abc129', description: 'Bridges' },
    { _id: 'abc131', description: 'Public Schools' }
]


export const Normal = Template.bind({})
Normal.args = { cards }

