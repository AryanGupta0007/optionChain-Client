import {INPUT} from './INPUT.js'
import {Label} from './Label.js'
import {IndexDropdown} from './IndexDropdown.js'
import {Dropdown} from './Dropdown.js'

export const RenderComp = (props) => {
    const {type, title} = props
    const renderComponent = (type) => {
        if (type === "input") {
            return (
                <>
                    <INPUT name={props.name}/>
                </>)
        } else if (type === "index-dropdown") {
            return (
                <>
                    <IndexDropdown options={props.options} name={props.name}/>

                </>)}
        else if (type === "dropdown") {
            return (
                <>
                    <Dropdown options={props.options} name={props.name}/>

                </>)
        }
    }
    return (
        <>
            <div className={"formCompDiv flex"} style={{position: "relative", top: "0.5vh", width: "12vw", marginLeft: "10vw"}}>
                <Label title={title}/>
                {renderComponent(type)}
            </div>

        </>
    )
}
