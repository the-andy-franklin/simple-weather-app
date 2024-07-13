import { render, screen } from '@testing-library/react';
import { test, vi, Mock, expect } from 'vitest';

import { useWeatherStore } from '../src/zustand/weather-store';
import { WeatherDisplay } from '../src/components/WeatherDisplay';

vi.mock('../src/zustand/weather-store', () => {
  return {
    __esModule: true,
    useWeatherStore: vi.fn(),
  };
});

test('renders mocked weather from Zustand store', () => {
  const mockedState = { weather: { weather: 'cloudy' } };
  (useWeatherStore as unknown as Mock).mockReturnValue(mockedState);

  render(<WeatherDisplay />);
  expect(screen.getByText('cloudy')).toBeInTheDocument();
});
