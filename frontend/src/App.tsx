import { GooglePlacesAutocomplete } from './components/GooglePlacesAutocomplete';
import { WeatherDisplay } from './components/WeatherDisplay';
import './App.css';

function App() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <nav className="w-full h-16 sm:text-5xl text-3xl whitespace-nowrap navbar">Weather App</nav>
      <div className="w-full h-full flex justify-center items-center bg-gray-800 text-white">
        <div className="max-w-xl w-full min-h-72 bg-blue-500 rounded mx-4">
          <GooglePlacesAutocomplete />
          <WeatherDisplay />
        </div>
      </div>
    </div>
  );
}

export default App;
