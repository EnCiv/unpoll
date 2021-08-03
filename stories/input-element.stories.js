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
            <Component {...args}/>
        </div>
    </div>
)

export const InputBox = Template.bind({})
InputBox.args = {name: 'TOPIC 1', maxLength: 50}

export const InputBoxWithData = Template.bind({})
InputBoxWithData.args = {name: 'TOPIC 1', maxLength: 50, defaultValue: "abc"}