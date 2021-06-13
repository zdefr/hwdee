import React, { useRef, useState } from 'react';
import { Affix, Space, DatePicker, Select, Button, Table, Skeleton } from 'antd';
import style from './index.module.css';
import axios from 'axios';
import RankMap from '../RankMap';

const { Option } = Select;

const columns = [
    {
        title: '排名',
        dataIndex: 'ranking',
        key: 'ranking',
        sorter: (a, b) => a.ranking - b.ranking,
        sortDirections: ['descend'],
        width: '60rem'
    },
    {
        title: '分区',
        dataIndex: 'type',
        key: 'type',
        width: '60rem'
    },
    {
        title: '标题',
        dataIndex: 'name',
        key: 'name',
    },
];

const columns_sp = [
    {
        title: '标题',
        dataIndex: 'name',
        key: 'name',
    },
];


const Index = () => {
    const [loading, setLoading] = useState(false);
    const date = useRef();
    const type = useRef('all');
    const [res, setRes] = useState([]);
    const [display, setDisplay] = useState([[]]);


    const submit = () => {
        setLoading(true);
        setDisplay([[]]);
        axios({
            method: 'GET',
            params: {
                type: type.current,
                time: date.current
            },
            url: '/jg/search/rankByTimeAndType',
            timeout: '5000'
        }).then((res) => {
            let t;
            switch (type.current) {
                case 'all':
                    t = '总榜'
                    break
                case 'game':
                    t = '游戏'
                    break
                case 'guochuang':
                    t = '国创'
                    break
                default:
                    t = '总榜'
                    break
            }
            let rd = res.data;
            rd.forEach((item) => {
                item.type = t;
                item.key = item.videoNumber
            })
            setRes(rd);
            setLoading(false);
        }).catch((err) => {
            alert('检查网络')
        })
    }

    const dateChange = (dates, dateString) => {
        if (dateString) {
            date.current = dateString + ':00:00'
        }
    }

    const typeChange = (value) => {
        if (value) {
            type.current = value;
        }
    }

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setDisplay([selectedRowKeys, selectedRows]);
        },
    };

    return (
        <div className={style.outer}>
            <Affix target={()=> document.getElementById('content')} offsetTop={20}>
                <Space size={20}>
                    <DatePicker onChange={dateChange} showTime format='YYYY-MM-DD HH' />
                    <Select onChange={typeChange} defaultValue="all" className={style.moduleSc}>
                        <Option value="all">总榜</Option>
                        <Option value="guochuang">国创</Option>
                        <Option value="game">游戏</Option>
                        <Option value="Yiminghe">yiminghe</Option>
                    </Select>
                    <Button onClick={submit} type="primary" style={{ width: '60rem' }}>查询</Button>
                </Space>
            </Affix>
            {
                display[0].length>0 ?
                    (
                        <div className={style.display}>
                            <div className={style.display_table}>
                                {
                                    loading ? (
                                        <Skeleton active />
                                    ) : (
                                        <Table rowSelection={{
                                            type: 'checkbox',
                                            ...rowSelection,
                                            hideSelectAll:true,
                                            defaultSelectedRowKeys:display[0]
                                        }} pagination={{ pageSize: 20 }} columns={columns_sp} dataSource={res} bordered style={{ marginTop: '10rem' }}></Table>
                                    )
                                }
                            </div>
                            <Affix target={()=> document.getElementById('content')} offsetTop={50}>
                                <div className={style.display_map}>
                                    <RankMap req={display[1]} count={display[1].length}/>
                                </div>
                                
                            </Affix>
                        </div>
                    ) :
                    (
                        <div>
                            {
                                loading ? (
                                    <Skeleton active />
                                ) : (
                                    <Table rowSelection={{
                                        type: 'checkbox',
                                        ...rowSelection,
                                        hideSelectAll:true,
                                    }} pagination={{ pageSize: 20 }} columns={columns} dataSource={res} bordered style={{ marginTop: '10rem' }}></Table>
                                )
                            }
                        </div>
                    )
            }
        </div>
    );
}

export default Index;
