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
      {/* TODO - modal */}
      {/* TODO - colour guide modal */}
      {/* TODO - full width toggle functionality too? */}
      {/* TODO - full width category-2 on list view? */}
      {/* TODO - BONUS - filter functionality */}
      <Agenda activityMinHeight="25px" data={exampleData} />
      <Footer />
    </>
  );
};

export default HomeContent;
