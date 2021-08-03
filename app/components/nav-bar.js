'use strict'

import React from 'react';
import { createUseStyles } from 'react-jss';
import SvgUndoIcon from '../svgr/undo-icon';
import SvgBackIcon from '../svgr/back-icon';
import SvgWhiteDotIcon from '../svgr/white-dot-icon';
import SvgBlackDotIcon from '../svgr/black-dot-icon';

export function NavBar(props) {
    const { navSteps, currentStep, onBackButton, onRedoButton } = props;
    const classes = useStyles();
    const steps = [];

    for (let i = 1; i <= navSteps; i++) {
        steps.push(i);
    }
    return (
        <div className={classes['headerBar']}>
            <div className={classes['left']} >
                <SvgBackIcon width="30px" height="30px" className={currentStep > 1 ? classes.pointer : classes.disabledIcon} onClick={onBackButton} />
            </div>
            <div className={classes['middle']}>
                {steps.map((step, index) =>
                    (step === currentStep) ? <SvgWhiteDotIcon key={index} className={classes.dotIcon} /> : <SvgBlackDotIcon key={index} className={classes['dotIcon']} />
                )}
            </div>
            <div className={classes['right']}>
                <SvgUndoIcon width="30px" height="30px" className={classes.pointer} onClick={onRedoButton} />
            </div>
        </div>
    )
}
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

export default NavBar