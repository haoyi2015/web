import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../style/base.scss'
import '../style/index.scss'

// 导入store
import store from '../store'
// 导入action
import sendAction from '../action'

import HeaderCom from '../components/header'
import bannerImgUrl from '../images/1.png'
import { getList } from '../seaver/api'

function IndexComp() {
	// 默认数据
	const [list,setList] = useState([])
	// 请求接口数据
	useEffect(() =>{
		getList({}).then((res) =>{
			const { poiInfos } = res.data.poiList
			//console.log(poiInfos)
			setList(poiInfos)
		})
	},[])
	function setDetail(item){
		console.log(98)
		const action = sendAction(item)
		store.dispatch(action)
		sessionStorage.setItem('detail',JSON.stringify(item))
	}
	return (
		<div>
			<HeaderCom />
			<div className="dl-banner mlr">
				<img src={bannerImgUrl} />
			</div>
			<div className="tab-nav">
				<div className="nav-list wui-flex">
					<div className="wui-flex__item text-c">
						<img src={require('../images/tab/huoguo.png')} />
						<span>火锅</span>
					</div>
					<div className="wui-flex__item text-c">
						<img src={require('../images/tab/wm.png')} />
						<span>外卖</span>
					</div>
					<div className="wui-flex__item text-c">
						<img src={require('../images/tab/mianshi.png')} />
						<span>面食</span>
					</div>
					<div className="wui-flex__item text-c">
						<img src={require('../images/tab/tianpin.png')} />
						<span>甜品</span>
					</div>
				</div>
			</div>
			<div className="index-shop-list mlr">
				<ul>
				{
					list.map((item,index) =>(
						<li key={index} onClick={()=>setDetail(item)}>
							<Link className="wui-flex" to={'detail/'+item.poiid}>
								<div className="left-img">
									<img src={item.frontImg} />
								</div>
								<div className="right-cont wui-flex__item min-w">
									<p><i className="white-space">{item.name}</i><em>{item.avgScore}</em></p>
									<div><img className="star-img" src={require('../images/star.png')} /><i>{item.avgScore}</i>月销178</div>
									<span>¥60起送｜配送费约¥5</span>
								</div>
							</Link>
						</li>
					))
				}
				</ul>
			</div>
			<div className="no-data">
				已经到底啦，不要往下看了（//▽//）
			</div>
		</div>
	)
}
export default IndexComp
//ReactDOM.render(jsx,document.querySelector('#root'))