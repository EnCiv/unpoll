import React, { useEffect, useLayoutEffect, useState, useCallback } from 'react'
import { createUseStyles } from 'react-jss'
import ComponentListSlider from '../components/component-list-slider'
import NavBar from '../components/nav-bar'
import StartPage from '../components/start-page'
import Ask from '../components/ask'
import CardListGrouper from '../components/card-list-grouper'
import CardListSelector from '../components/card-list-selector'
import IotaDb from '../components/iota-db'
import IotaDbFilter from '../components/iota-db-filter'
import IotaDbInput from '../components/iota-db-input'
import UserLogin from '../components/user-login'

const storybookPadding = '0px' // it padds the iframe with 1rem all around

// Note to future dev's here: don't think of data flowing from one ComponentListSlider child to another,
// think of each update goting up and then propogating down to all the children each time it happens
//

function allIds(card) {
  if (!card) return []
  if (!card.cards) return [card._id]
  else return card.cards.map(card => card._id)
}

function allDone() {
  location.href = 'https://forms.gle/orBZm4u2txY8Cu3LA'
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

  return (
    <div className={classes.unpollViewPort} style={{ backgroundColor }}>
      <div className={classes.unpollWrapper}>
        <ComponentListSlider NavBar={undefined} onDone={allDone} {...props}>
          <StartPage
            subject="Hello!"
            description="What 2 questions would you like to ask the President of the United States? "
            buttonName="START"
            textSize="large"
          />
          <StartPage
            subject="About This?"
            description="If thousands of people (or more) all provided their input - there would be no way one person could respond to them all. Someone would need to go through them, and collate them down to a few. But who, and would it be fair? We are creating this tool to provide a fair and productive way for thousands of people to work together to figure out what few questions to ask the President, or any representative or candidate. Please go through the next steps as if you really were working to ask questions of the President- who knows maybe it will happen. But in the end, there is a survey form so please tell us what you think."
            buttonName="CONTINUE"
            textSize="small"
          />
          <UserLogin>
            <IotaDb
              onDone={toggleBackgroundColor}
              query={['get-topics-and-questions', props.unmobQuestionId, 0]}
              {...props}
            >
              <IotaDbFilter store={'topicStore'} filter={topicFilter}>
                <IotaDbFilter store={'question0Store'} filter={questionFilter0} dependencies={cardStoreProp}>
                  <IotaDbFilter store={'question1Store'} filter={questionFilter1} dependencies={cardStoreProp}>
                    <ComponentListSlider NavBar={NavBar}>
                      <IotaDbInput>
                        <Ask
                          majorLine="What topics would you like to ask the candidates"
                          minorLine="What questions do you have regarding the topics"
                          asks={asks}
                        />
                      </IotaDbInput>
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
                  </IotaDbFilter>
                </IotaDbFilter>
              </IotaDbFilter>
            </IotaDb>
          </UserLogin>
          <StartPage
            subject="Thank You!"
            description="The next step in the process would be to go through these steps again, with the topics and questions that rank highest from the previous round.  If there were 1000 people we would have 3 rounds.  If there were a million, it would be 6.  But for now, we are just seeking your feedback to help us make this round awesome.  When you click the Finished button you will be taken to a feedback survey."
            textSize="large"
            buttonName="Finished"
          />
        </ComponentListSlider>
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
