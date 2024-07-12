import { GooglePlacesAutocomplete } from './GooglePlacesAutocomplete';
import './App.css';
import 'virtual:windi.css';

function App() {
  return (
    <div className="w-screen h-screen flex flex-col">
      <nav className="w-full h-16 bg-blue-500 text-5xl">Weather App</nav>
      <div className="w-full h-full flex justify-center items-center bg-gray-800 text-white">
        <div className="w-64 h-64 bg-blue-500">
          <GooglePlacesAutocomplete />
        </div>
      </div>
    </div>
  );
}

export default App;
