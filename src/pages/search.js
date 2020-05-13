import React,{ useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../style/base.scss'
import '../style/search.scss'

import HeaderCom from '../components/header'
import { getList } from '../seaver/api'

function SearchComp() {
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
		sessionStorage.setItem('detail',JSON.stringify(item))
	}
	return (
		<div>
			<HeaderCom />
			<div className="search-shop-list mlr">
				<ul>
				{
					list.map((item,index) =>(
						<li key={index} onClick={()=>setDetail(item)}>
							<Link className="wui-flex" to={'detail/'+item.poiid}>
								<div className="left-img">
									<img src={item.frontImg} />
								</div>
								<div className="right-cont wui-flex__item">
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
export default SearchComp
//ReactDOM.render(jsx,document.querySelector('#root'))