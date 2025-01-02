import {useContext, useEffect} from 'react'
import {TableContext} from "../contexts/TableContext.js";
import {InputsContext} from "../contexts/InputsContext.js";
export const Button = (props) => {
    const { fetchRows } = useContext(TableContext)
    const { inputsState ,dropState } = useContext(InputsContext)
    const { title, type, move, color, marginRight} = props;
    const onClick = () => {
        if (title === "Update"){
            fetchRows(dropState, inputsState["expiry-drop"], inputsState["rows-count"])
        }
    }
    const getFontColor = () => {
        switch (title) {
            case 'Cancel':
                return 'custom-yellow';
            case 'Order':
                return 'blue';
            default:
                return 'purple';
        }
    };

    // Construct button class names
    const buttonClasses = `
        ${getFontColor()} 
        ${marginRight === 'true' ? "m-button-right": ""}
        button-size button-margin 
        px-5 py-2.5 rounded-lg 
        text-black text-sm tracking-wider 
        font-medium border border-current 
        outline-none active:bg-purple-700 
        ${type === 'smallButton' ? 'small-button' : ''} 
        ${type === 'mediumButton' ? 'medium-button' : ''} 
        ${move === 'true' ? 'move-button' : ''}
    `.trim();

    return (
        <div className="font-[sans-serif] space-x-4 space-y-4 text-center" style={{marginTop: "1vh"}}>
            <button type={props.type ? props.type : "button"}
               className={buttonClasses} style={{backgroundColor: "white", marginLeft: "7vw", width: "7vw", height: "4vh", borderRadius: "0", marginTop: "1vh", paddingTop: "1vh"}}
            onClick={onClick}
            >
                {title}
            </button>
        </div>
    );
};


