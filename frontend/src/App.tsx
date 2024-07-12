import { GooglePlacesAutocomplete } from './components/GooglePlacesAutocomplete';
import './App.css';
import 'virtual:windi.css';
import { WeatherDisplay } from './components/WeatherDisplay';

function App() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <nav className="w-full h-16 text-5xl navbar">Weather App</nav>
      <div className="w-full h-full flex justify-center items-center bg-gray-800 text-white">
        <div className="max-w-md w-full min-h-72 bg-blue-500">
          <GooglePlacesAutocomplete />
          <WeatherDisplay />
        </div>
      </div>
    </div>
  );
}

export default App;
