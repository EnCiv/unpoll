'use strict'

import React, { Fragment } from 'react';
import {createUseStyles} from 'react-jss';
import GraphicEqIcon from '@material-ui/icons/GraphicEq';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import RestoreIcon from '@material-ui/icons/Restore';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const useStyles = createUseStyles({
    headerBar: {
        display: 'flex',
        width: '375px',
        height: '60px',
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
    },
    right: {
        width: '15%',
        display: 'flex',
        justifyContent: 'center',
    }
})

export function HeaderBar(props) {
    const { type } = props;
    const classes = useStyles();
    return (
        <Fragment>
        {type === 'title' ? 
            <div className={classes['headerBar']}>
                <div className={classes['left']}>
                    <GraphicEqIcon />
                </div>
                <div className={classes['middle']}>
                    UNPOLL
                </div>
                <div className={classes['right']}></div>
            </div> : 
            <div className={classes['headerBar']}>
                <div className={classes['left']}>
                        <ArrowBackIosIcon />
                </div>
                <div className={classes['middle']}>
                        <FiberManualRecordIcon />
                        <RadioButtonUncheckedIcon />
                        <RadioButtonUncheckedIcon />
                        <RadioButtonUncheckedIcon />
                        <RadioButtonUncheckedIcon />
                        <RadioButtonUncheckedIcon />
                        <RadioButtonUncheckedIcon />
                </div>
                <div className={classes['right']}>
                    <RestoreIcon />
                </div>
            </div>}
        </Fragment>
    )
}

export default HeaderBar