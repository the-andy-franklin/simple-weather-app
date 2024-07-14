import React from 'react';
import { useWeatherStore } from '../zustand/weather-store';
import { nonNullish } from '../utils/functions/nonNullish';
import UpArrow from '/up-arrow.svg';

export const WeatherDisplay: React.FC = () => {
  const { weather } = useWeatherStore();
  if (!weather) return null;

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
      gap-4
      p-4
    ">
      <div className="w-full h-24 bg-white rounded text-black flex flex-col justify-center">
        { nonNullish(weather.temp) &&
          <>
            <p className="text-lg">Temp</p>
            <p className="text-lg">{weather.temp.toFixed(2)} °C</p>
            <p className="text-lg">{(weather.temp * (9/5) + 32).toFixed(2)} °F</p>
          </>
        }
      </div>
      <div className="w-full h-24 bg-white rounded text-black flex flex-col justify-center">
        { nonNullish(weather.feels_like) &&
          <>
            <p className="text-lg">Feels Like</p>
            <p className="text-lg">{weather.feels_like.toFixed(2)} °C</p>
            <p className="text-lg">{(weather.feels_like * (9/5) + 32).toFixed(2)} °F</p>
          </>
        }
      </div>
      <div className="w-full h-24 bg-white rounded text-black flex flex-col justify-center">
        <p className="text-lg">{weather.weather}</p>
        {weather.icon && (
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
            className="w-16 h-16 self-center"
            style={{ transform: `scale(1.5)` }}
          />
        )}
      </div>
      <div className="w-full h-24 bg-white rounded text-black flex flex-col justify-center">
        { nonNullish(weather.clouds) &&
          <>
            <p className="text-lg">Cloud Coverage</p>
            <p className="text-2xl">{weather.clouds}%</p>
          </>
        }
      </div>
      <div className="w-full h-24 bg-white rounded text-black flex flex-col justify-center items-center">
        { nonNullish(weather.wind_speed) &&
          <>
            <p className="text-lg">Wind</p>
            <div className="w-16 sm:w-full h-12 flex justify-center gap-2">
              { nonNullish(weather.wind_deg) &&
                !!weather.wind_speed &&
                <img src={UpArrow} className="text-white w-8 h-8 m-4 self-center m-0"
                  style={{ rotate: `${weather.wind_deg}deg` }}
                />
              }
              <p className="flex items-end text-lg align-center items-center">{weather.wind_speed} mph</p>
            </div>
          </>
        }
      </div>
      <div className="w-full h-24 bg-white rounded text-black flex flex-col justify-center">
        { nonNullish(weather.humidity) &&
          <>
            <p className="text-lg">Humidity</p>
            <p className="text-2xl">{weather.humidity}%</p>
          </>
        }
      </div>
    </div>
  );
};
