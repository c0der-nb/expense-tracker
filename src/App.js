import './App.css';
import { Outlet } from 'react-router-dom';

export const config = {
  endpoint: "https://expense-tracker-rest.onrender.com"
}

function App() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
