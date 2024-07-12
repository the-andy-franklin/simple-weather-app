import { z } from 'zod';
import { create } from 'zustand';

export const weather_schema = z.object({
  wind_speed: z.number().optional(),
  wind_deg: z.number().optional(),
  weather: z.string().optional(),
  icon: z.string().optional(),
  clouds: z.number().optional(),
  temp: z.number().optional(),
  humidity: z.number().optional(),
  feels_like: z.number().optional(),
});

export type Weather = z.infer<typeof weather_schema>;

export const useWeatherStore = create<{
  weather: Partial<Weather>;
  setWeather: (weather: Partial<Weather>) => void;
  clearData: () => void;
}>((set) => ({
  weather: {} as Partial<Weather>,
  setWeather: (weather: Partial<Weather>) => set({ weather }),
  clearData: () => set({ weather: {} }, true),
}));
