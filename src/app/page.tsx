"use client";

import React from "react";
import { AppProvider } from "./context/AppContext";
import Header from './components/Header';
import Footer from './components/Footer';
import Agenda from "./components/Agenda";

export default function Home() {
  return (
    <AppProvider>
      <HomeContent />
    </AppProvider>
  );
}

const HomeContent: React.FC = () => {
  return (
    <>
      <Header />
      <Agenda activityMinHeight="25px" />
      <Footer />
    </>
  );
};
