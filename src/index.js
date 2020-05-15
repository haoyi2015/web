import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './style/base.scss'
import RouterList from './router'
//import Toast from './toast';
//Toast.error('网络异常',113000)
//Toast.loading()

const jsx = (
  <div>
    <RouterList />
  </div>
)
ReactDOM.render(jsx,document.querySelector('#root'))