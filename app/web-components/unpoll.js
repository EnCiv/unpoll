import React, { useEffect, useLayoutEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import ComponentListSlider from '../components/component-list-slider'
import NavBar from '../components/nav-bar'
import StartPage from '../components/start-page'
import Ask from '../components/ask'
import CardListGrouper from '../components/card-list-grouper'
import CardListSelector from '../components/card-list-selector'
import CardStore from '../components/card-store'

const storybookPadding = '0px' // it padds the iframe with 1rem all around

export default function Unpoll(props) {
  const classes = useStyles(props)
  const [backgroundColor, setBackgroundColor] = useState('white')

  // on the server side render portrait will be true -
  // after first render on browser side, set it
  return (
    <div className={classes.unpollViewPort} style={{ backgroundColor }}>
      <div className={classes.unpollWrapper}>
        <CardStore
          NavBar={undefined}
          onDone={val => (val ? setBackgroundColor('black') : setBackgroundColor('white'))}
          {...props}
        >
          <ComponentListSlider>
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
              <CardListGrouper />
              <CardListSelector selectedCards={selectedCards} maxSelected={2} />
            </ComponentListSlider>
            <Panel backGroundColor="aqua" />
            <Panel backGroundColor="magenta" />
          </ComponentListSlider>
        </CardStore>
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
