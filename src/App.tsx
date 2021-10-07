import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
// import {WebViewer} = Communicator.WebViewer;
/// <reference path="./hoops_web_viewer.d.ts"/>

function App() {

    useEffect(() => {
        // @ts-ignore
        const _viewer = new window.Communicator.WebViewer({
            containerId: "canvas",
            endpointUri: process.env.PUBLIC_URL + "input.scs",
        });
        _viewer.start();
        return () => {

        };
    }, []);

  return (
    <div id="canvas" className="App">

    </div>
  );
}

export default App;
