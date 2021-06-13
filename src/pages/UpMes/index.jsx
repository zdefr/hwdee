import React, { useEffect, useState } from 'react';
import style from './index.module.css';
import MyPie from '../../components/MyPie';
import MyScatter from '../../components/MyScatter';
import MyColumn from '../../components/MyColumn';
import axios from 'axios';
import { Skeleton } from 'antd';

const UpMes = () => {

    const [sexdata, setSexdata] = useState([]);
    const [vipdata, setVipdata] = useState([]);
    const [alayData, setAlaydata] = useState([]);
    const [sloading, setsLoading] = useState(true);
    const [vloading, setvLoading] = useState(true);
    const [aloading, setaLoading] = useState(true);

    useEffect(() => {
        axios({
            method: 'GET',
            url: '/api/up/viewSexRatio',
            timeout: '5000'
        }).then((res) => {
            setsLoading(false)
            setSexdata(res.data);
        }).catch((err) => {
            alert('检查网络')
        })

        axios({
            method: 'GET',
            url: '/api/up/analysis',
            timeout: '5000'
        }).then((res) => {
            const data = [];

            for(const up of res.data){
                let addNode = {};
                for(const node of up){
                    switch(node.type){
                        case 'up名字':
                        case '性别':
                            addNode[node.type] = node.strValue;
                            break;
                        default:
                            addNode[node.type] = node.value;
                            break;
                    }
                }
                data.push(addNode);
            }


            setaLoading(false)
            setAlaydata(data)
        }).catch((err) => {
            alert('检查网络')
        })

        axios({
            method: 'GET',
            url: '/api/up/viewVip',
            timeout: '5000'
        }).then((res) => {
            setvLoading(false)
            setVipdata(res.data)
        }).catch((err) => {
            alert('检查网络')
        })
    }, [])

    return (
        <div className={style.outer}>
            <div className={style.scatter}>
                {aloading?(
                    <Skeleton/>
                    ):(
                        <MyScatter data={alayData}/>
                    )
                }
            </div>
            <div className={style.displayBox}>
                <div className={style.map}>
                    {
                        (sloading || vloading)?(
                            <Skeleton/>
                            ):
                            (
                                <MyPie inner={0.6} data={sexdata} />
                            )
                    }
                    
                </div>
                <div className={style.map}>
                {
                        (sloading || vloading)?(
                            <Skeleton/>
                            ):
                            (
                                <MyPie  data={vipdata} />
                            )
                    }
                </div>
                
            </div>
            
            <div className={style.column}>
                <MyColumn/>
            </div>
        </div>

    );
}

export default UpMes;
