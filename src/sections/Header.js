import React, {useContext, useEffect} from 'react'
import {RenderComp} from '../components/renderComp.js'
import {Button} from '../components/Button.js'
import {InputsContext} from '../contexts/InputsContext.js'
import {TableContext} from '../contexts/TableContext.js'
export const Header = () => {
    const { getOptions, options} = useContext(InputsContext)
    useEffect(()=>{
        const run = async() => {
            await getOptions("NIFTY")
        }
        run()
    }, [])
    return (
        <>
            <div className="header bg-black ">
                <div className="comps flex">
                    <RenderComp name={"rows-count"} title={"Display Rows"} type={"input"}/>
                    <RenderComp name={"index-drop"} title={"Index"} type={"index-dropdown"}
                                options={["FINNIFTY", "NIFTY", "MIDCPNIFTY", "BANKNIFTY"]}/>
                    <RenderComp name={"expiry-drop"} title={"Expiry"} type={"dropdown"}
                                options={options}/>
                    <Button title={"Update"} />
                </div>

            </div>
        </>
    )
}