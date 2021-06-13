import React, { useEffect, useState, useRef } from 'react';
import style from './index.module.css';
import { Column } from '@antv/g2plot';
import axios from 'axios';
import { Space,  DatePicker, Button } from 'antd';
import { center } from '@antv/g2plot/lib/plots/sankey/sankey';
import { Link } from 'react-router-dom';

const TypeUpdate = () => {
    const box = useRef();
    const line = useRef();
    const [data, setData] = useState([]);
    const [type, setType] = useState('2021-06-08 00:00:00')

    useEffect(() => {
        axios({
            method: 'GET',
            params: {
                time:type
            },
            url: '/jg/search/findByDate',
            timeout: '5000'
        }).then((res) => {
            let midata = [];
            for (const key in res.data) {
               switch(key){
                    case 'statisticDate':
                    case 'all':
                        break
                    default:
                        midata.push({
                            name:key,
                            value:res.data[key]
                        })
               }
            }
            console.log(midata);
            setData(midata)
        }).catch((err) => {
            console.log(err);
            alert('网络异常')
        })
    }, [type]);

    useEffect(() => {
        line.current = new Column(box.current, {
            data,
            appendPadding: 50,
            height:600,
            xField: 'name',
            yField: 'value',
        });
        line.current.render();

        return () => {
            line.current.destroy();
        }
    }, [data]);

    const dateChange = (dates, dateString) => {
        if (dateString) {
            setType(dateString + ':00:00') 
        }
    }


    return (
        <div>
            <Space align={center} size={20} className={style.menu}>
                <DatePicker onChange={dateChange} showTime format='YYYY-MM-DD HH' />
                <Button><Link to='/update/daily'>切换到分区</Link></Button>
            </Space>
            <div ref={box} className={style.outer}>

            </div>
        </div>
    );
}

export default TypeUpdate;
