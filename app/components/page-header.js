'use strict'

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { createUseStyles } from 'react-jss'

export function PageHeader(props) {
    const { majorLine, minorLine } = props

    const classes = useStyles(props)
    return (
        <div className={classes.PageHeader}>
            <h1>{majorLine}</h1>
            <h3>{minorLine}</h3>
        </div>
    )
}

const useStyles = createUseStyles({
    PageHeader: {
        marginBottom: "3rem",
        '& h1': {
            /* Bold 35 */
            position: 'static',
            margin: {
                left: '0',
                right: '0',
                top: '1rem',
                bottom: '0',
            },

            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '2.5rem',
            lineHeight: '3rem',

            color: 'white',
        },

        '& h3': {
            /* Regular 16 */
            position: 'static',
            margin: {
                left: '0',
                right: '0',
                top: '1rem',
                bottom: '0',
            },

            fontFamily: 'Roboto',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '1.25rem',
            lineHeight: '1.5rem',

            color: 'white',
        },
    },
})

export default PageHeader
