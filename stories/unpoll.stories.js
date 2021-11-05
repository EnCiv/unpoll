// https://github.com/EnCiv/unpoll/issues/25

import React, { useState } from 'react'
import ComponentListSlider from '../app/components/component-list-slider'
import NavBar from '../app/components/nav-bar'
import StartPage from '../app/components/start-page'
import { Ask } from '../app/components/ask'
import CardListGrouper from '../app/components/card-list-grouper'
import CardListSelector from '../app/components/card-list-selector'
import CardStore from '../app/components/card-store'

function Unpoll(props) {
  return (
    <CardStore {...props}>
      <ComponentListSlider {...props} />
    </CardStore>
  )
}

export default {
  title: 'Unpoll',
  component: Unpoll,
  argTypes: {},
}

const storybookPadding = '2rem' // it padds the iframe with 1rem all around

const Template = args => {
  const [backgroundColor, setBackgroundColor] = useState('white')
  const [selectedCards, setSelectedCards] = useState(args.selectedCards || [])
  return (
    <div
      style={{
        width: `calc(100vw - ${storybookPadding})`,
        minHeight: `calc(100vh - ${storybookPadding})`,
        backgroundColor: backgroundColor,
      }}
    >
      <div
        style={{
          width: '48em',
          marginLeft: 'auto',
          marginRight: 'auto',
          textAlign: 'center',
          padding: 0,
          backgroundColor: 'black',
          minHeight: `calc(100vh - ${storybookPadding})`,
        }}
      >
        <Unpoll
          {...args}
          selectedCards={selectedCards}
          setSelectedCards={setSelectedCards}
          onDone={val => (val ? setBackgroundColor('black') : setBackgroundColor('white'))}
        />
      </div>
    </div>
  )
}

const Panel = props => (
  <div style={{ width: 'inherit', height: '150vh', backgroundColor: props.backGroundColor }}>
    <div style={{ position: 'relative', width: 'inherit', height: 'inherit' }}>
      <button onClick={props.onDone} style={{ position: 'absolute', top: '20vh' }}>
        Done
      </button>
    </div>
  </div>
)

const cards = [
  { _id: 'abc123', description: 'Healthcare' },
  { _id: 'abc124', description: 'Social Justice' },
  { _id: 'abc125', description: 'Drug Use' },
  { _id: 'abc126', description: 'Mental Illness' },
  { _id: 'abc130', description: 'Infrastructure' },
  { _id: 'abc127', description: 'Traffic' },
  { _id: 'abc128', description: 'Roads' },
  { _id: 'abc129', description: 'Bridges' },
  { _id: 'abc131', description: 'Public Schools' },
]

const asks = [
  [
    { name: 'Topic 1', defaultValue: '', maxLength: 50 },
    { name: 'Question 1', defaultValue: '', maxLength: 280 },
  ],
  [
    { name: 'Topic 2', defaultValue: '', maxLength: 50 },
    { name: 'Question 2', defaultValue: '', maxLength: 280 },
  ],
]

const list = [
  <StartPage
    subject="Hello!"
    description="You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey."
    buttonName="START"
    textSize="large"
  />,
  <StartPage
    subject="What is Undebate?"
    description="Undebate is an eleifend ipsum nibh massa ultiricies leo. Enim, tristique elit tempus senectus tempor augue. Enim mauris posuere dolor lacus. Egestas aliquam tellus id tristique. Accumsan id semper et sed fringilla vitae vitae eu."
    buttonName="CONTINUE"
    textSize="small"
  />,
  <Ask
    majorLine="What topics would you like to ask the candidates"
    minorLine="What questions do you have regarding the topics"
    asks={asks}
  />,
  <CardListGrouper />,
  <CardListSelector maxSelected={2} />,
]

const subList = [
  <Ask
    majorLine="What topics would you like to ask the candidates"
    minorLine="What questions do you have regarding the topics"
    asks={asks}
  />,
  <CardListGrouper />,
  <CardListSelector maxSelected={2} />,
]

function CardStoreListGrouper(props) {
  return (
    <CardStore {...props}>
      <CardListGrouper />
    </CardStore>
  )
}
const shortList = [<CardStoreListGrouper />]
export const NoNavBar = Template.bind({})
NoNavBar.args = { children: list, initialState: { cards, iteration: 0 } }

export const WithNavBar = Template.bind({})
WithNavBar.args = { NavBar: NavBar, children: list, initialState: { cards, iteration: 0 } }

const list2 = [
  <StartPage
    subject="Hello!"
    description="You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey."
    buttonName="START"
    textSize="large"
  />,
  <StartPage
    subject="What is Undebate?"
    description="Undebate is an eleifend ipsum nibh massa ultiricies leo. Enim, tristique elit tempus senectus tempor augue. Enim mauris posuere dolor lacus. Egestas aliquam tellus id tristique. Accumsan id semper et sed fringilla vitae vitae eu."
    buttonName="CONTINUE"
    textSize="small"
  />,
  <ComponentListSlider NavBar={NavBar} children={subList} />,
  <Panel backGroundColor="aqua" />,
  <Panel backGroundColor="magenta" />,
]

export const Nested = Template.bind({})
Nested.args = { NavBar: undefined, children: list2, initialState: { cards, iteration: 0 } }
