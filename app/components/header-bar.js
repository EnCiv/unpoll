'use strict'

import React, { Fragment, useState } from 'react';
import {createUseStyles} from 'react-jss';
import SvgAppIcon from '../svgr/app-icon';
import SvgUndoIcon from '../svgr/undo-icon';
import SvgBackIcon from '../svgr/back-icon';
import SvgWhiteDotIcon from '../svgr/white-dot-icon';
import SvgBlackDotIcon from '../svgr/black-dot-icon';

const useStyles = createUseStyles({
    headerBar: {
        display: 'flex',
        width: '100%',
        height: '3.75rem',
        backgroundColor: '#000',
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
        fontSize: '1.5em'
    },
    right: {
        width: '15%',
        display: 'flex',
        justifyContent: 'center',
    },
    dotIcon: {
        marginLeft: '1rem'
    },
    pointer: {
        cursor: 'pointer',
    },
    disabledIcon: {
        cursor: 'no-drop',
        opacity: '0.65'
    }
})

export function HeaderBar(props) {
    const { type, navSteps, currentStep } = props;
    const classes = useStyles();
    const [backActive, updateBackButton] = useState(true);
    const [activeStep, updateStep] = useState(currentStep)
    const steps = [];

    function onBackButton () {
        console.log("onBackButton callled");
        if (activeStep > 1) {
            updateStep(activeStep - 1);
        } else {
            updateBackButton(false);
        }
    }

    function onRedoButton () {
        console.log("onRedoButton callled");
    }

    for (let i = 1; i <= navSteps; i++) {
        steps.push(i);
    }
    return (
        <Fragment>
        {type === 'title' ? 
            <div className={classes['headerBar']}>
                <div className={classes['left']}>
                    <SvgAppIcon width="30px" height="30px" />
                </div>
                <div className={classes['middle']}>
                    UNPOLL
                </div>
                <div className={classes['right']}></div>
            </div> : 
            <div className={classes['headerBar']}>
                <div className={classes['left']} >
                    <SvgBackIcon width="30px" height="30px" className={backActive ? classes.pointer : classes.disabledIcon} onClick={onBackButton} />
                </div>
                <div className={classes['middle']}>
                    {steps.map((step, index) => 
                        (step === activeStep) ? <SvgWhiteDotIcon key={index} className={classes.dotIcon} /> : <SvgBlackDotIcon key={index} className={classes['dotIcon']} />
                    )}
                </div>
                <div className={classes['right']}>
                    <SvgUndoIcon width="30px" height="30px" className={classes.pointer} onClick={onRedoButton} />
                </div>
            </div>}
        </Fragment>
    )
}

export default HeaderBar