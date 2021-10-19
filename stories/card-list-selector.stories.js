import React, { useState } from 'react'

import CardListSelector from '../app/components/card-list-selector'
import CardStore from '../app/components/card-store'


export default {
    title: 'CardListSelector',
    component: CardListSelector,
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
                    <CardListSelector />
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


export const CardListNormal = Template.bind({})
CardListNormal.args = { defaultValue: cards, selectedIds: [] }

export const CardList1Selected = Template.bind({})

CardList1Selected.args = { defaultValue: cards, selectedIds: ['abc123'], maxSelected: 2 }

