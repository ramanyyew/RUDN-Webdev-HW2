import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { useTasks } from '../../hooks/useTasks';
import Card from '../../components/Card/Card';
import { statusText } from '../../types/task';
import type { Task } from '../../types/task';

const StatusColumn = ({ title, taskItems }: { title: string; taskItems: Task[] }) => {
  const isEmpty = taskItems.length === 0;

  return (
    <Box>
      <Typography 
        variant="h6" 
        component="h2" 
        sx={{ 
          fontWeight: 600, 
          pb: 1.5,
          mb: 2,
          borderBottom: '2px solid #1976d2',
          fontSize: '1.1rem',
        }}
      >
        {title}
      </Typography>
      {isEmpty === true ? (
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mt: 2,
            fontStyle: 'italic',
          }}
        >
          Нет задач
        </Typography>
      ) : (
        taskItems.map(taskItem => {
          return (
            <Card key={taskItem.id} task={taskItem} />
          );
        })
      )}
    </Box>
  );
};

const Main = () => {
  const { tasks, isLoading } = useTasks();

  const getTasksByStatus = (statusValue: number) => {
    const result: Task[] = [];
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].status === statusValue) {
        result.push(tasks[i]);
      }
    }
    return result;
  };

  const pendingTasks = getTasksByStatus(0);
  const activeTasks = getTasksByStatus(1);
  const finishedTasks = getTasksByStatus(2);

  if (isLoading === true) {
    return (
      <Container sx={{ mt: 6, textAlign: 'center' }}>
        <CircularProgress 
          size={40}
          thickness={4}
          sx={{ color: '#1976d2' }}
        />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          fontWeight: 600, 
          mb: 4,
          fontSize: '2rem',
        }}
      >
        Все задачи
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
          gap: 4,
        }}
      >
        <StatusColumn title={statusText[0]} taskItems={pendingTasks} />
        <StatusColumn title={statusText[1]} taskItems={activeTasks} />
        <StatusColumn title={statusText[2]} taskItems={finishedTasks} />
      </Box>
    </Container>
  );
};

export default Main;
