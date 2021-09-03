import React from 'react'
import StartPage from '../app/components/start-page';

const Component = StartPage
const Name = 'StartPage'

export default {
    title: Name,
    component: Component,
    argTypes: {},
}

const Template = args => (
    <>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap" rel="stylesheet" />
    <div style={{ width: '100vw', minHeight: '100vh' }}>
        <div
            style={{
            width: '48em',
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
            padding: '1rem',
            backgroundColor: 'black',
            minHeight: '100vh',
            }}
        >        
        <Component {...args}/>
        </div>
    </div>
    </>
)

export const WelcomePage = Template.bind({})
WelcomePage.args = { subject: 'Hello!', 
                     description: 'You have been invited to a short survey.',
                     buttonName: 'START',
                     textSize: 'large',
                     onDone: true
                   }
export const UndebateDescription = Template.bind({})
UndebateDescription.args = { subject: 'What is Undebate?', 
                     description: 'Undebate is an eleifend ipsum nibh massa ultiricies leo. Enim, tristique elit tempus senectus tempor augue. Enim mauris posuere dolor lacus. Egestas aliquam tellus id tristique. Accumsan id semper et sed fringilla vitae vitae eu.',
                     buttonName: 'CONTINUE',
                     textSize: 'small',
                     onDone: (val)=>console.info(val)
                   }