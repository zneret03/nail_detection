import { createContext, useReducer } from "react";

const ACTION = {
    errorHandler : "errorHandler"
}

const initialState = {}

const ErrorContext = createContext()

const ErrorProvider = ({children}) => {

    const reducer = (state, action) => {
        switch(action.type){
            case ACTION.errorHandler:
                return {...state, ...action.config}
            default:
                return state;
        }
    }

    const [handler, handlerDispatch] = useReducer(reducer, initialState)

    return(
        <ErrorContext.Provider value={{handler, handlerDispatch}}>
            {children}
        </ErrorContext.Provider>
    )
}

export {ErrorProvider, ErrorContext}