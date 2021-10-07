// import {WebViewer} = Communicator.WebViewer;
/// <reference path="./hoops_web_viewer.d.ts"/>

import React, {useEffect, useLayoutEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import create, {SetState, GetState} from 'zustand'


export type RootState = {
    viewer?: Communicator.WebViewer;
    setViewer: (id: string) => void
}

const createScene = async (containerId: string): Promise<Communicator.WebViewer> => {
    const viewer = await new window.Communicator.WebViewer({
        containerId: "canvas",
        endpointUri: process.env.PUBLIC_URL + "input.scs",
    });
    viewer.start();
    return viewer
}

const useStore = create<RootState>((set) => ({
    viewer: undefined,
    setViewer: async (id: string) => set({viewer: await createScene(id)}),
}));

type Props = {
};

export function Canvas(props: Props) {
    const setViewer = useStore(state => state.setViewer)
    useEffect(() => {
        console.log("setting up scene")
        setViewer("canvas");
    }, []);

    return (
        <div id="canvas" className="App"/>
    );
};

function App() {

    return (
        <>
            <Canvas />
        </>
    );
}

export default App;
