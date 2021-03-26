import React, {useEffect, useMemo, useState} from 'react';
import {Container, Grid} from "@material-ui/core";
import styled from "styled-components";
import {Converter} from "../Converter/Converter";
import {CurrencyList} from "../../../utils/types/types";
import {List} from "../List/List";
import {getApi} from "../../api/api";


export function Application() {
  const [currencyList, setCurrencyList] = useState<CurrencyList>({})
  const TEN_SECONDS = 10000

  useEffect(() => {
    getApi().then(res => setCurrencyList(res))

    const intervalId = setInterval(() => {
      getApi().then(res => setCurrencyList(res))
    }, TEN_SECONDS)

    return () => clearInterval(intervalId);
  }, [])

  return (
    <>
      {Object.keys(currencyList).length ? <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid md={8}>
              <Column>
                <Converter currencyList={currencyList}/>
              </Column>
            </Grid>
            <Grid md={4}>
              <ColumnRight>
                <List currencyList={currencyList}/>
              </ColumnRight>
            </Grid>
          </Grid>
        </Container>
        : <div>Валюты не найдены</div>}
    </>
  );
}

const Column = styled.div`
  margin-top: 40px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`

const ColumnRight = styled(Column)`
  margin-left: 20px;
`
