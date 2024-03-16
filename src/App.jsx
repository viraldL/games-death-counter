import DeathCounter from './DeathCounter'
import BackgroundChanger from './BackgroundChager';
import './sass/App.sass'

function App() {
  return (<>
    <BackgroundChanger/>
    <div>
      <BackgroundChanger/>
      <DeathCounter />
    </div>
    </>
  );
}

export default App
