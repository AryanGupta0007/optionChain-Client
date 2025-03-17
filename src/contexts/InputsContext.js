import {createContext, useState} from 'react'

export const InputsContext = createContext()
export const InputsState = (props) => {
    const [inputsState, setInputsState] = useState({
        "rows-count": 30, "expiry-drop": "16-01-2025", "oc-symbol": "NIFTY", "checkbox": "off"
    })
    const [requestState, setRequestState] = useState({
        "rows-count": 30, "expiry-drop": "16-01-2025", "oc-symbol": "NIFTY", "checkbox": "off" 
    })
    const [dropState, setDropState] = useState("NIFTY") //
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
        if (name === "oc-symbol"){
            currentState[name] = value
            setInputsState(currentState)
            setTimeout(()=> {
                console.log("getting value of option for ", currentState[name])
                getOptions(value)
            }, 2000)
        }
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
        value={{updateInputState, inputsState, requestState, setRequestState, getOptions, options, dropState, updateDropState}}>
        {props.children}
    </InputsContext.Provider>
}