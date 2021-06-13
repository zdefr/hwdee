import React, { useRef, useEffect } from 'react';
import { Pie } from '@antv/g2plot';
import style from './index.module.css';

const MyPie = (props) => {
    const piebox = useRef();
    const pie = useRef();
    
    useEffect(()=>{
        const data = props.data
        pie.current = new Pie(piebox.current, {
            legend: {
                position:'right'
            },
            autoFit:true,
            appendPadding:10,
            data,
            innerRadius:props.inner,
            angleField: 'value',
            colorField: 'type',
            radius: 0.8,
            label: {
                type: 'spider',
                labelHeight: 28,
                content: '{name}',
              },
            interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
          });
          
          pie.current.render();

          return ()=>{
              pie.current.destroy();
          }
    }, [props.data, props.inner])

    return (
        <div ref={piebox} className={style.outer}>
            
        </div>
    );
}

export default MyPie;
