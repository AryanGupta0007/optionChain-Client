import {useContext, useEffect} from 'react'
import {InputsContext} from "../contexts/InputsContext";
export const Dropdown = (props) => {
    const {options} = props
    const {inputsState, updateInputState} = useContext(InputsContext)
    const onChange = (e) => {
        console.log(e)
        const {name, value} = e.target
        console.log("drop", value)
        updateInputState(name, value)
    }
    useEffect(()=>{
        console.log("updated input state ", inputsState)
    }, [inputsState])
    return (
        <div className="dropdown  relative font-[sans-serif] w-max" >
            <select
                id="currency"
                value={inputsState[props.name]}
                name={props.name}
                onChange={onChange}
                style={{width: "12vw"}}
                className="mt-2 block w-full  border border-gray-300 bg-white py-1.5 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm correct-label-dropdown"
            >
                {options}
                {    options.map((e, index) => {
                    return (
                        <option key={index} value={e}>
                            {e}
                        </option>
                    )
                })}
            </select>
        </div>


    )

}

Dropdown.defaultProps = {
    options: ['A', 'B']
}