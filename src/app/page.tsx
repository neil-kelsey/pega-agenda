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
      {/* TODO - CSS to modules */}
      {/* TODO - filter panel responsive styling */}
      {/* TODO - delete unneeded files - images etc, CSS modules*/}
      {/* TODO - remove 0 minutes thingy */}
      <Agenda fullWidth={true} activityMinHeight="25px" data={exampleData} />
      <Footer />
    </>
  );
};

export default HomeContent;
