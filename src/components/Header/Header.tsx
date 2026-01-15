import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';

const Header = () => {
  const currentPath = useLocation().pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: '#1a1a1a',
        borderBottom: '2px solid #1976d2',
        boxShadow: 'none',
      }}
    >
      <Toolbar>
        <ViewKanbanIcon 
          sx={{ 
            mr: 2, 
            color: '#1976d2',
            fontSize: 28,
          }} 
        />
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1, 
            fontWeight: 600,
            fontSize: '1.25rem',
          }}
        >
          Доска задач
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            component={Link}
            to="/"
            sx={{
              color: isActive('/') ? '#1976d2' : '#b0b0b0',
              textTransform: 'none',
              px: 2.5,
              py: 1,
              fontSize: '0.95rem',
              fontWeight: isActive('/') ? 600 : 500,
              border: isActive('/') ? '1px solid #1976d2' : '1px solid transparent',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                borderColor: '#1976d2',
              },
            }}
          >
            Все задачи
          </Button>
          <Button
            component={Link}
            to="/create"
            sx={{
              color: isActive('/create') ? '#1976d2' : '#b0b0b0',
              textTransform: 'none',
              px: 2.5,
              py: 1,
              fontSize: '0.95rem',
              fontWeight: isActive('/create') ? 600 : 500,
              border: isActive('/create') ? '1px solid #1976d2' : '1px solid transparent',
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.1)',
                borderColor: '#1976d2',
              },
            }}
          >
            Создать задачу
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
