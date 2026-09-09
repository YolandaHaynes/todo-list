import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

function ProfilePage() {
  const { user, token } = useAuth();

  const [todoStats, setTodoStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


    useEffect(() => {
    async function fetchTodoStats() {
        if (!token) return;

        try {
        setLoading(true);
        setError('');

        const options = {
            method: 'GET',
            headers: {
            'X-CSRF-TOKEN': token,
            },
            credentials: 'include',
        };

        const response = await fetch('/api/tasks?limit=100', options);

        if (response.status === 401) {
            throw new Error('Unauthorized');
        }

        if (!response.ok) {
            throw new Error('Failed to fetch todo');
        }

        const data = await response.json();
        const todos = data.tasks;
        const total = todos.length;
        const completed = todos.filter((todo) => todo.isCompleted).length;
        const active = total - completed;

        setTodoStats({ total, completed, active});
        }catch(error){
            setError(`Error loading statistics: ${error.message}`);
        }finally {
            setLoading(false);
        }
    }

    fetchTodoStats();
    }, [token]);


  return (
    <main>
      <h1>Profile Page</h1>

      {loading && <p>Loading statistics...</p>}

      {error && <p>{error}</p>}

      <p>Total todos: {todoStats.total}</p>
      <p>Completed todos: {todoStats.completed}</p>
      <p>Active todos: {todoStats.active}</p>
    </main>
  );
}
export default ProfilePage;
