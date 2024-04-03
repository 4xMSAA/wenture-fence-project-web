'use client'
import { React, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Logic from "./logic"

const PATH = "unity/Build/"
const UNITY_BUILD_NAME = "UnityFence"


const logic = new Logic()

const FenceList = ({fencesList, setFencesList, logic}) => {
    const list = fencesList.map((fence, i) => {
        function onChangeLength(e) {
            logic.fences[i].length = parseFloat(e.target.value)
            setFencesList(logic.fences.slice())
        }
        function onChangeAngle(e) {
            logic.fences[i].angle = parseFloat(e.target.value)
            setFencesList(logic.fences.slice())
        }

        return <li>
            <input type="number" value={fence.length} step="0.01" min="0.01" onChange={onChangeLength} />
            <input type="number" value={fence.angle} step="1" min="0" max="180" onChange={onChangeAngle} />
        </li>
    })

    return (
        <ol>{list}</ol>
    )
}

export default function App() {
    const { unityProvider } = useUnityContext({
        loaderUrl: `${PATH}${UNITY_BUILD_NAME}.loader.js`,
        dataUrl: `${PATH}${UNITY_BUILD_NAME}.data`,
        frameworkUrl: `${PATH}${UNITY_BUILD_NAME}.framework.js`,
        codeUrl: `${PATH}${UNITY_BUILD_NAME}.wasm`,
    });

    const [fenceCount, setFenceCount] = useState(logic.fences.length)
    const [fencesList, setFencesList] = useState(logic.fences.slice())

    function onChangeFenceCount(e) {
        logic.setFenceCount(parseInt(e.target.value))
        setFenceCount(logic.fences.length)
        setFencesList(logic.fences.slice())
    }

    return (
        <div id="app" style={{position: "absolute", width: "100vw", height: "100vh"}}>
        <span style={{position: "absolute", margin: "1rem 0 0 1rem"}}>
            <input type="number" min="0" value={fenceCount} onChange={onChangeFenceCount}/>
            <FenceList fencesList={fencesList} setFencesList={setFencesList} logic={logic}/>
        </span>
        <Unity unityProvider={unityProvider} style={{width: "100vw", height:"100vh", verticalAlign: "top"}} />
        </div>
    );
}
