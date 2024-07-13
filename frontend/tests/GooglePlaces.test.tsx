import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { test, vi, expect } from 'vitest';
import axios from 'axios';
import { useWeatherStore } from '../src/zustand/weather-store';
import { GooglePlacesAutocomplete } from '../src/components/GooglePlacesAutocomplete';

vi.mock('../src/zustand/weather-store', async () => {
  const actual = await vi.importActual('../src/zustand/weather-store');
  const setWeatherMock = vi.fn();
  return {
    __esModule: true,
    ...actual,
    useWeatherStore: vi.fn(() => ({
      setWeather: setWeatherMock,
    })),
  };
});

vi.mock('axios');

vi.mock('@react-google-maps/api', () => {
  return {
    useJsApiLoader: vi.fn(() => ({ isLoaded: true })),
    Autocomplete: ({ children, onPlaceChanged, onLoad }: { children: React.ReactNode, onPlaceChanged: () => void, onLoad: (autocomplete: google.maps.places.Autocomplete) => void }) => {
      return (
        <div>
          {children}
          <button
            data-testid="load-autocomplete"
            onClick={() => onLoad({
              getPlace: () => ({
                geometry: {
                  location: {
                    lat: () => 34.0522,
                    lng: () => -118.2437,
                    equals: vi.fn(),
                    toJSON: vi.fn(),
                    toUrlValue: vi.fn(),
                  },
                },
                formatted_address: 'Los Angeles, CA',
              }),
              get: () => ({ name: '34.0522, -118.2437' }),
              set: vi.fn(),
              setValues: vi.fn(),
              getBounds: vi.fn(),
              setBounds: vi.fn(),
              getFields: vi.fn(),
              setFields: vi.fn(),
              setOptions: vi.fn(),
              setTypes: vi.fn(),
              setComponentRestrictions: vi.fn(),
              addListener: vi.fn(),
              bindTo: vi.fn(),
              unbind: vi.fn(),
              unbindAll: vi.fn(),
              notify: vi.fn(),
            })}
          >
            Load Autocomplete
          </button>
          <button onClick={onPlaceChanged} data-testid="place-changed">Place Changed</button>
        </div>
      );
    },
  };
});

test('renders GooglePlacesAutocomplete and interacts correctly', async () => {
  const { setWeather } = useWeatherStore();
  const mockPost = vi.spyOn(axios, 'post').mockResolvedValue({
    data: { weather: 'sunny' },
  });

  render(<GooglePlacesAutocomplete />);

  fireEvent.click(screen.getByTestId('load-autocomplete'));

  fireEvent.change(screen.getByPlaceholderText('Enter an address or lat, lng'), {
    target: { value: 'Los Angeles, CA' },
  });

  fireEvent.click(screen.getByTestId('place-changed'));

  await waitFor(() => {
    expect(mockPost).toHaveBeenCalledWith(
      'http://localhost:3000/weather',
      { lat: 34.0522, lng: -118.2437 },
      { headers: { 'Content-Type': 'application/json' } },
    );
  });

  expect(setWeather).toHaveBeenCalledWith({ weather: 'sunny' });
});
