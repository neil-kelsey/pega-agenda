import React, { createContext, useContext, useState } from "react";
import { EventData } from "../types/activities";

// Define the shape of the context data
interface AppContextProps {
  data: EventData;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
}

// Create the context with default values
const AppContext = createContext<AppContextProps>({
  data: { event: "", activities: [] },
  selectedDate: "",
  setSelectedDate: () => {},
});

// Create a custom hook to use the AppContext
export const useAppContext = () => useContext(AppContext);

// Define the props for AppProvider
interface AppProviderProps {
  children: React.ReactNode;
  data: EventData;
}

// Create a provider component
export const AppProvider: React.FC<AppProviderProps> = ({ children, data }) => {
  const uniqueDates = data.activities.map(activity => activity.startTime.split('T')[0]);
  const [selectedDate, setSelectedDate] = useState<string>(uniqueDates[0] || "");

  return (
    <AppContext.Provider value={{ data, selectedDate, setSelectedDate }}>
      {children}
    </AppContext.Provider>
  );
};
