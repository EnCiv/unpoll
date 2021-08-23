'use strict'

import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'

const useStyles = createUseStyles({
    topicContainer: {
        width: '100%',
    },
    topicInput: {
        border: '2px solid #ffffff',
        borderRadius: '.5rem',
        padding: '1rem',
        boxSizing: 'border-box',
        height: '4rem',
        width: '100%',
        '::-webkit-input-placeholder': {
            color: '#fff'
        }
    },
    topicInputClicked: {
        border: '2px solid #fff',
        borderRadius: '.5rem',
        padding: '1rem',
        boxSizing: 'border-box',
        height: '6rem',
        width: '100%',
        '::-webkit-input-placeholder': {
            color: '#fff'
        }
    },
    topicInputText: {
        width: '100%',
        height: '100%',
        background: 'transparent',
        color: 'inherit',
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


export function InputElement({ name, maxLength = 50, defaultValue = "", className, style, onChange, onDone }) {
    const classes = useStyles();
    const [state, setState] = useState(defaultValue.length ? "filled" : "begin");
    const [formData, setFormData] = useState({ value: defaultValue });

    const handleChange = e => {
        const { value } = e.target
        setFormData(data => ({
            ...data,
            value: value
        }))
        onChange && onChange(e)
    }

    const handleSubmit = e => {
        e.preventDefault()
        if (formData.value.length) {
            setState("filled")
            onDone && onDone(true)
        } else {
            setState("begin")
            onDone && onDone(false)
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

        <div className={cx(className, classes.topicContainer)} style={style}>
            {state === 'clicked' ?
                <div className={classes.topicInputClicked} onKeyPress={e => handleKeyPress(e)} onBlur={handleSubmit} key="clicked">
                    <div className={classes.topicInputTitle}>{name}</div>
                    <input maxLength={maxLength} autoFocus name={name} value={formData.value} onChange={handleChange} className={classes['topicInputText']} />
                    <div className={classes.textCount}>{formData.value.length}/{maxLength}</div>
                </div>
                : state === 'filled' ?
                    <div className={classes.topicContainer} key="filled">
                        <div onClick={() => setState('clicked')} className={classes.topicFilled}>{formData.value}</div>
                    </div>
                    : state === 'begin' ?
                        <div className={classes.topicInput} key="begin">
                            <input type='text' className={classes.topicInputText} placeholder={name} onFocus={() => setState('clicked')} />
                        </div>
                        : ""
            }
        </div>

    )
}

export default InputElement