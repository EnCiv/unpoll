'use strict'

import React from 'react'
import ArrowButton from './arrow-button'
import TitleBar from './title-bar'
import Rectangle13 from '../svgr/rectangle-13'
import Rectangle14 from '../svgr/rectangle-14'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    startContainer: {
        position: 'relative',
        width: '23.438rem',
        height: '41.688rem',
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
        borderRadius: '1.875rem',
        margin: '6px',
        position: 'absolute',
        zIndex: '1',
        opacity: '0.2',       
    },
    rectangle1: {
        left: '7.063rem',
        top: '7.375rem',
    },
    rectangle2: {
        left: '10.716rem',
        top: '5.5rem',
    },
    rectangle3: {
        left: '230px',
        top: '118px',
    },
    largeSubj: {
        zIndex: '10',
        color: '#ffffff',
        textAlign: 'left',
        marginTop: '164px',      
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
        marginTop: '5.313rem',
        textAlign: 'center',
    }
})


export function StartPage({subject, description, buttonName, textSize, onDone}) {
    const classes = useStyles();
        return (
            <div className={classes.startContainer}>
                <div className={classes.topicContainer}>
                  <TitleBar className={classes.titleBar}/>
                  <div className={classes.wrapper}>
                    <span>
                        <Rectangle14 className={`${classes.rectangle} ${classes.rectangle1}`}/>
                        <Rectangle13 className={`${classes.rectangle} ${classes.rectangle2}`}/>
                        <Rectangle14 className={`${classes.rectangle} ${classes.rectangle3}`}/>
                    </span>
                    <div className={textSize === 'large' ? classes.largeSubj : classes.smallSubj}>{subject}</div>
                    <div className={textSize === 'large' ? classes.largeDesc : classes.smallDesc}>{description}</div>
                  </div>
                  <div className={classes.arrowButton} >
                    <ArrowButton name={buttonName}/>
                  </div>
                </div>
            </div>
        )
}

export default StartPage