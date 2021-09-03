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
                    <span>
                        <SvgUnpollLogoBackground width="40%" height="auto" className={classes.rectangle}/>
                    </span>
                    <div className={textSize === 'large' ? classes.largeSubj : classes.smallSubj}>{subject}</div>
                    <div className={textSize === 'large' ? classes.largeDesc : classes.smallDesc}>{description}</div>
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
        // borderRadius: '1.875rem',
        // margin: '.375rem',
        position: 'absolute',
        marginLeft: 'auto',
        marginRight: 'auto',
        // zIndex: '1',
        // opacity: '0.2',       
    },
    largeSubj: {
        zIndex: '10',
        color: '#ffffff',
        textAlign: 'left',
        marginTop: '10.25rem',      
        marginLeft: '2.063rem',
        fontSize: '3.125rem',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    },
    largeDesc: {
        zIndex: '10',
        color: '#ffffff',
        textAlign: 'left',
        marginLeft: '2.063rem',
        fontSize: '2.5rem',
        fontFamily: 'sans-serif',
        fontWeight: 'bold',
    },
    smallSubj: {
        zIndex: '10',
        color: '#ffffff',
        textAlign: 'left',
        marginTop: '9.375rem',      
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
        marginTop: '.938rem',
        fontSize: '1.25rem',
        fontFamily: 'sans-serif',
        textAlign: 'justify',
        lineHeight: '1.438rem',
        fontStyle: 'normal',
        fontWeight: '400',
    },
    arrowButton: {
        marginTop: '15%',
        textAlign: 'center',
        position: 'fixed',
        marginRight: 'auto',
        marginLeft: 'auto',
    }
})


export default StartPage