import { z } from 'zod';
import { create } from 'zustand';

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
}>((set) => ({
    weather: null,
    setWeather: (weather: Weather) => set((state) => ({ ...state, weather }), true),
  }),
);
