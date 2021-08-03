import React from 'react'
import TitleBar from '../app/components/title-bar';

const Component = TitleBar
const Name = 'TitleBar'

export default {
    title: Name,
    component: Component,
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
                padding: '1rem',
                backgroundColor: '#fff',
                height: '100vh',
            }}
        >
            <Component {...args} />
        </div>
    </div>
)

export const Normal = Template.bind({})
Normal.args = {}