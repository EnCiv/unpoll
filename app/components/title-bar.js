'use strict'

import React from 'react';
import { createUseStyles } from 'react-jss';
import SvgAppIcon from '../svgr/app-icon';

export function TitleBar(props) {
    const title = "UNPOLL"
    const classes = useStyles();
    return (
        <div className={classes['headerBar']}>
            <div className={classes['left']}>
                <SvgAppIcon width="30px" height="30px" />
            </div>
            <div className={classes['middle']}>
                {title}
            </div>
            <div className={classes['right']}></div>
        </div>
    )
}

export default TitleBar

const useStyles = createUseStyles({
    headerBar: {
        display: 'flex',
        width: '100%',
        height: '3.75rem',
        backgroundColor: '#3180ff',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    left: {
        width: '15%',
        display: 'flex',
        justifyContent: 'center',
    },
    middle: {
        width: '70%',
        display: 'flex',
        justifyContent: 'center',
        fontSize: '1rem',
        fontFamily: 'Staatliches, sans-serif',
        letterSpacing: '.32em',
        lineHeight: '1.25rem',
        fontWeight: '400',
    },
    right: {
        width: '15%',
        display: 'flex',
        justifyContent: 'center',
    }
})