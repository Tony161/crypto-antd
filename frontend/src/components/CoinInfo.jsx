import {Flex, Typography} from 'antd';
import React from 'react';

export default function CoinInfo({coin, withSymbol}) {
    return (
        <Flex align="center">
            <img src={coin.icon} alt={coin.name} className={'coin__info__img'} />
            <Typography.Title level={2} className={'margin__zero'}>
                {withSymbol && <span>({coin.symbol})</span>} {coin.name}
            </Typography.Title>
        </Flex>
    );
}
