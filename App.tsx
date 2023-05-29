import { Navigation } from "./src/navigation/Navigation";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
