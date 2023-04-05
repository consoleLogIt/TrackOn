import React, { useState } from "react";
import Calendar from "./components/calendar";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

export default function App() {
  const [layout, setLayout] = useState({ display: "Month", value: "month" });

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Header layout={layout} setLayout={setLayout} />
      <div style={{ display: "flex", flex: 1 }}>
        <Sidebar />
        <Calendar layout={layout}></Calendar>
      </div>
    </div>
  );
}
