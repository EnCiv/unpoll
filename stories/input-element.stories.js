import React from 'react'
import { InputElement } from '../app/components/input-element';

const Component = InputElement
const Name = 'InputElement'

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
                color: '#ffffff',
                height: '100vh',
            }}
        >
            <Component {...args}>
                <InputElement />
            </Component>
        </div>
    </div>
)

export const InputBox = Template.bind({})
InputBox.args = {}
