import React from "react";
import { Route, Routes } from "react-router-dom";
import { CalendarPage } from "./pages/CalendarPage";
import { HomePage } from "./pages/HomePage";
import { NotFound } from "./pages/NotFound";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { Navigation } from "./navigation/Navigation";
import { InfoPage } from "./pages/InfoPage";
import { GooglePage } from "./pages/GooglePage";
import "bootstrap/dist/css/bootstrap.css"
import { OutlookPage } from "./pages/OutlookPage";




const App = () => {



  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/calendarPage" element={<CalendarPage />} />
        <Route path="/infoPage" element={<InfoPage />} />
        <Route path="/welcomeGoogle" element={<GooglePage />} />
        <Route path="/welcomeOutlook" element={<OutlookPage />} />

        <Route path="*" element={<NotFound />} />


      </Routes>
    </>
  );
}


export default App;
