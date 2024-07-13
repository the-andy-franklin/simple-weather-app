import { z } from 'zod';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const weather_schema = z.object({
  wind_speed: z.number(),
  wind_deg: z.number(),
  weather: z.string(),
  icon: z.string(),
  clouds: z.number(),
  temp: z.number(),
  humidity: z.number(),
  feels_like: z.number(),
}).partial();

export type Weather = z.infer<typeof weather_schema>;

export const useWeatherStore = create<{
  weather: Weather | null;
  setWeather: (weather: Weather) => void;
  clearData: () => void;
}, [["zustand/persist", unknown]]>(
  persist(
    (set, get) => ({
      weather: get()?.weather,
      setWeather: (weather: Weather) => set({ weather }),
      clearData: () => set({ weather: null }),
    }),
    {
      name: 'weather_store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
