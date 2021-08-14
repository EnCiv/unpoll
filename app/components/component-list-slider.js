'use strict'

import React, { useRef, useState, useEffect, useLayoutEffect, useMemo, useReducer, createRef } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import NavBar from './nav-bar'

const delayedSideEffect = setTimeout  // basically put the side effect on the process queue and do it later

export const ComponentListSlider = (props) => {
    const { children, onDone, ...otherProps } = props
    const classes = useStyles(props)
    const navRef = createRef(); // didn't work right with ref= so navRef 
    const [navBar, setNavBar] = useState({ height: 0, width: 0 })
    const [transitions, setTransitions] = useState(false)
    // has to be useLaoutEffect now useEffect or transitions will get enabled before the first render of the children and it will be blurry
    useLayoutEffect(() => {
        if (navRef.current) {
            let rect = navRef.current.getBoundingClientRect()
            if (rect.height && rect.width)
                setNavBar(rect)
        }
    }
        , [navRef.current])

    function reducer(state, action) {
        switch (action.type) {
            case 'increment':
                // putting this side effect here is unusual - but seems to be a good fit (nimimal code, near related code)
                // the problem is that creating a separate function for onDone within the children will not get the current value of state
                // it will get the state object that existed at the time the function was created.  
                // but dispatch is able to get the current value of state
                if (state.currentStep === children.length - 1) delayedSideEffect(() => onDone(true))
                return { ...state, currentStep: Math.min(children.length - 1, state.currentStep + 1) }
            case 'decrement':
                if (state.currentStep === children.length - 1) delayedSideEffect(() => onDone(false))
                return { ...state, currentStep: Math.max(0, state.currentStep - 1) }
        }
    }
    const [state, dispatch] = useReducer(reducer, { currentStep: 0 })
    // the children need to be cloned to have the onDone function applied, but we don't want to redo this every time we re-render
    // so it's done in a memo
    const extendedChildren = useMemo(
        () => {
            if (!navBar.width) return false
            return children.map(child =>
                <div style={{ width: navBar.width + 'px' }} className={classes.panel} >
                    {React.cloneElement(child, { ...otherProps, ...child.props, onDone: () => dispatch({ type: "increment" }) })
                    })
                </div>
            )
        }
        , [children, navBar.width]
    )
    // don't enable transitions until after the children have been rendered or the initial render will be blurry
    // the setTimeout is necessary to delay the transitions until after the initial render
    useLayoutEffect(() => { if (extendedChildren) setTimeout(() => setTransitions(true)) }, [extendedChildren])
    return (
        <div className={classes.outerWrapper} >
            <NavBar ref={navRef} navSteps={children.length} currentStep={state.currentStep} onBackButton={e => dispatch({ type: "decrement" })} className={classes.navBar} />
            <div style={{ top: navBar.height + 'px', left: -navBar.width * state.currentStep + 'px', width: navBar.width * children.length + 'px' }} className={cx(classes.wrapper, transitions && classes.transitions)} >
                {extendedChildren}
            </div>
        </div>
    )
}

const useStyles = createUseStyles({
    panel: {
        display: 'inline-block'
    },
    navBar: {
        position: 'fixed',
        width: 'inherit',
        zIndex: 1
    },
    outerWrapper: {
        width: 'inherit',
        overflow: 'hidden'
    },
    wrapper: {
        width: '100%',
        position: 'relative',
    },
    transitions: {
        transition: 'all 0.5s linear'
    }
})

export default ComponentListSlider
