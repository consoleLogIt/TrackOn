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
  const [filters, setFilters] = useState({});

  console.log({ localState, filters });

  const handleFiltersChange = (id, value) => {
    if (value === false) {
      setFilters((prev) => {
        delete prev[id];
        return { ...prev };
      });
    } else {
      setFilters((prev) => ({ ...prev, [id]: value }));
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <ContextProvider>
        <DndProvider debugMode={true} backend={HTML5Backend}>
          <Header layout={layout} setLayout={setLayout} />
          <div style={{ display: "flex", flex: 1 }}>
            <Sidebar onChange={handleFiltersChange} filters={filters} />
            <Calendar
              localState={
                Object.keys(filters).length === 0
                  ? localState
                  : localState.filter(
                      (d) => filters[d.type.value] || filters[d.color]
                    )
              }
              setLocalState={setLocalState}
              layout={layout}
            ></Calendar>
          </div>
        </DndProvider>
      </ContextProvider>
    </div>
  );
}
