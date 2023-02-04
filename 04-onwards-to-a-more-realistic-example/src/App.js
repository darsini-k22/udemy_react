import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequests: fetchTasks } = useHttp();

  useEffect(() => {

    const transformedTask = (tasks) => {
      const loadTasks = [];
      for (const i in tasks) {
        loadTasks.push({
          id: i,
          tasks: tasks[i].text
        })
      }
      setTasks(loadTasks);
    }
    fetchTasks({ url: "https://tasks-ad37c-default-rtdb.firebaseio.com/tasks.json" }, transformedTask);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };



  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
