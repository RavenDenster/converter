import React, { FC } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import {TableContainer, Typography} from '@mui/material';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useState, useEffect} from 'react';
import { TCoin, TCoinDiff } from '../../types';
import { observer } from 'mobx-react';
import currencies from '../../stores/currencies';
import { Item } from '../../styles';
import styles from './Crypto.module.css'
import converter from '../../stores/converter';
import Skeleton from '@mui/material/Skeleton';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';


const CryptoTable:FC = observer(() => {

    const items: TCoin[] = currencies.items
    const diffObj: TCoinDiff = currencies.diffObj
    const {page, setPage, setFlag} = currencies
    const {setSelectOutCoin} = converter
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    
    useEffect(() => {
        currencies.fetchCoins() 
    }, [page])

    useEffect(() => {
      setInterval(() => {
        currencies.fetchCoins()
        setFlag(true)
    }, 30 * 1000)
    }, [])

    const onClickRow = (coin: TCoin) => {
      converter.setSelectedCoin(coin)
      converter.setNewsetSelectInCoin()
    }

    function des() {
      setPage(page - 1) 
      setFlag(false)
      setSelectOutCoin('USD')
    } 

    function incres() {
      setPage(page + 1) 
      setFlag(false)
      setSelectOutCoin('USD')
    }
    
  return (
    
    <Item>
    <Typography variant='h5' sx={{marginTop: '10px', textAlign: 'center'}}>Currency converter</Typography> 
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">FullName</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell sx={!matches ? {display: 'none'} : {zIndex: '1'}} align="left">volume24hour</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {!items.length ? <tr><th><Skeleton width={700} height={60} animation="wave" /></th></tr> : items.map((coin: TCoin) => (
            <TableRow
              className={styles.rowCurrency}
              hover
              onClick={() => onClickRow(coin)}
              key={coin.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row"><img style={{width: '20px'}} src={coin.imageUrl} alt='coin'/></TableCell>
              <TableCell align="left">{coin.name}</TableCell>
              <TableCell align="left">{coin.fullName}</TableCell>
              <TableCell className={diffObj[coin.name] && styles[`${diffObj[coin.name]}Column`]} align="left">${coin.price}</TableCell>
              <TableCell sx={!matches ? {display: 'none'} : {zIndex: '1'}} align="left">${coin.volume24Hour}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Box sx={{marginTop: '20px'}}>
      <Button onClick={() => des()} disabled={!page}>Назад</Button>
      <Button onClick={() => incres()}  disabled={page == 9}>Далее</Button>
    </Box>
    </Item>
  )
})

export default CryptoTable
