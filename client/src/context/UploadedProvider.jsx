import { createContext, useReducer} from 'react'

const ACTION = {
    uploadedImage : "uploadedImage",
}

const initialState = ""
const UploadedContext = createContext()

const UploadedProvider = ({children}) => {

    const reducer = (state = initialState, action) => {
        switch(action.type){
            case ACTION.uploadedImage : 
                return state = action.config
            case ACTION.reset : 
                return initialState
            default : 
                return state
        }
    }

    const [uploaded, dispatch] = useReducer(reducer, initialState)

    return (
        <UploadedContext.Provider value={{uploaded, dispatch}}>
            {children}
        </UploadedContext.Provider>
    )
}

export {UploadedProvider, UploadedContext}