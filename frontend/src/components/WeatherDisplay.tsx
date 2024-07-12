import React, { useEffect, useState } from 'react';
import { useWeatherStore } from '../zustand/store';
import axios from 'axios';
import UpArrow from '/up-arrow.svg';

export const WeatherDisplay: React.FC = () => {
  const [image, setImage] = useState<string>('');
  const { weather } = useWeatherStore();

  useEffect(() => {
    if (!weather.icon) return;

    axios.get(`https://openweathermap.org/img/wn/${weather.icon}.png`, {
      responseType: 'arraybuffer',
    }).then(({ data }) => {
      const base64 = btoa(
        new Uint8Array(data).reduce((data, byte) => data + String.fromCharCode(byte), ''),
      );

      setImage(`data:image/png;base64,${base64}`);
    });
  }, [weather]);

  return (
    <div className="
      w-full
      h-full
      grid
      grid-cols-1
      sm:grid-cols-2
      sm:grid-rows-3
      md:grid-cols-3
      md:grid-rows-2
      md:grid-flow-col
      justify-items-center
      gap-4
      p-4
      text-white"
    >
      <div className="w-full h-24 bg-white rounded text-black flex flex-col justify-center">
        { weather.temp !== undefined &&
          <>
            <p className="text-lg">Temp</p>
            <p className="text-lg">{weather.temp} °C</p>
            <p className="text-lg">{(weather.temp * (9/5) + 32).toFixed(2)} °F</p>
          </>
        }
      </div>
      <div className="w-full h-24 bg-white rounded text-black flex flex-col justify-center">
        { weather.feels_like !== undefined &&
          <>
            <p className="text-lg">Feels Like</p>
            <p className="text-lg">{weather.feels_like} °C</p>
            <p className="text-lg">{(weather.feels_like * (9/5) + 32).toFixed(2)} °F</p>
          </>
        }
      </div>
      <div className="w-full h-24 bg-white rounded text-black flex flex-col justify-center">
        {weather.weather}
        {image && <img src={image} className="w-16 h-16 self-center" style={{ transform: `scale(1.5)` }} />}
      </div>
      <div className="w-full h-24 bg-white rounded text-black flex flex-col justify-center">
        { weather.clouds != null &&
          <>
            <p className="text-md mb-1">Cloud Coverage</p>
            <p className="text-2xl">{weather.clouds}%</p>
          </>
        }
      </div>
      <div className="w-full h-24 bg-white rounded text-black flex flex-col justify-center">
        { weather.wind_speed &&
          <>
            <p className="text-lg">Wind</p>
            <div className="w-full h-12 flex justify-center">
              { weather.wind_deg &&
                <img src={UpArrow} className="text-white w-8 h-8 m-4 self-center"
                  style={{ rotate: `${weather.wind_deg}deg` }}
                />
              }
              <p className="flex items-end text-lg align-center flex items-center">{weather.wind_speed} mph</p>
            </div>
          </>
        }
      </div>
      <div className="w-full h-24 bg-white rounded text-black flex flex-col justify-center">
        { weather.humidity &&
          <>
            <p className="text-lg">Humidity</p>
            <p className="text-2xl">
              {weather.humidity}%
            </p>
          </>
        }
      </div>
    </div>
  );
};
