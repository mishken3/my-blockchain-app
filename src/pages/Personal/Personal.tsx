import React, { FC } from 'react';

import { useCurrenciesData, useTypedSelector } from '../../hooks';
import { CurrencyAmount, Diagramm } from './components';
import styles from './Personal.module.scss';
import { getBeautifyAmount } from './Personal.utils';

export const PersonalPage: FC = () => {
  const walletData = useTypedSelector((state) => state.wallet);
  const { currenciesData, isLoading, isHasError } = useCurrenciesData();

  if (isLoading) {
    return <h1>Загрузка курсов валют...</h1>;
  }
  if (isHasError || !currenciesData) {
    return <h1>Ошибка загрузки валют: перезагрузите страницу.</h1>;
  }

  const currencyAmounts = Object.values(currenciesData).map((currency) => {
    const coinAmount = currency.price * walletData[currency.name];
    const beautifyCoinAmount = getBeautifyAmount(coinAmount);
    return (
      <CurrencyAmount key={currency.id} coinName={currency.name} coinAmount={beautifyCoinAmount} />
    );
  });

  const getWalletAmount = () => {
    const walletAmount = Object.values(currenciesData).reduce((amount: number, currency) => {
      const coinAmount = currency.price * walletData[currency.name];
      amount += coinAmount;

      return amount;
    }, 0);

    return getBeautifyAmount(walletAmount);
  };

  const walletAmount = getWalletAmount();

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.heading}>
          <h3 className={styles.heading__title}>Баланс аккаунта</h3>
          <p className={styles.heading__balance}>
            {walletAmount} <span className={styles.heading__balance_currency}>USD</span>
          </p>
        </div>

        <div className={styles.amount}>
          <Diagramm walletAmount={walletAmount} />

          <div className={styles.amount__currencies}>{currencyAmounts}</div>
        </div>
      </div>
    </>
  );
};
