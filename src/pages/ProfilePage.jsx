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

        const firstResponse = await fetch('/api/tasks', options);

        if (firstResponse.status === 401) {
            throw new Error('Unauthorized');
        }


        if (!firstResponse.ok) {
            throw new Error('Failed to fetch todo');
        }
        
        const firstData = await firstResponse.json();
        let allTasks = [...firstData.tasks];
        const totalPages = firstData.pagination.pages;

        for (let page = 2; page <= totalPages; page++) {
          const pageResponse = await fetch(`/api/tasks?page=${page}`, options);

          if (pageResponse.status === 401) {
            throw new Error('Unauthorized');
          }
          if (!pageResponse.ok) {
            throw new Error('Failed to fetch todo');
          }

        const pageData = await pageResponse.json();
        allTasks = allTasks.concat(pageData.tasks);
        }


        const total = firstData.pagination.total;
        const completed = allTasks.filter((todo) => todo.isCompleted).length;
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
      <h1>{user}'s Profile Page</h1>

      {loading && <p>Loading statistics...</p>}

      {error && <p>{error}</p>}
      
      <p>Status: {token ? 'Logged in' : 'Logged out'}</p>
      <p>Total todos: {todoStats.total}</p>
      <p>Completed todos: {todoStats.completed}</p>
      <p>Active todos: {todoStats.active}</p>
    {todoStats.total > 0 && (
        <p>Completion: {Math.round((todoStats.completed / todoStats.total) * 100)}%</p>
        )}
    </main>
  );
}
export default ProfilePage;
