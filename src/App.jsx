import { useEffect, useState } from "react";
import AddSection from "./app/sections/add-section/add-section";
import Sections from "./app/sections/sections";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./app/home/home";
import Nav from "./app/nav/nav";
import {
  AppStateContext,
  SetAppStateContext,
} from "./app/components/appContext";

function App() {
  const [appState, setAppState] = useState({
    itemToEdit: {},
  });

  // useEffect(() => {
  //   async function fetchAll() {
  //     const resp = await SectionsAPI.getAll();

  //     SetSections(resp);
  //   }

  //   fetchAll();
  // }, []);

  return (
    <div className="App">
      <AppStateContext.Provider value={appState}>
        <SetAppStateContext.Provider value={setAppState}>
          <Nav />
        </SetAppStateContext.Provider>
      </AppStateContext.Provider>
    </div>
  );
}

export default App;
