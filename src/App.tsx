// import {WebViewer} = Communicator.WebViewer;
/// <reference path="./hoops_web_viewer.d.ts"/>

import React, {PropsWithChildren, useEffect} from 'react';
import './App.css';

import create, {SetState, GetState} from 'zustand'


export type RootState = {
    viewer?: Communicator.WebViewer;
    setViewer: (id: HTMLElement) => void
}

const createScene = async (container:HTMLElement): Promise<Communicator.WebViewer> => {
    const viewer = await new window.Communicator.WebViewer({
        container,
        endpointUri: process.env.PUBLIC_URL + "input.scs",
    });
    viewer.start();
    return viewer
}

const useStore = create<RootState>((set) => ({
    viewer: undefined,
    setViewer: async (id: HTMLElement) => set({viewer: await createScene(id)}),
}));

type Props = {

};

export const Canvas: React.FC<PropsWithChildren<Props>> = ({children})=> {
    const setViewer = useStore(state => state.setViewer)
    const element = React.useRef<HTMLElement | null>(null)
    const setRef = (node: HTMLElement | null) => {
        if (!node || element.current) {
            return
        }
        element.current = node
    }

    useEffect(() => {
        console.log("setting up scene")
        if(element.current){
            setViewer(element.current);
        }
    }, [element]);

    return (
        <div id="canvas" ref={setRef} className="App"/>
    );
};


function App() {

    return (
        <>
            <Canvas>
                <div>sdf</div>
            </Canvas>
        </>
    );
}

export default App;
