'use strict'

import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import { createUseStyles } from 'react-jss'
import cx from 'classnames'
import CardStack from './card-stack'
import TopicCard from './topic-card'
import SelectedIcon from '../svgr/circle-check'
import PercentDoneButton from './percent-done-button'

const Blue = '#418AF9'
const selectedBackgroundColor = Blue // blue
const selectedColor = 'white'
const rootBackgroundColor = '#E5E5E5'

export const CardListSelector = props => {
    const { cards, selectedIds, maxSelected = 2, onDone, ...otherProps } = props
    if (typeof selectedIds === 'undefined') {
        console.error("CardListSelector: selectedIds must be defined by parent")
        return null
    }
    const classes = useStyles(props)
    const [count, setCount] = useState(selectedIds.length)
    function toggleSelect(id) {
        let index = selectedIds.indexOf(id)
        if (index < 0) {
            if (selectedIds.length < maxSelected)
                selectedIds.push(id)
        } else
            selectedIds.splice(index, 1)
        setCount(selectedIds.length) // force a rerender because we are changing the state of a passed in array
    }
    return (
        <>
            <div className={classes.list} key="card-list">
                {cards.map(card => {
                    if (Array.isArray(card))
                        return <div className={classes.topic} key={card[0]._id + 'array'}>
                            <CardStack shape="minimized">
                                {card.map(subCard => (
                                    <TopicCard topicObj={subCard} key={subCard._id} />
                                ))}
                            </CardStack>
                            {selectedIds.includes(card[0]._id) &&
                                <div className={classes.selected}>
                                    <div className={classes.selectedInner} >
                                        <SelectedIcon />
                                    </div>
                                </div>
                            }
                            <div className={classes.clickable} onClick={() => toggleSelect(card[0]._id)} key={'clickable' + card._id} />
                        </div>
                    else
                        return <div className={classes.topic} key={card._id}>
                            <TopicCard topicObj={card} />
                            {selectedIds.includes(card._id) &&
                                <div className={classes.selected}>
                                    <div className={classes.selectedInner} >
                                        <SelectedIcon />
                                    </div>
                                </div>
                            }
                            <div className={classes.clickable} onClick={() => toggleSelect(card._id)} key={'clickable' + card._id} />
                        </div>
                })
                }
            </div>
            <div className={classes.done} key="done-button">
                <PercentDoneButton name="DONE" percentComplete={count / maxSelected} onClick={(e) => onDone && onDone()} />
            </div>
        </>
    )
}

const useStyles = createUseStyles({
    done: {
        position: "fixed",
        bottom: "2rem",
        left: 0,
        width: "100%",
        height: 'auto'

    },
    clickable: {
        position: 'absolute',
        height: '6rem',
        width: '6rem',
        top: 0,
        left: 0,
        '&:hover': {
            cursor: 'pointer'
        }
    },
    selected: {
        position: 'absolute',
        left: 0,
        top: 0,
        height: "100%"
    },
    selectedInner: {
        position: 'absolute',
        top: '2rem',
        marginLeft: '2rem',
        fontSize: '2rem',
        lineHeight: '1em',
        '& svg': {
            verticalAlign: 'middle'
        },
    },
    list: {
        padding: '1rem'

    },
    topic: {
        position: 'relative',
        borderRadius: '1rem',
        overflow: 'hidden',
        marginTop: '1rem',
        "&:first-child": {
            marginTop: 0
        }
    }
})

export default CardListSelector
