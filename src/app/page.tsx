"use client";

import React from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import Agenda from "./components/Agenda";
import exampleData from "./data/test-data.json";

const HomeContent: React.FC = () => {
  return (
    <>
      <Header />
      {/* TODO - BONUS - filter functionality */}
      {/* TODO - CSS to modules */}
      {/* TODO rename half-width 2 */}
      <Agenda fullWidth={true} activityMinHeight="25px" data={exampleData} />
      <Footer />
    </>
  );
};

export default HomeContent;
