import React, { FC } from 'react';

import { CoinsIcons } from '../../../../assets/icons';
import { CoinsColors, CurrenciesEnum } from '../../../../types/types';
import styles from './CoinItem.module.scss';

interface CoinItemProps {
  coinName: CurrenciesEnum;
  coinAmount: number;
  coinAmountUSD: string;
  handlerSetIsUSDBuyOpen: () => void;
}

export const CoinItem: FC<CoinItemProps> = ({
  coinName,
  coinAmountUSD,
  coinAmount,

  handlerSetIsUSDBuyOpen,
}) => {
  return (
    <div className={styles.coin} style={{ borderLeftColor: CoinsColors[coinName] }}>
      <div className={styles.coin__icon}>
        <img src={CoinsIcons[coinName]} alt={coinName} />
      </div>

      <div className={styles.coin__amount}>
        <p className={styles.coin__amount_title}>Total</p>
        <p className={styles.coin__amount_number}>{coinAmountUSD} USD</p>
        {coinName !== CurrenciesEnum.USD && (
          <p className={styles.coin__amount_number}>
            {coinAmount} {coinName}
          </p>
        )}
      </div>

      {coinName === CurrenciesEnum.USD && (
        <button onClick={handlerSetIsUSDBuyOpen} className={styles.coin__buy}>
          $
        </button>
      )}
    </div>
  );
};
