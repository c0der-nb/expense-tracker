import './App.css';
import { Outlet } from 'react-router-dom';

export const config = {
  endpoint: "http://localhost:5000",
}

function App() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
