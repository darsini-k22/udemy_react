import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/use-http';

const NewTask = (props) => {
  const { isLoading, error, sendRequests: sendDataReq } = useHttp();


  const createData = (tasksText) => {
    const data = {
      id: tasksText.name,
      text: tasksText
    }
    props.onAddTask(data)
  }
  const enterTaskHandler = async (tasks) => {


    sendDataReq({
      url: "https://tasks-ad37c-default-rtdb.firebaseio.com/tasks.json",
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: { text: tasks },
    }, createData.bind(null,tasks))

    console.log(tasks)

  }

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
