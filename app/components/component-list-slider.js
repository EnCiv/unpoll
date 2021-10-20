'use strict'

// https://github.com/EnCiv/unpoll/issues/25

import React, { useState, useEffect, useLayoutEffect, useMemo, useReducer, createRef } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import shallowEqual from 'shallowequal'

import PerfectScrollbar from 'react-perfect-scrollbar'
if (typeof window !== "undefined")
    require('react-perfect-scrollbar/dist/css/styles.css')

const delayedSideEffect = setTimeout  // basically put the side effect on the process queue and do it later



export const ComponentListSlider = (props) => {
    const { children, onDone, NavBar = React.forwardRef((props, ref) => null), ...otherProps } = props
    const classes = useStyles(props)
    const navRef = createRef(); // didn't work right with ref= so navRef 
    const outerRef = createRef()
    const [navBarRect, setNavBarRect] = useState({ height: 0, width: 0, bottom: 0 })
    const [outerRect, setOuterRect] = useState({ height: 0, width: 0 })
    const [transitions, setTransitions] = useState(false)

    // if the other props have changed, we need to rerender the children
    // latest.otherProps is only changed if it's shallow - different
    // latest is written directcly because we don't want to cause another rerender - we just want to save the value for next time
    const [latest, neverSetLatest] = useState({ otherProps })
    if (!shallowEqual(latest.otherProps, otherProps)) latest.otherProps = otherProps


    // has to be useLaoutEffect not useEffect or transitions will get enabled before the first render of the children and it will be blurry
    useLayoutEffect(() => {
        if (navRef.current) {
            let rect = navRef.current.getBoundingClientRect()
            if (rect.height && rect.width)
                setNavBarRect(rect)
        }
    }
        , [navRef.current])
    useLayoutEffect(() => {
        if (outerRef.current) {
            let rect = outerRef.current.getBoundingClientRect()
            if (rect.height && rect.width)
                setOuterRect(rect)
        }
    }
        , [outerRef.current])
    function reducer(state, action) {
        switch (action.type) {
            case 'increment':
                return {
                    ...state,
                    currentStep: Math.min(state.currentStep + 1, children.length - 1),
                    sendDoneToParent: state.currentStep >= children.length - 1
                }
            case 'decrement':
                return {
                    ...state,
                    currentStep: Math.max(0, state.currentStep - 1),
                    sendDoneToParent: state.currentStep === children.length - 1
                }
            case 'clearSendDoneToParent':
                return { ...state, sendDoneToParent: false }
        }
    }
    const [state, dispatch] = useReducer(reducer, { currentStep: 0, sendDoneToParent: false })
    // the children need to be cloned to have the onDone function applied, but we don't want to redo this every time we re-render
    // so it's done in a memo
    const clonedChildren = useMemo(
        () => children.map(child =>
            React.cloneElement(child, { ...otherProps, ...child.props, onDone: (val) => val && dispatch({ type: "increment" }) })
        )
        , [children, latest.otherProps]
    )
    // don't enable transitions until after the children have been rendered or the initial render will be blurry
    // the delayedSideEffect is necessary to delay the transitions until after the initial render
    useLayoutEffect(() => { if (clonedChildren) delayedSideEffect(() => setTransitions(true)) }, [clonedChildren])
    useEffect(() => {
        if (state.sendDoneToParent) {
            dispatch({ type: "clearSendDoneToParent" })
            onDone(state.currentStep === (children.length - 1))
        }
    }, [state.sendDoneToParent])
    return (
        <div className={classes.outerWrapper} ref={outerRef} >
            <NavBar ref={navRef}
                navSteps={children.length}
                currentStep={state.currentStep}
                onBackButton={e => dispatch({ type: "decrement" })}
                className={classes.navBar}
            />
            <div style={{
                top: navBarRect.height + 'px',
                left: -outerRect.width * state.currentStep + 'px',
                width: outerRect.width * children.length + 'px'
            }}
                className={cx(classes.wrapper, transitions && classes.transitions)}
            >
                {outerRect.width && clonedChildren.map(child =>
                    <div style={{ width: outerRect.width + 'px', height: window.innerHeight - (navBarRect.bottom ? navBarRect.bottom : outerRect.top) }} className={classes.panel} >
                        <PerfectScrollbar style={{ width: 'inherit', height: "100%" }}>
                            {child}
                        </PerfectScrollbar>
                    </div>)}
            </div>
        </div>
    )
}
const useStyles = createUseStyles({
    panel: {
        display: 'inline-block',
        verticalAlign: 'top'
    },
    navBar: {
        position: 'fixed',
        width: 'inherit',
        zIndex: 1
    },
    outerWrapper: {
        position: 'absolute', // so that clip will work
        width: 'inherit',
        overflow: 'hidden',
        height: '100%',
        clip: 'rect(0,auto,auto,0)' // to make sure the fixed position NavBar in a child is also hidden
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
