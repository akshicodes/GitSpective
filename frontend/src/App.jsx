import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Repository from "./pages/Repository";
import Repositories from "./pages/Repositories";
import Analytics from "./pages/Analytics";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard/:username" element={<Dashboard />} />
        <Route path="/repositories/:username" element={<Repositories />} />
        <Route path="/analytics/:username" element={<Analytics />} />
        <Route path="/repository/:username/:repoName" element={<Repository />} />
      </Routes>
    </>
  );
}
