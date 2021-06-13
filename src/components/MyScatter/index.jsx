import React, { useRef, useEffect } from 'react';
import { Scatter } from '@antv/g2plot';
import style from './index.module.css';

const MyScatter = (props) => {
    const box = useRef();
    const plot = useRef();
    

    useEffect(()=>{
        const data = props.data;
          const labels = ['Airline Pilots, Copilots and Flight Engineers', 'Benefits Managers'];
          plot.current = new Scatter(box.current, {
            appendPadding: 30,
            autoFit:true,
            data,
            xField: '观看数量',
            yField: '粉丝数',
            colorField: '性别',
            size: [2, 16],
            sizeField: '视频平均播放量',
            shape: 'circle',
            tooltip: {
              fields: ['up名字', '粉丝数', '观看数量'],
            },
            legend: false,
            label: {
              formatter: (item) => {
                return labels.includes(item['short occupation']) ? item['short occupation'] : '';
              },
              offsetY: -10,
            },
          });
          plot.current.render();

          return ()=>{
              plot.current.destroy();
          }
    }, [props.data])

    return (
        <div ref={box} className={style.scatter}>
            
        </div>
    );
}

export default MyScatter;
