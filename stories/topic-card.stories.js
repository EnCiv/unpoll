// https://github.com/EnCiv/unpoll/issues/9

import React, { useState } from 'react'

import { TopicCard } from '../app/components/topic-card'

export default {
  title: 'TopicCard',
  component: TopicCard,
  argTypes: {},
}

const Template = args => {
  const [toggleSelected, setToggleSelected] = useState(0)

  return (
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
        <TopicCard {...args} onToggleSelect={(id) => setToggleSelected(id === toggleSelected ? '' : id)} />
        <div style={{ color: "purple", backgroundColor: "yellow" }} key="toggle">{`Toggle Selected: ${toggleSelected}`}</div>
      </div>
    </div>
  )
}

const card = {
  _id: 'abc123',
  description: 'Healthcare',
}

export const TopicCardNormal = Template.bind({})
TopicCardNormal.args = { shape: '', topicObj: card }
export const TopicCardMinimized = Template.bind({})
TopicCardMinimized.args = { shape: 'minimized', topicObj: card }
export const TopicCardSelected = Template.bind({})
TopicCardSelected.args = { shape: 'selected', topicObj: card }
export const TopicCardLead = Template.bind({})
TopicCardLead.args = { shape: 'lead', topicObj: card }
