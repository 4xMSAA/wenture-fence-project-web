'use client'
import { React, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Logic from "./logic"

const PATH = "unity/Build/"
const UNITY_BUILD_NAME = "UnityFence"


const logic = new Logic()

function onChangeFenceCount(setFenceCount, setFencesList, e) {
    logic.setFenceCount(parseInt(e.target.value))
    setFenceCount(logic.fences.length)
    setFencesList([...logic.fences]) // ???
}

function onChangeLength(setFencesList, e, i) {
    logic.fences[i].length = parseFloat(e.target.value)
    setFencesList([...logic.fences])
}
function onChangeAngle(setFencesList, e, i) {
    logic.fences[i].angle = parseFloat(e.target.value)
    setFencesList([...logic.fences])
}


const FenceList = ({fencesList, setFencesList}) => {
    const list = fencesList.map((fence, i) => {
        return <li key={"fence-list-key-" + i}>
            <input type="number" value={fence.length} step="0.01" min="0.01" onChange={(e) => onChangeLength(setFencesList, e, i)} />
            <input type="number" value={fence.angle} step="1" min="-180" max="180" onChange={(e) => onChangeAngle(setFencesList, e, i)} />
        </li>
    })

    return (
        <ol>{list}</ol>
    )
}

export default function App() {
    const { unityProvider, sendMessage } = useUnityContext({
        loaderUrl: `${PATH}${UNITY_BUILD_NAME}.loader.js`,
        dataUrl: `${PATH}${UNITY_BUILD_NAME}.data`,
        frameworkUrl: `${PATH}${UNITY_BUILD_NAME}.framework.js`,
        codeUrl: `${PATH}${UNITY_BUILD_NAME}.wasm`,
    });

    logic.sendMessage = sendMessage

    const [fenceCount, setFenceCount] = useState(logic.fences.length)
    const [fencesList, setFencesList] = useState([...logic.fences])

    logic.syncToUnity()

    return (
        <div id="app" style={{position: "absolute", width: "100vw", height: "100vh"}}>
        <span style={{position: "absolute", margin: "1rem 0 0 1rem"}}>
            <input type="number" min="0" value={fenceCount} onChange={(e) => onChangeFenceCount(setFenceCount, setFencesList, e)}/>
            <FenceList fencesList={fencesList} setFencesList={setFencesList} />
        </span>
        <Unity 
            unityProvider={unityProvider} 
            style={{width: "100vw", height:"100vh", verticalAlign: "top"}} 
            tabIndex={1} 
        />
        </div>
    );
}
