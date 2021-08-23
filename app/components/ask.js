'use strict'

import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import InputElement from './input-element'
import PageHeader from './page-header'
import PercentDoneButton from './percent-done-button'

const asksDone = (asks) => asks.reduce((a, pair) => {
    Object.values(pair).forEach(val => val && val.length && a++)
    return a
}, 0)

export const Ask = (props) => {
    const { majorLine, minorLine, asks, onDone, className, style } = props;
    const classes = useStyles();
    const [count, setCount] = useState(0);

    return (
        <div className={cx(className, classes.askOuter)} style={style}>
            <PageHeader majorLine={majorLine} minorLine={minorLine} key='header' />
            {asks && asks.reduce((a, ask) => {
                const [topic, question] = Object.keys(ask)
                a.push(<InputElement name={topic} defaultValue={ask[topic]} maxLength={50} className={classes.topic} obj={ask} onDone={() => setCount(asksDone(asks))} key={a.length + '-t-' + topic} />)
                a.push(<InputElement name={question} defaultValue={ask[question]} maxLength={280} className={classes.question} obj={ask} onDone={() => setCount(asksDone(asks))} key={a.length + '-q-' + question} />)
                return a
            }, [])}
            <div className={classes.doneButton} key='done' >
                <PercentDoneButton percentComplete={count / (asks.length * 2)} onClick={onDone} />
            </div>
        </div>
    )
}
const useStyles = createUseStyles({
    askOuter: {
        position: 'relative',
        backgroundColor: 'black',
        color: 'white',
        paddingLeft: '2rem',
        paddingRight: '2rem'
    },
    doneButton: {
        bottom: '2rem',
        position: 'fixed',
        width: '100%',
        left: 0
    },
    topic: {
        paddingTop: "1rem",
        paddingBottom: "1rem"
    },
    question: {
        paddingBottom: "2rem"
    }


})

export default Ask
