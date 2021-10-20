import React, { useState } from 'react'
import ComponentListSlider from '../components/component-list-slider'
import NavBar from '../components/nav-bar'
import StartPage from '../components/start-page'
import Ask from '../components/ask'
import CardListGrouper from '../components/card-list-grouper'
import CardListSelector from '../components/card-list-selector'
import CardStore from '../components/card-store'


const storybookPadding = "2rem" // it padds the iframe with 1rem all around

export default function Unpoll(props) {
    const [backgroundColor, setBackgroundColor] = useState("white")
    return (
        <div style={{ width: `calc(100vw - ${storybookPadding})`, minHeight: `calc(100vh - ${storybookPadding})`, backgroundColor: backgroundColor, }}>
            <div
                style={{
                    width: '48em',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    textAlign: 'center',
                    padding: 0,
                    backgroundColor: "black",
                    minHeight: `calc(100vh - ${storybookPadding})`,
                }}
            >
                <CardStore NavBar={undefined} children={list2} defaultValue={cards} onDone={(val) => val ? setBackgroundColor("black") : setBackgroundColor("white")} >
                    <ComponentListSlider >
                        <StartPage
                            subject='Hello!'
                            description='You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.'
                            buttonName='START'
                            textSize='large'
                        />
                        <StartPage
                            subject='What is Undebate?'
                            description='Undebate is an eleifend ipsum nibh massa ultiricies leo. Enim, tristique elit tempus senectus tempor augue. Enim mauris posuere dolor lacus. Egestas aliquam tellus id tristique. Accumsan id semper et sed fringilla vitae vitae eu.'
                            buttonName='CONTINUE'
                            textSize='small'
                        />
                        <ComponentListSlider NavBar={NavBar} >
                            <Ask
                                majorLine="What topics would you like to ask the candidates"
                                minorLine="What questions do you have regarding the topics"
                                asks={asks}
                            />
                            <CardListGrouper />
                            <CardListSelector selectedIds={selectedIds} maxSelected={2} />
                        </ComponentListSlider>
                        <Panel backGroundColor="aqua" />
                        <Panel backGroundColor="magenta" />
                    </ComponentListSlider>
                </CardStore>
            </div>
        </div>
    )
}

const Panel = (props) => <div style={{ width: 'inherit', height: '150vh', backgroundColor: props.backGroundColor }} >
    <div style={{ position: 'relative', width: 'inherit', height: 'inherit' }}>
        <button onClick={props.onDone} style={{ position: 'absolute', top: '20vh' }}>Done</button>
    </div>
</div>

var selectedIds = []
const cards = [
    { _id: 'abc123', description: 'Healthcare' },
    { _id: 'abc124', description: 'Social Justice' },
    { _id: 'abc125', description: 'Drug Use' },
    { _id: 'abc126', description: 'Mental Illness' },
    { _id: 'abc130', description: 'Infrastructure' },
    { _id: 'abc127', description: 'Traffic' },
    { _id: 'abc128', description: 'Roads' },
    { _id: 'abc129', description: 'Bridges' },
    { _id: 'abc131', description: 'Public Schools' }
]

var asks = [{ topic1: '', question1: '' }, { topic2: '', question2: '' }]

const subList = [
    <Ask
        majorLine="What topics would you like to ask the candidates"
        minorLine="What questions do you have regarding the topics"
        asks={asks}
    />,
    <CardListGrouper />,
    <CardListSelector selectedIds={selectedIds} maxSelected={2} />
]

const list2 = [
    <StartPage
        subject='Hello!'
        description='You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.You have been invited to a short survey.'
        buttonName='START'
        textSize='large'
    />,
    <StartPage
        subject='What is Undebate?'
        description='Undebate is an eleifend ipsum nibh massa ultiricies leo. Enim, tristique elit tempus senectus tempor augue. Enim mauris posuere dolor lacus. Egestas aliquam tellus id tristique. Accumsan id semper et sed fringilla vitae vitae eu.'
        buttonName='CONTINUE'
        textSize='small'
    />,
    <ComponentListSlider NavBar={NavBar} >
        <Ask
            majorLine="What topics would you like to ask the candidates"
            minorLine="What questions do you have regarding the topics"
            asks={asks}
        />,
        <CardListGrouper />,
        <CardListSelector selectedIds={selectedIds} maxSelected={2} />
    </ComponentListSlider>,
    <Panel backGroundColor="aqua" />,
    <Panel backGroundColor="magenta" />,
]

