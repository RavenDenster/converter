import React, {useState, useEffect} from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { ConverterBlock, CryptoTable, ConverterRealMoney } from './components'
import styles from './app.module.css'
import { observer } from 'mobx-react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const App = observer(() => {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));


  return (

  <Container maxWidth={'lg'} className={styles.boxStyles}>
    <Box sx={{margin: '0'}} m={10} >
      <Grid container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid  item xs={8}>
         <CryptoTable />
        </Grid>
        <Grid  item xs={4}>
          <ConverterBlock />
        </Grid>
      </Grid>
    </Box>
    <Box m={20} sx={matches ? {margin: '160px'} : {margin: '0'}}>
      <ConverterRealMoney/>
    </Box>
  </Container>
  );
})

export default App;
