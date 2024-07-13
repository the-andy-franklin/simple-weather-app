import React, { useState, useRef, useEffect } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { z } from 'zod';
import { Try } from '@2or3godzillas/fp-try';
import axios from 'axios';
import { useWeatherStore, weather_schema } from '../zustand/weather-store';
import { env } from '../env';

const libraries: ['places'] = ['places'];
const googleMapsApiKey = env.VITE_GOOGLE_PLACES_API_KEY;

export const GooglePlacesAutocomplete: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const { setWeather } = useWeatherStore();

  useEffect(() => {
    if (!lat) return;
    if (!lng) return;

    axios.post<unknown>(`${env.VITE_API_URL}/weather`, { lat, lng }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(({ data }) => {
      const weather_data = weather_schema.parse(data);
      setWeather(weather_data);
    })
    .catch(console.error);
  }, [lat, lng]);

  // MARK: JS Loader
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey,
    libraries,
  });
  if (!isLoaded) return null;

  const onPlaceChanged = () => {
    const place = autocompleteRef.current?.getPlace();

    if (place?.geometry?.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      setLat(lat);
      setLng(lng);
      setAddress(place.formatted_address || '');
    } else {
      const value = autocompleteRef.current?.get('place')?.name;
      if (!value) return;

      const parse_result = Try(() =>
        z.string()
          .trim()
          .regex(/^-?\d+(\.\d+)?, *-?\d+(\.\d+)?$/)
          .transform((val) => val.split(',').map(parseFloat))
          .parse(value),
      );

      if (parse_result.failure) return;
      const [lat, lng] = parse_result.data;

      setLat(lat);
      setLng(lng);
      setAddress(value);
    }
  };

  return (
    <Autocomplete
      onPlaceChanged={onPlaceChanged}
      onLoad={(autocomplete) => autocompleteRef.current = autocomplete}
    >
      <input
        type="search"
        placeholder="Enter an address or lat, lng"
        value={address}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
        className="rounded-t w-full p-3 box-border"
      />
    </Autocomplete>
  );
};
