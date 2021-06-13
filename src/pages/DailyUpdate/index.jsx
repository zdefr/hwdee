import React, { useEffect, useState, useRef } from 'react';
import style from './index.module.css';
import { Line } from '@antv/g2plot';
import axios from 'axios';
import { Space, Select, Button } from 'antd';
import { center } from '@antv/g2plot/lib/plots/sankey/sankey';
import { Link } from 'react-router-dom';
const { Option } = Select;
const DailyUpdate = () => {
    const box = useRef();
    const line = useRef();
    const [data, setData] = useState([]);
    const [type, setType] = useState('游戏')

    useEffect(() => {
        axios({
            method: 'GET',
            params: {
                type
            },
            url: '/jg/search/findByType',
            timeout: '5000'
        }).then((res) => {
            setData(res.data)
        }).catch((err) => {
            alert('网络异常')
        })
    }, [type]);

    useEffect(() => {
        line.current = new Line(box.current, {
            data,
            appendPadding: 50,
            height:600,
            xField: 'strValue',
            yField: 'value',
        });
        line.current.render();

        return () => {
            line.current.destroy();
        }
    }, [data]);

    const SequChange = (value)=>{
        setType(value);
    }


    return (
        <div>
            <Space align={center} size={20} className={style.menu}>
                    <Select onChange={SequChange} defaultValue="总榜">
                        <Option value="总榜">总榜</Option>
                        <Option value="游戏">游戏</Option>
                        <Option value="音乐">音乐</Option>
                        <Option value="舞蹈">舞蹈</Option>
                        <Option value="时尚">时尚</Option>
                        <Option value="番剧">番剧</Option>
                        <Option value="国创">国创</Option>
                        <Option value="纪录片">纪录片</Option>
                        <Option value="动画">动画</Option>
                        <Option value="知识">知识</Option>
                        <Option value="科技">科技</Option>
                        <Option value="生活">生活</Option>
                        <Option value="美食">美食</Option>
                    </Select>
                    <Button type='primary'><Link to='/update/time'>切换到分区</Link></Button>
                </Space>
                
            <div ref={box} className={style.outer}>

            </div>
        </div>
    );
}

export default DailyUpdate;
