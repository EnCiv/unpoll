'use strict'

import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'

const useStyles = createUseStyles({
    inputContainer: {
        display: 'flex',
        width: '100%',
        height: '10rem',
        backgroundColor: '#000',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
    },
    topicContainer: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    topicInput: {
        border: '2px solid #fff',
        borderRadius: '10px',
        padding: '1rem',
        boxSizing: 'border-box',
        height: '4rem',
        width: '100%',
        backgroundColor: '#000',
        color: '#fff',
        '::-webkit-input-placeholder': {
            color: '#fff'
        }
    },
    topicInputClicked: {
        border: '2px solid #fff',
        borderRadius: '10px',
        padding: '1rem',
        boxSizing: 'border-box',
        height: '6rem',
        width: '100%',
        backgroundColor: '#000',
        color: '#fff',
        '::-webkit-input-placeholder': {
            color: '#fff'
        }
    },
    topicInputText: {
        width: '100%',
        height: '100%',
        background: 'transparent',
        color: '#fff',
        border: 'none',
        outline: 'none',
        fontSize: '1.25rem',
        lineHeight: '1.25rem',
    },
    topicInputTitle: {
        textAlign: 'left'
    }
})


export function InputElement() {
    const classes = useStyles()
    const [inputClicked, changeInput] = useState(false)
    return (
        <div className={classes.inputContainer}>
            <div className={classes.topicContainer}>
                {!inputClicked ?
                    <div className={classes.topicInput}>
                        <div type='text' className={classes.topicInputText} onClick={() => changeInput(true)} key="1">`TOPIC 1`</div>
                    </div> :
                    <div className={classes.topicInputClicked}>
                        <div className={classes.topicInputTitle}>TOPIC 1</div>
                        <input autofocus="true" autoFocus={true} type='text' className={classes['topicInputText']} key="2" />
                    </div>
                }
            </div>
        </div>
    )
}

export default InputElement