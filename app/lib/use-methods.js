import React, { useState, useReducer } from 'react'


// while "object" state  (a pointer for you C programmers) will change each time, the object state.methodState (meaning the pointer methodState) will always be the same
// this reducer will mutate the contents of the methodState object based on the properties in the object "action'.  So action does not have a type like it would in other cases.
// reducer will retun a new state but with the same methodState object - though it will be mutated 
function reducer(state, action) {
    Object.assign(state.methodState, action)
    return { ...state }
}

export function useMethods(methodsObj, initialState) {
    // useReducer returns a new pointer to "state" every time state changes, but it always returns the same value for dispatch
    const [state, dispatch] = useReducer(reducer, { methodState: initialState })

    // these methods (the code) are setup once. They will always refer to the original "state" pointer that was returned by the very first useReducer call.
    // but because our "state" has "methodState" in it, and our reducer always mutates that object (rather then setting methodState= it uses objectAssign(methodState))
    // these "memorized" methods will be able to access the latest *methodState* as it changes
    // memorizing these methods saves times and reduces rerendering of components
    // writing code with methods is less work and less error prone than doing dispatch({type: "xxx"}) everywhere

    const methodState = state.methodState // now you don't have to say state.methodState everywhere

    const [methods, neverSetMethods] = useState(() => methodsObj(dispatch, methodState))

    methods.reset = function () {
        // reset the methodState back to initialState by mutating the original object.  
        // don't create a new object, becasue the methosObjs were instantiated to work with the original state.methodState object.
        Object.keys(state.methodState).forEach(key => { delete state.methodState[key] })
        Object.assign(state.methodState, initialState)
        dispatch({})
    }

    // methodsObj is a function that returns an object of methods - because we need to pass dispatch to it.  Passing methodState doesn't hurt

    return [methodState, methods]
}

export default useMethods
