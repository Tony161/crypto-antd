import React, {useEffect, useState} from 'react';
import {Button, Drawer, Layout, Modal, Select, Space} from 'antd';
import {useCrypto} from "../../context/crypto-context.jsx";
import CoinInfoModal from "../CoinInfoModal.jsx";
import AddAssetForm from "../AddAssetForm.jsx";

const headerStyle = {
    width: '100%',
    textAlign: 'center',
    height: 60,
    padding: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: 'center',
};
export default function AppHeader() {
    const [select, setSelect] = useState(false);
    const [coin, setCoin]= useState(null)
    const [modal, setModal] = useState(false)
    const [drawer, setDrawer] = useState(false)
    const {crypto} = useCrypto()

    useEffect(() => {
        const keypress = (event) => {
            if (event.key === '/') {
                setSelect(prev=> !prev)
            }
        }
        document.addEventListener("keypress", keypress)
        return () => document.removeEventListener("keypress", keypress)
    }, [])
    const handleSelect = (value) => {
        const coin = crypto.find(c=> c.id === value)
        setCoin(coin)
        setModal(true)
    };

    return (
        <Layout.Header style={headerStyle}>
            <Select
                style={{
                    width: '250px',
                }}
                placeholder="select one country"
                value={'press / to open'}
                onSelect={handleSelect}
                onClick={()=> setSelect(prev=> !prev)}
                // onChange={handleChange}
                open ={select}
                options={crypto.map(coin => ({
                    label: coin.name,
                    value: coin.id,
                    icon: coin.icon,
                }))}
                optionRender={(option) => (
                    <Space>
                        <img style={{width: '10px'}} src={option.data.icon}
                             alt={option.data.label}/> {option.data.label}
                    </Space>
                )}
            />
            <Button type="primary" onClick={()=> setDrawer(true)}>Add Asset</Button>
            <Modal
                open={modal}
                onCancel={()=>setModal(false)}
                footer={null}
            >
                <CoinInfoModal coin={coin}/>
            </Modal>
            <Drawer
                destroyOnClose
                width={600}
                title="Add asset"
                onClose={()=> setDrawer(false)}
                open={drawer}
            >
                <AddAssetForm onClose={()=>setDrawer(false)}/>
            </Drawer>
        </Layout.Header>
    )
}