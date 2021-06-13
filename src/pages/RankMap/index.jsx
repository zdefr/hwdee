import { Line } from '@antv/g2plot';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import style from './index.module.css';
import { Skeleton } from 'antd';
//import { Breadcrumb, Divider } from 'antd';
const RankMap = (props) => {
    const container = useRef();
    const line = useRef();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
      setLoading(true);
      let query = [];
      for(const item of props.req){
        console.log(item)
        query.push(axios({
          method: 'GET',
            params: {
                videoNumber:item.videoNumber,
                type:item.type
            },
            url: '/jg/search/findChangeByName',
            timeout: '5000'
        }))
      }

      Promise.all(query).then((res)=>{
        setLoading(false)
        const midata = [];
        res.forEach((item)=>{
          item.data.forEach((node)=>{
            let substr = node.time.split('T');
            node.time = substr[0]+' '+substr[1].substring(0, 5);
            node.ranking = 100-node.ranking;
          })
          midata.push(item.data);
        })

        console.log(midata)
        setData([].concat(...midata))
      }).catch((err)=>{
        alert('检查网络')
      })
    }, [props.count, props])

    useEffect(()=>{
        if(loading){
          return;
        }
        line.current = new Line(container.current, {
            data,
            padding: 'auto',
            xField: 'time',
            yField: 'ranking',
            yAxis:{
              label:{
                formatter:(text,item,index)=>{
                  return 100-index*20-20
                }
              }
            },
            tooltip: {
              formatter: (datum) => {
                return { name: datum.name, value: 100-datum.ranking };
              },
            },
            seriesField:'name',
          });
          line.current.render();

          return ()=>{
              line.current.destroy();
          }
    }, [data, loading])

    return (
    <div>
      {
        loading ? (
          <Skeleton active />
      ) : (
        <div ref={container} className={style.outer}>
        </div>
      )
      }
        
    </div>    
    );
}

export default RankMap;