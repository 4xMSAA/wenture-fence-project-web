'use client'
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

const path = "unity/Build/"
const unityBuildName = "UnityFence"

function UnityInput() {

}

export default function App() {
  const { unityProvider } = useUnityContext({
    loaderUrl: `${path}${unityBuildName}.loader.js`,
    dataUrl: `${path}${unityBuildName}.data`,
    frameworkUrl: `${path}${unityBuildName}.framework.js`,
    codeUrl: `${path}${unityBuildName}.wasm`,
  });

  return (
    <div id="app" style={{position: "absolute", width: "100vw", height: "100vh"}}>
      <UnityInput>
      </UnityInput>
      <Unity unityProvider={unityProvider} style={{width: "100vw", height:"100vh", verticalAlign: "top"}} />
    </div>
  );
}
