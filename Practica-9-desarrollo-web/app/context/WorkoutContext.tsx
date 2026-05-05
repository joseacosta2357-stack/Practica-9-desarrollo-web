import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type WorkoutSet = {
  id: string;
  weight: string;
  reps: string;
  completed: boolean;
};

export type Exercise = {
  id: string;
  name: string;
  sets: WorkoutSet[];
};

export type WorkoutSession = {
  id: string;
  name: string;
  date: string;
  durationMs: number;
  exercises: Exercise[];
  volume: number;
  records: number;
};

type WorkoutContextType = {
  history: WorkoutSession[];
  saveWorkout: (session: WorkoutSession) => Promise<void>;
  clearHistory: () => Promise<void>;
};

export const WorkoutContext = createContext<WorkoutContextType>({
  history: [],
  saveWorkout: async () => {},
  clearHistory: async () => {},
});

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
  const [history, setHistory] = useState<WorkoutSession[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const storedHistory = await AsyncStorage.getItem('@workout_history');
        if (storedHistory) {
          setHistory(JSON.parse(storedHistory));
        }
      } catch (e) {
        console.error('Failed to load history', e);
      }
    };
    loadHistory();
  }, []);

  const saveWorkout = async (session: WorkoutSession) => {
    try {
      const updatedHistory = [session, ...history];
      setHistory(updatedHistory);
      await AsyncStorage.setItem('@workout_history', JSON.stringify(updatedHistory));
    } catch (e) {
      console.error('Failed to save workout', e);
    }
  };

  const clearHistory = async () => {
    try {
      setHistory([]);
      await AsyncStorage.removeItem('@workout_history');
    } catch (e) {
      console.error('Failed to clear history', e);
    }
  };

  return (
    <WorkoutContext.Provider value={{ history, saveWorkout, clearHistory }}>
      {children}
    </WorkoutContext.Provider>
  );
};
