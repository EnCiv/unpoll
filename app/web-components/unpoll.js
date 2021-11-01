import React, { useEffect, useLayoutEffect, useState, useCallback } from 'react'
import { createUseStyles } from 'react-jss'
import ComponentListSlider from '../components/component-list-slider'
import NavBar from '../components/nav-bar'
import StartPage from '../components/start-page'
import Ask from '../components/ask'
import CardListGrouper from '../components/card-list-grouper'
import CardListSelector from '../components/card-list-selector'
import CardStore from '../components/card-store'
import IotaDb from '../components/iota-db'
import IotaDbFilter from '../components/iota-db-filter'

const storybookPadding = '0px' // it padds the iframe with 1rem all around

// Note to future dev's here: don't think of data flowing from one ComponentListSlider child to another,
// think of each update goting up and then propogating down to all the children each time it happens
//

function allIds(card) {
  if (!card) return []
  if (!card.cards) return [card._id]
  else return card.cards.map(card => card._id)
}

export default function Unpoll(props) {
  const classes = useStyles(props)
  const [backgroundColor, setBackgroundColor] = useState('white')
  const [selectedCards, setSelectedCards] = useState([])
  const [selectedQuestions0, setSelectedQuestions0] = useState([])
  const [selectedQuestions1, setSelectedQuestions1] = useState([])

  // question filters needs to be up here so that the function gets the latest selectedCards
  // but useCallback so they don't change all the time
  const questionFilter0 = useCallback(
    doc => {
      console.info('filter', selectedCards)
      return doc.webComponent === 'Question' && allIds(selectedCards[0]).some(id => id === doc.parentId)
    },
    [selectedCards]
  )
  const questionFilter1 = useCallback(
    doc => doc.webComponent === 'Question' && allIds(selectedCards[1]).some(id => id === doc.parentId),
    [selectedCards]
  )
  const cardStoreProp = useCallback(props => [props[props.store]], [])
  const topicFilter = useCallback(doc => doc.webComponent === 'Topic', [])
  const toggleBackgroundColor = useCallback(
    val => (val ? setBackgroundColor('black') : setBackgroundColor('white')),
    []
  )

  // on the server side render portrait will be true -
  // after first render on browser side, set it
  return (
    <div className={classes.unpollViewPort} style={{ backgroundColor }}>
      <div className={classes.unpollWrapper}>
        <IotaDb onDone={toggleBackgroundColor} {...props}>
          <IotaDbFilter store={'topicStore'} filter={topicFilter}>
            <IotaDbFilter store={'question0Store'} filter={questionFilter0} dependencies={cardStoreProp}>
              <IotaDbFilter store={'question1Store'} filter={questionFilter1} dependencies={cardStoreProp}>
                <ComponentListSlider NavBar={NavBar}>
                  <StartPage
                    subject="Hello!"
                    description="You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey."
                    buttonName="START"
                    textSize="large"
                  />
                  <StartPage
                    subject="What is Undebate?"
                    description="Undebate is an eleifend ipsum nibh massa ultiricies leo. Enim, tristique elit tempus senectus tempor augue. Enim mauris posuere dolor lacus. Egestas aliquam tellus id tristique. Accumsan id semper et sed fringilla vitae vitae eu."
                    buttonName="CONTINUE"
                    textSize="small"
                  />
                  <ComponentListSlider NavBar={NavBar}>
                    <Ask
                      majorLine="What topics would you like to ask the candidates"
                      minorLine="What questions do you have regarding the topics"
                      asks={asks}
                    />
                    <CardListGrouper store={'topicStore'} />
                    <CardListSelector
                      store={'topicStore'}
                      selectedCards={selectedCards}
                      setSelectedCards={setSelectedCards}
                      maxSelected={2}
                    />
                    <CardListGrouper topicCard={selectedCards[0]} store={'question0Store'} />
                    <CardListSelector
                      topicCard={selectedCards[0]}
                      store={'question0Store'}
                      selectedCards={selectedQuestions0}
                      setSelectedCards={setSelectedQuestions0}
                      maxSelected={2}
                    />
                    <CardListGrouper topicCard={selectedCards[1]} store={'question1Store'} />
                    <CardListSelector
                      topicCard={selectedCards[1]}
                      store={'question1Store'}
                      selectedCards={selectedQuestions1}
                      setSelectedCards={setSelectedQuestions1}
                      maxSelected={2}
                    />
                  </ComponentListSlider>
                  <Panel backGroundColor="aqua" />
                  <Panel backGroundColor="magenta" />
                </ComponentListSlider>
              </IotaDbFilter>
            </IotaDbFilter>
          </IotaDbFilter>
        </IotaDb>
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

var selectedCards = []

var asks = [
  { topic1: '', question1: '' },
  { topic2: '', question2: '' },
]

const useStyles = createUseStyles({
  unpollViewPort: {
    width: `calc(100vw - ${storybookPadding})`,
    minHeight: `calc(100vh - ${storybookPadding})`,
  },
  unpollWrapper: {
    width: '48em',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    padding: 0,
    backgroundColor: 'black',
    //minHeight: `calc(100vh - ${storybookPadding})`,
  },
  '@media (orientation: portrait)': {
    unpollWrapper: {
      width: '100%',
    },
  },
})
