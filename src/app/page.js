'use client'
import React from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

const PATH = "unity/Build/"
const UNITY_BUILD_NAME = "UnityFence"


export default function App() {
  const { unityProvider } = useUnityContext({
    loaderUrl: `${PATH}${UNITY_BUILD_NAME}.loader.js`,
    dataUrl: `${PATH}${UNITY_BUILD_NAME}.data`,
    frameworkUrl: `${PATH}${UNITY_BUILD_NAME}.framework.js`,
    codeUrl: `${PATH}${UNITY_BUILD_NAME}.wasm`,
  });

  return (
    <div id="app" style={{position: "absolute", width: "100vw", height: "100vh"}}>
      <span style={{margin: "1rem 0 0 1rem", }}>

      </span>
      <Unity unityProvider={unityProvider} style={{width: "100vw", height:"100vh", verticalAlign: "top"}} />
    </div>
  );
}
