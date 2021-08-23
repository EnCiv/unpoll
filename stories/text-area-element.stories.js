import React from 'react'
import { TextAreaElement } from '../app/components/text-area-element';

const Component = TextAreaElement
const Name = 'TextAreaElement'

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
            <div style={{ backgroundColor: 'black', color: 'white' }} >
                <Component {...args} />
            </div>
        </div>
    </div>
)

export const InputBox = Template.bind({})
InputBox.args = { name: 'Question 1', maxLength: 280, style: { marginTop: "2rem", marginBottom: '2rem', backgroundColor: 'green', color: 'brown' } }

export const InputBoxWithData = Template.bind({})
InputBoxWithData.args = { name: 'Question 1', maxLength: 280, defaultValue: "abc", style: { marginTop: "2rem", marginBottom: "2rem" } }