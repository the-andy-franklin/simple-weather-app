import { GooglePlacesAutocomplete } from './components/GooglePlacesAutocomplete';
import { WeatherDisplay } from './components/WeatherDisplay';
import './App.css';

const App = () => (
  <div className="w-screen h-screen flex flex-col">
    <nav className="navbar w-full min-h-16 text-3xl sm:text-5xl flex justify-center pb-1">
      <p className="self-center">Weather App</p>
    </nav>
    <div className="w-full h-full flex justify-center items-center bg-gray-800 text-white">
      <div className="max-w-xl w-full bg-blue-500 rounded mx-4">
        <GooglePlacesAutocomplete />
        <WeatherDisplay />
      </div>
    </div>
  </div>
);

export default App;
