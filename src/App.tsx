import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';

import { TodoList } from '@/components';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
      <footer className="footer">
        <p>Developed by Tai Tran</p>
      </footer>
    </QueryClientProvider>
  );
}

export default App;
