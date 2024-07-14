import React, { useState, useRef, useEffect } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import { z } from 'zod';
import { Try } from '@2or3godzillas/fp-try';
import axios from 'axios';
import { useWeatherStore, weather_schema } from '../zustand/weather-store';
import { env } from '../env';
import { isNullish } from '../utils/functions/isNullish';

const libraries: ['places'] = ['places'];
const googleMapsApiKey = env.VITE_GOOGLE_PLACES_API_KEY;

export const GooglePlacesAutocomplete: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [{ lat, lng }, setCoords] = useState<{ lat?: number; lng?: number; }>({});
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const { setWeather } = useWeatherStore();

  useEffect(() => {
    if (isNullish(lat)) return;
    if (isNullish(lng)) return;

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

      setCoords({ lat, lng });
      setAddress(place.formatted_address ?? '');
    } else {
      const name = Try(() =>
        z.string().parse(autocompleteRef.current?.get('place')?.name,
      ));
      if (name.failure) return;

      const coordinates = Try(() =>
        z.string()
          .trim()
          .regex(/^-?\d+(\.\d+)?, *-?\d+(\.\d+)?$/)
          .transform((val) => val.split(/, */).map(parseFloat))
          .parse(name.data),
      );
      if (coordinates.failure) return;
      const [lat, lng] = coordinates.data;

      setCoords({ lat, lng });
      setAddress(name.data);
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
