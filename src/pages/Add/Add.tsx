import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from '@mui/material';
import { useTasks } from '../../hooks/useTasks';

const Add = () => {
  const navigate = useNavigate();
  const { createTask } = useTasks();
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const cleanedTitle = taskTitle.trim();
    
    if (cleanedTitle === '') {
      setErrorMsg('Название обязательно');
      return;
    }
    if (cleanedTitle.length === 0) {
      setErrorMsg('Название обязательно');
      return;
    }

    createTask(
      { 
        title: cleanedTitle, 
        description: taskDesc.trim() || '',
      },
      {
        onSuccess: () => {
          navigate('/');
        },
      }
    );
  };

  const textFieldStyles = {
    mb: 3,
    '& .MuiInputLabel-root': {
      color: '#b0b0b0',
    },
    '& .MuiOutlinedInput-root': {
      color: '#fff',
      '& fieldset': {
        borderColor: '#333',
      },
      '&:hover fieldset': {
        borderColor: '#1976d2',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#1976d2',
      },
    },
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
        Создание задачи
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
        <Box component="form" onSubmit={handleFormSubmit}>
          <TextField
            fullWidth
            label="Название"
            value={taskTitle}
            onChange={(e) => {
              const value = e.target.value;
              setTaskTitle(value);
              if (errorMsg !== '') {
                setErrorMsg('');
              }
            }}
            error={errorMsg !== ''}
            helperText={errorMsg}
            required
            sx={textFieldStyles}
          />
          <TextField
            fullWidth
            label="Описание"
            value={taskDesc}
            onChange={(e) => {
              setTaskDesc(e.target.value);
            }}
            multiline
            rows={5}
            sx={textFieldStyles}
          />
          <Button 
            type="submit" 
            variant="contained" 
            size="large"
            fullWidth
            sx={{
              backgroundColor: '#1976d2',
              fontWeight: 500,
              py: 1.5,
              fontSize: '1rem',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#115293',
              },
            }}
          >
            Создать задачу
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Add;
