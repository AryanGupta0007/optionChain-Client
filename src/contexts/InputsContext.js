import {createContext, useState} from 'react'

export const InputsContext = createContext()
export const InputsState = (props) => {
    const [inputsState, setInputsState] = useState({
        "rows-count": 30, "expiry-drop": "02-01-2025"
    })
    const [dropState, setDropState] = useState("NIFTY")
    const [options, setOptions] = useState([])
    const updateExpiry = () => {
        inputsState["expiry-drop"] = options[0]
    }

    const updateDropState = async (value) => {
        await setDropState(value)
        await getOptions(value)
        await updateExpiry()
    }
    const updateInputState = (name, value) => {
        const currentState = {...inputsState}
        currentState[name] = value
        setInputsState(currentState)
    }
    const getOptions = async (value) => {
        console.log("fetching expiries for ", value)
        const url = `http://127.0.0.1:5002/options/${value}`
        const response = await fetch(url, {
            method: "GET",
            header: {
                "content-Type": "application/json"
            }
        })
        const finalResponse = await response.json()
        console.log("expiry", finalResponse.expiry[0])
        setInputsState(prevState => ({
            ...prevState,
            "expiry-drop": finalResponse.expiry[0]
        }));
        setOptions(finalResponse.expiry)
        console.log("updated expiries ", options)
        return finalResponse
    }
    return <InputsContext.Provider
        value={{updateInputState, inputsState, getOptions, options, dropState, updateDropState}}>
        {props.children}
    </InputsContext.Provider>
}