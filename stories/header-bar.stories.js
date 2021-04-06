import React from 'react'
import { HeaderBar } from '../app/components/headerBar';

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
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
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
NavBar.args = { type: 'nav' }