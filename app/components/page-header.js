'use strict'

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    // TODO: follow style guide for the page header.
})

export function PageHeader() {
    const classes = useStyles()
    return (
        <div>
            <h1>Welcome to the Page Header!</h1>
        </div>
    )
}

export default PageHeader
