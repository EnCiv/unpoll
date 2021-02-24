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
  <div style={{ width: '100vw', height: '100vh' }}>
    <div
      style={{
        width: '48em',
        marginLeft: 'auto',
        marginRight: 'auto',
        textAlign: 'center',
        padding: 0,
        backgroundColor: 'black',
        height: '100vh',
      }}
    >
      <Component {...args}>
        <TopicCard topicObj={card1} />
        <TopicCard topicObj={card2} />
        <TopicCard topicObj={card3} />
      </Component>
    </div>
  </div>
)

const card1 = {
  _id: '1',
  description: 'Topic 1',
}

const card2 = {
  _id: '2',
  description: 'Topic 2',
}
const card3 = {
  _id: '3',
  description: 'Topic 3',
}

export const Open = Template.bind({})
Open.args = {}
export const Minimized = Template.bind({})
Minimized.args = { shape: 'minimized' }
