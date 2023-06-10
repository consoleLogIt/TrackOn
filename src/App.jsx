import React, { useState } from "react";
import Calendar from "./components/calendar";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import ContextProvider from "./context";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function App() {
  const [layout, setLayout] = useState({ display: "Week", value: "week" });
  const [localState, setLocalState] = useState([]);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <ContextProvider>
        <DndProvider debugMode={true} backend={HTML5Backend}>
        <Header layout={layout} setLayout={setLayout} />
        <div style={{ display: "flex", flex: 1 }}>
          <Sidebar />
          <Calendar
            localState={localState}
            setLocalState={setLocalState}
            layout={layout}
          ></Calendar>
        </div>
        </DndProvider>
      </ContextProvider>
    </div>
  );
}
