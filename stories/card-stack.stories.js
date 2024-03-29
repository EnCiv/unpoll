import React from 'react'

import { CardStack } from '../app/components/card-stack'
import { TopicCard } from '../app/components/topic-card'

const Component = CardStack
const Name = 'CardStack'

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
        <Component {...args}>
        </Component>
      </div>
    </div>
  </>
)

const cardObjs = i => {
  let a = []
  for (let n = 0; n < i; n++) a.push({ _id: n + 1 + 'abc', description: `Topic ${n + 1}` })
  return a
}

const variedCards1 = [
  { _id: 'abc100', description: 'short line' },
  { _id: 'abc101', description: 'long line, long line long line long line long line long line long line long line long line long line long line long line long line long line long line long line long line long line long line ' },
  { _id: 'abc102', description: 'short line' },
  { _id: 'abc103', description: 'long line, long line long line long line long line long line long line long line long line long line long line long line long line long line long line long line long line long line long line ' },
]

const variedCards2 = [
  { _id: 'abc101', description: 'long line, long line long line long line long line long line long line long line long line long line long line long line long line long line long line long line long line long line long line ' },
  { _id: 'abc102', description: 'short line' },
  { _id: 'abc103', description: 'long line, long line long line long line long line long line long line long line long line long line long line long line long line long line long line long line long line long line long line ' },
  { _id: 'abc104', description: 'short line' },
]
export const Open = Template.bind({})
Open.args = { cards: cardObjs(5), defaultShape: 'open' }
export const Minimized = Template.bind({})
Minimized.args = { cards: cardObjs(5), defaultShape: 'minimized' }
export const AddRemove = Template.bind({})
AddRemove.args = { cards: cardObjs(5), defaultShape: 'add-remove' }
export const ChangeLead = Template.bind({})
ChangeLead.args = { cards: cardObjs(5), defaultShape: 'change-lead' }
export const OneCard = Template.bind({})
OneCard.args = { cards: cardObjs(1), defaultShape: 'minimized' }
export const MinimizedView = Template.bind({})
MinimizedView.args = { cards: cardObjs(5), defaultShape: 'minimized-view' }
export const MinimizedViewStart = Template.bind({})
MinimizedViewStart.args = { cards: cardObjs(5), defaultShape: 'minimized-view-start' }
export const OpenView = Template.bind({})
OpenView.args = { cards: cardObjs(5), defaultShape: 'open-view' }
export const VariedCards1 = Template.bind({})
VariedCards1.args = { cards: variedCards1, defaultShape: 'open' }
export const VariedCards2 = Template.bind({})
VariedCards2.args = { cards: variedCards2, defaultShape: 'open' }
