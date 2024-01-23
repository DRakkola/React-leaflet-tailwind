
import { Routes } from './routes';


const App = () => {
  return (
    <div className='h-screen w-screen bg-slate-50'>

      <Routes isAuthorized={true} />
    </div>
  );
}

export default App;
