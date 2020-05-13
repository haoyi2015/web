import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './style/base.scss'
import RouterList from './router'

const jsx = (
  <div>
    <RouterList />
  </div>
)
ReactDOM.render(jsx,document.querySelector('#root'))