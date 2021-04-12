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
          {cardObjs(args.cards).map(card => (
            <TopicCard topicObj={card} key={card._id} />
          ))}
        </Component>
      </div>
    </div>
  </>
)

const cardObjs = i => {
  let a = []
  for (let n = 0; n < i; n++) a.push({ _id: n + 1 + '', description: `Topic ${n + 1}` })
  return a
}
export const Open = Template.bind({})
Open.args = { cards: 5 }
export const Minimized = Template.bind({})
Minimized.args = { cards: 5, shape: 'minimized' }
export const OneCard = Template.bind({})
OneCard.args = { cards: 1, shape: 'minimized' }
