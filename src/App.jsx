import React, { useState } from "react";
import Calendar from "./components/calendar";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import ContextProvider from "./context";

export default function App() {
  const [layout, setLayout] = useState({ display: "Day", value: "day" });
  const [localState, setLocalState] = useState({
    // "18_3_2023": {
    //   events: [
    //     {
    //       title: "Some text Some text ",
    //       timeRange: ["04:30", "06:15"],
    //       color: "red",
    //     },
    //     { title: "Some text", timeRange: ["10:30", "18:15"], color: "blue" },
    //   ],
    // },
    // "19_3_2023": {
    //   events: [
    //     {
    //       title: "Some text Some text ",
    //       timeRange: ["04:30", "06:15"],
    //       color: "red",
    //     },
    //     { title: "Some text", timeRange: ["10:30", "18:15"], color: "blue" },
    //   ],
    // },
  });

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <ContextProvider>
        <Header layout={layout} setLayout={setLayout} />
        <div style={{ display: "flex", flex: 1 }}>
          <Sidebar />
          <Calendar
            localState={localState}
            setLocalState={setLocalState}
            layout={layout}
          ></Calendar>
        </div>
      </ContextProvider>
    </div>
  );
}
