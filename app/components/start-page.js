'use strict'

import React from 'react'
import ArrowButton from './arrow-button'
import TitleBar from './title-bar'
import SvgUnpollLogoBackground from '../svgr/unpoll-logo-background'
import { createUseStyles } from 'react-jss'

export function StartPage({subject, description, buttonName, textSize, onDone}) {
    const classes = useStyles();
        return (
            <div className={classes.startContainer}>
                <div className={classes.topicContainer}>
                  <TitleBar className={classes.titleBar}/>
                  <div className={classes.wrapper}>
                    <SvgUnpollLogoBackground width="40%" height="auto" className={classes.rectangle}/>
                    <div className={classes.textWrapper}>
                        <div className={textSize === 'large' ? classes.largeSubj : classes.smallSubj}>{subject}</div>
                        <div className={textSize === 'large' ? classes.largeDesc : classes.smallDesc}>{description}</div>
                    </div>
                  </div>
                  <div className={classes.arrowButton} >
                    <ArrowButton name={buttonName} onClick={e => onDone && onDone(true)}/>
                  </div>
                </div>
            </div>
        )
}

const useStyles = createUseStyles({
    startContainer: {
        position: 'relative',
        backgroundColor: '#1480ff',
        height: '100vh',
    },
    titleBar: {
        fontFamily: 'Staatliches, sans-serif',
        fontSize: '1rem',     
    },
    topicContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    wrapper: {
        position: 'relative',
    },
    rectangle: {
        position: 'absolute',
        left: '29%',
        marginTop: '88px'     
    },
    textWrapper: {
        height: '50vh',
        overflowY: 'scroll',   
        marginTop: '10vh', 
    },
    largeSubj: {
        zIndex: '10',
        color: '#ffffff',
        textAlign: 'left',
        marginLeft: '2.063rem',
        marginRight: '2.063rem',
        fontSize: '3.125rem',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    },
    largeDesc: {
        zIndex: '10',
        color: '#ffffff',
        textAlign: 'left',
        marginLeft: '2.063rem',
        marginRight: '2.063rem',
        fontSize: '2.5rem',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    },
    smallSubj: {
        zIndex: '10',
        color: '#ffffff',
        textAlign: 'left',
        marginLeft: '3.313rem',
        fontSize: '1.875rem',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    },
    smallDesc: {
        zIndex: '10',
        color: '#ffffff',
        textAlign: 'left',
        marginLeft: '3.313rem',
        marginRight: '3.5rem',
        fontSize: '1.25rem',
        fontFamily: 'sans-serif',
        textAlign: 'justify',
        lineHeight: '1.438rem',
        fontStyle: 'normal',
        fontWeight: '400',
    },
    arrowButton: {
        bottom: '2rem',
        position: 'fixed',
        width: '100%',
        left: 0
    }
})


export default StartPage