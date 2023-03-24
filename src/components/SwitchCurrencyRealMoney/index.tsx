import React from 'react'
import Grid from '@mui/material/Grid';
import { Button } from '@mui/material';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows'
import realMoney from '../../stores/realMoney';
import { observer } from 'mobx-react';

const SwitchCurrencyRealMoney = observer(() => {
  
  const {setFromcurrency, setTocurrency, fromCurrent, toCurrent} = realMoney

  const handleSwitch = () => {
    setFromcurrency(toCurrent)
    setTocurrency(fromCurrent)
  }

  return (
    <Grid item xs={12} md='auto'>
        <Button
            sx={{
                borderRadius: 1,
                height: '100%'
            }}
            onClick={handleSwitch}
        >
            <CompareArrowsIcon sx={{fontSize: 30}} />
        </Button>
    </Grid>
  )
})

export default SwitchCurrencyRealMoney