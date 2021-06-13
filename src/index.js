
import 'moment/locale/zh-cn';
import locale from 'antd/lib/locale/zh_CN';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

document.getElementsByTagName('html')[0].style.fontSize = window.screen.width/1000+'px';

ReactDOM.render(
  <React.StrictMode>
    <ConfigProvider locale={locale}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ConfigProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
