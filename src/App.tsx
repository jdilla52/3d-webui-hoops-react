// import {WebViewer} = Communicator.WebViewer;
/// <reference path="./hoops_web_viewer.d.ts"/>

import React, {PropsWithChildren, useEffect, useState} from 'react';
import './App.css';

import create, {SetState, GetState} from 'zustand'


export type RootState = {
    viewer?: Communicator.WebViewer;
    setViewer: (id: HTMLElement) => void
}

const createScene = async (container: HTMLElement): Promise<Communicator.WebViewer> => {
    const viewer = await new window.Communicator.WebViewer({
        container,
    });
    viewer.start();
    await new Promise<void>((resolve) => {
        viewer.setCallbacks({
            sceneReady: () => {
                viewer.view.setBackgroundColor(Communicator.Color.createFromFloatArray([0.121, 0.129, 0.149]), Communicator.Color.createFromFloatArray([0.929, 0.933, 0.952]));

                },
            modelStructureReady: () => {
                resolve();
            },

            selectionArray: (v, a) => {
            },
        });
        return viewer
    });
    return viewer
}

const useStore = create<RootState>((set, get) => ({
    viewer: undefined,
    setViewer: async (id: HTMLElement) => set({viewer: await createScene(id)}),
}));

type Props = {};

export const Canvas: React.FC<PropsWithChildren<Props>> = ({children}) => {
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
        if (element.current) {
            setViewer(element.current);
        }
    }, [element]);

    return (
        <div id="canvas" ref={setRef} className="App">
            {children}
        </div>
    );
};

type ScsUrlObjectProps = {
    url: string;
}

export const ScsUrlObject: React.FC<PropsWithChildren<ScsUrlObjectProps> > = ({url}) =>{
    const viewer = useStore(state => state.viewer);
    useEffect(() => {
        if (viewer) {
            const n = viewer.model.createNode(-2, "");
            const _ = viewer.model.loadSubtreeFromScsFile(n, url);
            return () => {
                viewer?.model.deleteNode(n);
            };
        }
    }, [viewer, url]);

    return (
       <></>
    );
};

function App() {
    const [show, setShow] = useState(false);
    return (
        <>
            <Canvas>
                {show ? <ScsUrlObject url={process.env.PUBLIC_URL + "input.scs"}/> : null}
                <button onClick={()=> setShow(!show)}>show</button>
            </Canvas>
        </>
    );
}

export default App;
