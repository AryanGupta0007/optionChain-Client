import {useContext, useEffect} from 'react'
import {InputsContext} from '../contexts/InputsContext.js'
export const INPUT = (props) => {
    const {updateInputState, inputsState} = useContext(InputsContext)
    const onChange = (e) => {
        const {name, value} = e.target
        updateInputState(name, value)
    }
    return (
        <>
            <div
                className="input flex justify-center max-w-lg space-y-6 font-[sans-serif] text-[#333]">
                <input type='text' placeholder={"enter...."}
                       style={{"border-radius": "0", height: "6vh", position: "relative", top: "1vh", width: "12vw"}}  name={props.name}
                       value={inputsState[props.name]}
                       onChange={onChange}
                       className="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500"/>
            </div>

        </>
    )
}
