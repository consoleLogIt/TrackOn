import React, { useState } from "react";
import Calendar from "./components/calendar";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import ContextProvider from "./context";

export default function App() {
  const [layout, setLayout] = useState({ display: "Week", value: "week" });

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <ContextProvider>
      <Header layout={layout} setLayout={setLayout} />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <Calendar layout={layout}></Calendar>
      </div>
      </ContextProvider>
    </div>
  );
}
