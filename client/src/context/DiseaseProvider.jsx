import { createContext, useReducer} from 'react'

const ACTION = {
    classify : "classify",
}

const initialState = {}
const DiseaseContext = createContext()

const DiseaseProvider = ({children}) => {

    const reducer = (state = initialState, action) => {
        switch(action.type){
            case ACTION.classify: 
                return {...state, ...action.config}
            case ACTION.reset : 
                return initialState
            default : 
                return state
        }
    }

    const [detection, detectionDispatch] = useReducer(reducer, initialState)

    return (
        <DiseaseContext.Provider value={{detection, detectionDispatch}}>
            {children}
        </DiseaseContext.Provider>
    )
}

export {DiseaseProvider, DiseaseContext}