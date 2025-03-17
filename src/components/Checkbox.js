import { useContext } from "react";
import { InputsContext } from "../contexts/InputsContext";

export const Checkbox = (props) => {
    const { updateInputState, inputsState } = useContext(InputsContext);

    const onChange = (e) => {
        const currentValue = inputsState[props.name]; // Get current state
        const newValue = currentValue === "on" ? "off" : "on"; // Toggle
        updateInputState(props.name, newValue);
    };

    return (
        <div className="input flex justify-center  font-[sans-serif] text-[#333]">
            <input
                type="checkbox"
                style={{ borderRadius: "0", height: "4vh", position: "relative", top: "2vh", right: "1vw", width: "5vw"}}
                name={props.name}
                checked={inputsState[props.name] === "on"} // Ensure it works correctly
                onChange={onChange}
                className="px-4 py-1.5 text-sm rounded-md bg-white border border-gray-400 w-full outline-blue-500"
            />
        </div>
    );
};
