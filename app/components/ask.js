'use strict'

import React, { useEffect, useState } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import InputElement from './input-element'
import PageHeader from './page-header'
import PercentDoneButton from './percent-done-button'
import TextAreaElement from './text-area-element'

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
            {asks && asks.reduce((a, ask, i) => { // map doesn't work here because we need to put to things in the array and <></> doeesn't either
                const [topic, question] = Object.keys(ask)
                a.push(
                    <InputElement
                        name={"Topic " + (i + 1)}
                        defaultValue={ask[topic]}
                        maxLength={50}
                        className={classes.topic}
                        onChange={e => ask[topic] = e?.target?.value}
                        onDone={() => setCount(asksDone(asks))}
                        key={a.length + '-t-' + topic}
                    />
                )
                a.push(
                    <TextAreaElement
                        name={"Question " + (i + 1)}
                        defaultValue={ask[question]}
                        maxLength={280}
                        className={classes.question}
                        onChange={e => ask[question] = e?.target?.value}
                        onDone={() => setCount(asksDone(asks))}
                        key={a.length + '-q-' + question}
                    />
                )
                return a
            }, [])}
            <div className={classes.doneButton} key='done' >
                <PercentDoneButton percentComplete={count / (asks.length * Object.keys(asks[0]).length)} onClick={onDone} />
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
