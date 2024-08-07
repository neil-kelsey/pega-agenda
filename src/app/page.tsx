"use client";

import React from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import Agenda from "./components/Agenda";

const HomeContent: React.FC = () => {
  return (
    <>
      <Header />
      <Agenda activityMinHeight="25px" />
      <Footer />
    </>
  );
};

export default HomeContent;
