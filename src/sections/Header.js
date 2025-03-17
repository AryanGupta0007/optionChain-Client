import React, {useContext, useEffect} from 'react'
import {RenderComp} from '../components/renderComp.js'
import {Button} from '../components/Button.js'
import {InputsContext} from '../contexts/InputsContext.js'
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
                    <RenderComp name={"oc-symbol"} title={"Symbol"} type={"dropWithSearch"}/>
                    <RenderComp name={"expiry-drop"} title={"Expiry"} type={"dropdown"}
                                options={options}/>
                    <RenderComp name={"rows-count"} title={"Display Rows"} type={"input"}/>
                    <RenderComp name={"checkbox"} title={"Remove Illiquid"} type={"checkbox"}/>
                    <Button title={"Update"} />
                </div>

            </div>
        </>
    )
}