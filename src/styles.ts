import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

export const styles = {
    redColumn: {
        backgroundColor: '#d8ffc4'
    },
    greebColumn: {
        backgroundColor: '#ffdada'
    },
    
} 