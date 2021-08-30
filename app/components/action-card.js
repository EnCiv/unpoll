'use strict'


import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'

const Blue = '#418AF9'
const selectedBackgroundColor = Blue // blue
const selectedColor = 'white'
const rootBackgroundColor = '#E5E5E5'
const Gray = '#C2C2C2'

export const ActionCard = React.forwardRef((props, ref) => {
    const { className, style, name, onDone, active = "true", question } = props
    const classes = useStyles(props)
    return (
        <button className={cx(classes.action, active !== "true" && classes.inActive, className)} style={style} onClick={(e) => onDone && active === "true" && onDone(true)}>
            {question && <div className={classes.question}>{question}</div>}
            <div className={classes.name}>{name}</div>
        </button>
    )
})

const useStyles = createUseStyles({
    action: {
        width: "100%",
        textAlign: 'center',
        alignItems: 'center',
        verticalAlign: 'middle',
        margin: 0,
        background: Blue,
        color: 'white',
        fontSize: '2em',
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 500,
        padding: '2rem',
        borderRadius: '1rem',
        '&:hover': {
            cursor: 'pointer',
        },
    },
    name: {
        display: 'block',
        lineHeight: '2.4rem',
        margin: ".625rem 0"

    },
    question: {
        display: 'block',
        fontSize: '1.5rem',
        lineHeight: '1.75rem',
        margin: '.625rem 0'
    },
    inActive: {
        backgroundColor: Gray
    }
})

export default ActionCard
