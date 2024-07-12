import React, { useState, useRef, useEffect } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import { z } from 'zod';
import { Try } from '@2or3godzillas/fp-try';
import axios from 'axios';

const libraries: ['places'] = ['places'];
const googleMapsApiKey = import.meta.env.GOOGLE_PLACES_API_KEY;

export const GooglePlacesAutocomplete: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  useEffect(() => {
    if (!lat) return;
    if (!lng) return;

    axios.post('http://localhost:3000/weather', { lat, lng }, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      console.log(response);
    });
  }, [lat, lng]);

  const onPlaceChanged = () => {
    if (!autocompleteRef.current) return;

    // Googles own type here is wrong. (not wrong per se, but it didn't include | undefined)
    const place = autocompleteRef.current.getPlace() as google.maps.places.PlaceResult | undefined;

    if (place?.geometry?.location) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();

      setLat(lat);
      setLng(lng);
      setAddress(place.formatted_address || '');
    } else {
      const value = autocompleteRef.current.get('place')?.name;
      if (!value) return;

      const parse_result = Try(() =>
        z.string()
          .regex(/^-?\d+\.\d+, *-?\d+\.\d+$/)
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
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
      <Autocomplete
        onPlaceChanged={onPlaceChanged}
        onLoad={(autocomplete) => autocompleteRef.current = autocomplete}
      >
        <input
          type="search"
          placeholder=""
          value={address}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddress(e.target.value)}
          style={{ width: '100%', padding: '12px', boxSizing: 'border-box' }}
        />
      </Autocomplete>
      {(lat && lng) ? (
        <div>
          <h3>Coordinates</h3>
          <p>Latitude: {lat}</p>
          <p>Longitude: {lng}</p>
        </div>
      ) : null}
    </LoadScript>
  );
};
