import {Layout, Typography} from 'antd';
import React from 'react';
import {useCrypto} from '../../context/crypto-context.jsx';
import PortfolioChart from '../PortfolioChart.jsx';
import AssetsTable from '../AssetsTable.jsx';

export default function AppContent() {
    const {assets, crypto} = useCrypto();

    const cryptoPriceMap = crypto.reduce((acc, c) => {
        acc[c.id] = c.price;
        return acc;
    }, {});

    const total = assets
        .map(asset => asset.amount * cryptoPriceMap[asset.id])
        .reduce((acc, v) => (acc += v), 0)
        .toFixed(2);

    return (
        <Layout.Content className={'content__style'}>
            <Typography.Title level={3} className={'content__title'}>
                Total investitions: {total}$
            </Typography.Title>
            <PortfolioChart />
            <AssetsTable />
        </Layout.Content>
    );
}
