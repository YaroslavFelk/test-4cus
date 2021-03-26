import React from 'react';
import styled from "styled-components";
import {CurrencyList} from "../../../utils/types/types";


export function List({currencyList}: { currencyList: CurrencyList }) {

  return (
    <>
      <ListRow>
        <Name>Валюта</Name>
        <Value>Курс</Value>
      </ListRow>

      {Object.keys(currencyList)
        .sort((a, b) => 1 / currencyList[a] - 1 / currencyList[b])
        .map(currency => {
          return (
            <ListRow key={currency}>
              <Name>{currency}</Name>
              <Value>{(1 / currencyList[currency]).toFixed(2)} &#8381;</Value>
            </ListRow>
          )
        })}
    </>
  );
}

const ListRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  &:last-of-type {
    margin-bottom: 0;
  }
`

const Name = styled.span`
  color: #333;
`

const Value = styled.span`
  color: #555;
`
