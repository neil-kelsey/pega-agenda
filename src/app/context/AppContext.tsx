import React, { createContext, useContext, useState } from "react";
import { EventData } from "../types/activities";
import exampleData from "../data/test-data.json";

// Define the shape of the context data
interface AppContextProps {
  data: EventData;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

// Create the context with default values
const AppContext = createContext<AppContextProps>({
  data: exampleData,
  selectedDate: "",
  setSelectedDate: () => {},
});

// Create a custom hook to use the AppContext
export const useAppContext = () => useContext(AppContext);

// Create a provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const data: EventData = exampleData;
  const uniqueDates = data.activities.map(activity => activity.startTime.split('T')[0]);
  const [selectedDate, setSelectedDate] = useState<string>(uniqueDates[0]);

  return (
    <AppContext.Provider value={{ data, selectedDate, setSelectedDate }}>
      {children}
    </AppContext.Provider>
  );
};
