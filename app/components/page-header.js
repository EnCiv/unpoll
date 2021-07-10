'use strict'

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { createUseStyles } from 'react-jss'

export function PageHeader(props) {
    const { majorLine, minorLine } = props

    const classes = useStyles(props)
    return (
        <div>
            <h1>{majorLine}</h1>
            <h3>{minorLine}</h3>
        </div>
    )
}

const useStyles = createUseStyles({
    
})

export default PageHeader
