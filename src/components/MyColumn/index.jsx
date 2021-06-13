import React, { useEffect, useRef, useState } from 'react';
import { Space, Select, Skeleton } from 'antd';
import style from './index.module.css';
import { Column } from '@antv/g2plot';
import axios from 'axios';
import { center } from '@antv/g2plot/lib/plots/sankey/sankey';
const { Option } = Select;

const MyColumn = (props) => {
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('followed');
    const [sequ, setSequ] = useState('DESC');
    const [data, setData] = useState([]);
    const box = useRef();
    const column = useRef();

    useEffect(() => {
        console.log('find')
        setLoading(true);
        axios({
            method: 'GET',
            params: {
                index: type,
                sequ: sequ
            },
            url: '/api/search/getUpOrderByGivenIndexAndSequ',
            timeout: '5000'
        }).then((res) => {
            res.data.length = 10;
            let d = [];
            for (const item of res.data) {
                for (const key in item) {
                    switch (key) {
                        case 'followed':
                        case 'watched':
                        case 'likes':
                            const mid = {};
                            mid.type = key;
                            mid.value = key === 'watched' ? item[key] / 20 : item[key];
                            mid.name = item.username.length>6?(item.username.substring(0,5)+'...'):item.username;
                            d.push(mid)
                            break;

                        default:
                            break
                    }
                }
            }
            setLoading(false)
            setData(d);
        }).catch((err) => {
            alert('检查网络')
        })
    }, [type, sequ])

    useEffect(() => {
        if (!box.current) {
            return;
        }
        column.current = new Column(box.current, {
            data,
            appendPadding: 20,
            autoFit: true,
            tickCount:10,
            xField: 'name',
            yField: 'value',
            seriesField: 'type',
            legend: {
                position: 'bottom'
            },
            isGroup: 'true',
            columnStyle: {
                radius: [20, 20, 0, 0],
            },
        });

        column.current.render();

        return () => {
            column.current.destroy();
        }
    }, [data])

    const typeChange = (value)=>{
        setType(value);
        console.log(type)
    }

    const SequChange = (value)=>{
        setSequ(value)
    }


    return (
        <div>
                <Space align={center} size={20} className={style.menu}>
                    <Select onChange={SequChange} defaultValue="DESC">
                        <Option value="DESC">降序</Option>
                        <Option value="ASC">升序</Option>
                    </Select>
                    <Select onChange={typeChange} defaultValue="followed">
                        <Option value="followed">粉丝数</Option>
                        <Option value="watched">播放量</Option>
                        <Option value="likes">点赞数</Option>
                    </Select>
                </Space>
            {
                loading ? (
                    <Skeleton className={style.outer} />
                ) : (
                    <div ref={box} className={style.outer}>
                    </div>
                )
            }
        </div>
    );
}

export default MyColumn;
