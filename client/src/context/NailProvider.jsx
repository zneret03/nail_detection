import { createContext, useReducer} from 'react'

const ACTION = {
    segmentNail : "segmentNail",
    reset : "reset"
}

const initialState = {}
const NailContext = createContext()

const NailProvider = ({children}) => {

    const reducer = (state = initialState, action) => {
        switch(action.type){
            case ACTION.segmentNail: 
                return {...state, ...action.config}
            case ACTION.reset : 
                return initialState
            default : 
                return state
        }
    }

    const [nailSegmentation, dispatch] = useReducer(reducer, initialState)

    const isCheck = nailSegmentation.data?.segmented.length > 0 ? true: false

    return (
        <NailContext.Provider value={{nailSegmentation, dispatch, isCheck}}>
            {children}
        </NailContext.Provider>
    )
}

export {NailProvider, NailContext}