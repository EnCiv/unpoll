import React from 'react'

import { CardInput } from '../app/components/card-input'

const Component = CardInput
const Name = 'CardInput'

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
                <Component {...args}>
                </Component>
            </div>
        </div>
    </>
)

export const Empty = Template.bind({})
Empty.args = { title: "Topic 1" }

