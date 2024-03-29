'use strict'

import React from 'react'
import ArrowButton from './arrow-button'
import TitleBar from './title-bar'
import SvgUnpollLogoBackground from '../svgr/unpoll-logo-background'
import { createUseStyles } from 'react-jss'

export function StartPage(props) {
  const { subject, description, buttonName, textSize, onDone, UserLogin, userInfo } = props
  const classes = useStyles()
  return (
    <div className={classes.startContainer}>
      <div className={classes.topicContainer}>
        <TitleBar className={classes.titleBar} />
        <div className={classes.wrapper}>
          <SvgUnpollLogoBackground width="40%" height="80vh" className={classes.unpollLogoBackground} />
          <div className={classes.textWrapper}>
            <div className={textSize === 'large' ? classes.largeSubj : classes.smallSubj}>{subject}</div>
            <div className={textSize === 'large' ? classes.largeDesc : classes.smallDesc}>{description}</div>
            {UserLogin && <UserLogin userInfo={userInfo} />}
          </div>
          <div className={classes.arrowButton}>
            <ArrowButton name={buttonName} onClick={e => onDone && onDone(true)} />
          </div>
        </div>
      </div>
    </div>
  )
}

const useStyles = createUseStyles({
  startContainer: {
    position: 'relative',
    backgroundColor: '#1480ff',
    //height: '100%',
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
  unpollLogoBackground: {
    position: 'absolute',
    left: '29%',
    top: 0,
  },
  textWrapper: {
    marginTop: '10vh',
    minHeight: 'calc( 90vh - 3.75rem)', // 3.75rem for the titleBar
  },
  largeSubj: {
    color: '#ffffff',
    textAlign: 'left',
    marginLeft: '2.063rem',
    marginRight: '2.063rem',
    fontSize: '3.125rem',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
  },
  largeDesc: {
    color: '#ffffff',
    textAlign: 'left',
    marginLeft: '2.063rem',
    marginRight: '2.063rem',
    marginTop: '2rem',
    marginBottom: '9rem', // include space at bottom for arrow button
    fontSize: '2.5rem',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
  },
  smallSubj: {
    color: '#ffffff',
    textAlign: 'left',
    marginLeft: '3.313rem',
    fontSize: '1.875rem',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
  },
  smallDesc: {
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
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  arrowButton: {
    position: 'absolute',
    bottom: '4rem',
    width: '100%',
    left: 0,
  },
})

export default StartPage
