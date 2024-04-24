import Header from "@/components/partials/Header";
import Navigation from "@/components/partials/Navigation";
import React from "react";

const Settings = () => {
  return (
    <>
      <Header avatar="AG" />
      <div className="flex gap-3 min-h-[calc(100vh-50px)]">
        <Navigation menu="settings" submenu="departments" />
      </div>
    </>
  );
};

export default Settings;
