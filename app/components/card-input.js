'use strict'

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'

const Blue = '#418AF9'
const selectedBackgroundColor = Blue // blue
const selectedColor = 'white'
const rootBackgroundColor = '#E5E5E5'

export const CardInput = React.forwardRef((props, ref) => {
    const { title, ...otherProps } = props
    const classes = useStyles(props)
    return (
        <div className={classes.outerBorder}>
            <div className={classes.outerTitle}>
                <input ref={ref} className={classes.input} placeholder={title} />
            </div>
        </div>
    )
})

const useStyles = createUseStyles({
    outerBorder: {
        boxSizing: "border-box",
        borderRadius: "0.5rem",
        border: "2px solid #FFFFFF80",
        textAlign: "center",
        padding: "1rem",

    },
    outerTitle: {
        display: "none"
    },
    input: {
        color: white
    }

})

export default CardInput
