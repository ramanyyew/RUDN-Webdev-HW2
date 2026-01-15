import { Card as MuiCard, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { Task } from '../../types/task';

type CardProps = {
  task: Task;
};

const Card = ({ task }: CardProps) => {
  const navigate = useNavigate();

  const onCardClick = () => {
    const path = `/task/${task.id}`;
    navigate(path);
  };

  const cardStyles = {
    mb: 2,
    cursor: 'pointer',
    backgroundColor: '#252525',
    border: '1px solid #333',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
      borderColor: '#1976d2',
      transform: 'translateY(-2px)',
    },
  };

  return (
    <MuiCard
      elevation={0}
      onClick={onCardClick}
      sx={cardStyles}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ 
            fontWeight: 600,
            fontSize: '0.75rem',
            letterSpacing: '0.5px',
            display: 'block',
            mb: 0.5,
          }}
        >
          Задача №{task.id}
        </Typography>
        <Typography 
          variant="body1" 
          component="div" 
          sx={{ 
            fontWeight: 500,
            fontSize: '1rem',
            lineHeight: 1.5,
          }}
        >
          {task.title}
        </Typography>
      </CardContent>
    </MuiCard>
  );
};

export default Card;
