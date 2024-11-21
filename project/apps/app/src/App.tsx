import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import store from './store';
import './styles/main.css';
import List from './components/List';

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <div>
          <h1>Pokemon List</h1>
          <List />
        </div>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
