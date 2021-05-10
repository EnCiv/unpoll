import React from 'react'
import { HeaderBar } from '../app/components/header-bar';

const Component = HeaderBar
const Name = 'HeaderBar'

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
            <Component {...args}>
                <HeaderBar />
            </Component>
        </div>
    </div>
)

export const TitleBar = Template.bind({})
TitleBar.args = { type: 'title' }
export const NavBar = Template.bind({})
NavBar.args = { type: 'nav', navSteps: 7, currentStep: 1 }