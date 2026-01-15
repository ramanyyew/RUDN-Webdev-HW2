import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  Button,
  Box,
  Chip,
  Divider,
} from '@mui/material';
import { useTask, useTasks } from '../../hooks/useTasks';
import { statusText } from '../../types/task';
import type { Status } from '../../types/task';

const FieldLabel = ({ children }: { children: React.ReactNode }) => (
  <Typography 
    variant="subtitle2" 
    color="text.secondary" 
    sx={{ 
      fontWeight: 600,
      mb: 0.5,
      textTransform: 'uppercase',
      fontSize: '0.75rem',
      letterSpacing: '1px',
    }}
  >
    {children}
  </Typography>
);

const View = () => {
  const params = useParams<{ id: string }>();
  const navigate = useNavigate();
  const taskId = params.id ? parseInt(params.id, 10) : 0;
  const { task, isLoading } = useTask(taskId);
  const { updateStatus, deleteTask } = useTasks();

  const onStatusUpdate = (statusValue: Status) => {
    updateStatus(
      { id: taskId, status: statusValue },
      {
        onSuccess: () => {
          navigate('/');
        },
      }
    );
  };

  const onTaskDelete = () => {
    const userConfirmed = window.confirm('Вы уверены, что хотите удалить эту задачу?');
    if (userConfirmed === true) {
      deleteTask(taskId, {
        onSuccess: () => {
          navigate('/');
        },
      });
    } else {
      return;
    }
  };

  if (isLoading === true) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="body1">Загрузка...</Typography>
      </Container>
    );
  }

  if (task === undefined || task === null) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="body1" color="error">
          Задача не найдена
        </Typography>
      </Container>
    );
  }

  const availableStatuses: Status[] = [0, 1, 2];

  const getColorForStatus = (statusValue: Status): string => {
    if (statusValue === 0) {
      return '#424242';
    }
    if (statusValue === 1) {
      return '#1976d2';
    }
    if (statusValue === 2) {
      return '#2e7d32';
    }
    return '#424242';
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          fontWeight: 600, 
          mb: 3,
          fontSize: '2rem',
        }}
      >
        Задача № {task.id}
      </Typography>
      <Paper 
        elevation={0}
        sx={{ 
          p: 4, 
          mt: 3, 
          backgroundColor: '#252525', 
          border: '1px solid #333',
          borderRadius: 2,
        }}
      >
        <Box sx={{ mb: 3 }}>
          <FieldLabel>Название</FieldLabel>
          <Typography 
            variant="h6" 
            sx={{ 
              mt: 1, 
              fontWeight: 500,
              fontSize: '1.25rem',
            }}
          >
            {task.title}
          </Typography>
        </Box>

        <Divider sx={{ my: 3, borderColor: '#333' }} />

        <Box sx={{ mb: 3 }}>
          <FieldLabel>Описание</FieldLabel>
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 1,
              lineHeight: 1.7,
            }}
          >
            {task.description || (
              <span style={{ fontStyle: 'italic', color: '#888' }}>
                Описание отсутствует
              </span>
            )}
          </Typography>
        </Box>

        <Divider sx={{ my: 3, borderColor: '#333' }} />

        <Box sx={{ mb: 3 }}>
          <FieldLabel>Дата создания</FieldLabel>
          <Typography 
            variant="body1" 
            sx={{ 
              mt: 1,
            }}
          >
            {new Date(task.createdAt).toLocaleDateString('ru-RU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Typography>
        </Box>

        <Divider sx={{ my: 3, borderColor: '#333' }} />

        <Box sx={{ mb: 3 }}>
          <FieldLabel>Статус</FieldLabel>
          <Box sx={{ mt: 1 }}>
            <Chip
              label={statusText[task.status]}
              sx={{
                backgroundColor: getColorForStatus(task.status),
                color: '#fff',
                fontWeight: 500,
                fontSize: '0.9rem',
                height: 32,
              }}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 3, borderColor: '#333' }} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FieldLabel>Изменить статус</FieldLabel>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {availableStatuses.map(statusValue => {
              const isCurrentStatus = task.status === statusValue;
              if (isCurrentStatus === true) {
                return (
                  <Button
                    key={statusValue}
                    variant="contained"
                    onClick={() => onStatusUpdate(statusValue)}
                    disabled={true}
                    sx={{
                      borderColor: '#1976d2',
                      color: '#fff',
                      textTransform: 'none',
                      fontWeight: 500,
                      '&:disabled': {
                        color: '#fff',
                        backgroundColor: '#1976d2',
                      },
                    }}
                  >
                    {statusText[statusValue]}
                  </Button>
                );
              } else {
                return (
                  <Button
                    key={statusValue}
                    variant="outlined"
                    onClick={() => onStatusUpdate(statusValue)}
                    disabled={false}
                    sx={{
                      borderColor: '#1976d2',
                      color: '#1976d2',
                      textTransform: 'none',
                      fontWeight: 500,
                      '&:hover': {
                        borderColor: '#42a5f5',
                        backgroundColor: 'rgba(25, 118, 210, 0.1)',
                      },
                    }}
                  >
                    {statusText[statusValue]}
                  </Button>
                );
              }
            })}
          </Box>
        </Box>

        <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #333' }}>
          <Button
            variant="contained"
            onClick={onTaskDelete}
            sx={{
              backgroundColor: '#d32f2f',
              textTransform: 'none',
              fontWeight: 500,
              px: 3,
              '&:hover': {
                backgroundColor: '#c62828',
              },
            }}
          >
            Удалить задачу
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default View;
