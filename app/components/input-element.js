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
        border: '2px solid #ffffff',
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
        textAlign: 'left',
        lineHeight: '16px',
        fontSize: '14px',
        fontWeight: 'bold',
        fontFamily: 'sans-serif',
    },
    topicFilled: {
        textAlign: 'left',
        fontSize: '18px',
        lineHeight: '21.09px',
        fontFamily: 'sans-serif',
        border: '2px solid #fff',
        borderRadius: '10px',
        padding: '1rem',
    },
    textCount: {
        textAlign: 'right',
        margin: '6px 0px',
    },
})


export function InputElement({name, maxLength=50, defaultValue=""}) {
    const classes = useStyles();
    const [ state, setState ] = useState(defaultValue.length ? "filled" : "begin");
    const [ formData, setFormData ] = useState({value: defaultValue});

    const handleChange = e => {
        const {value} = e.target
        setFormData(data => ({
            ...data,
            value: value
        }))
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (formData.value.length) {
            setState("filled")
        } else {
            setState("begin")
        }
    }

    const handleKeyPress = e => {
        if (e.key === "Enter") {
            if (formData.value.length) {
                setState("filled")
            } else {
                setState("begin")
            }
        }
    }

        return (
            <div className={classes.inputContainer}>
                <div className={classes.topicContainer}>
                    {state === 'clicked' ?
                        <div className={classes.topicInputClicked} onKeyPress={e => handleKeyPress(e)} onBlur={handleSubmit}>
                            <div className={classes.topicInputTitle}>{name}</div>
                            <input maxLength={maxLength} autoFocus name={name} value={formData.value} onChange={handleChange} className={classes['topicInputText']} />
                            <div className={classes.textCount}>{formData.value.length}/50</div>
                        </div>
                    : state === 'filled' ?
                        <div className={classes.topicContainer}>
                            <div onClick={() => setState('clicked')} className={classes.topicFilled}>{formData.value}</div>
                        </div>                    
                    : state === 'begin' ?
                        <div className={classes.topicInput}>
                            <input type='text' className={classes.topicInputText} placeholder={name} onClick={() => setState('clicked')} />
                        </div>
                    : ""
                    }
                </div>
            </div>
        )
}

export default InputElement