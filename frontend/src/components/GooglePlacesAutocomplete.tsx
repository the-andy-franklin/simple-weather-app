import React, { useState, useRef, useEffect } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import { useWeatherStore, weather_schema } from '../zustand/weather-store';
import { env } from '../env';
import { isNullish } from '../utils/functions/isNullish';
import { libraries } from '../consts';

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
    }
  };

  return (
    <Autocomplete
      onPlaceChanged={onPlaceChanged}
      onLoad={(autocomplete) => autocompleteRef.current = autocomplete}
    >
      <input
        type="search"
        placeholder="Enter an address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        className="rounded-t w-full p-3 box-border"
      />
    </Autocomplete>
  );
};
