import React,{ useState, useEffect } from 'react'
import '../style/detail.scss'
// 导入store
import store from '../store'
// 导入加如购物车按钮
import BuyBnt from '../components/buy/bnt'
// 导入底部购物车导航
import CartNav from '../components/buy/cart'

// 导入react-redux Provider 传出store（维护store）
import { Provider } from 'react-redux'

function DetailComp () {
    const [info, setInfo] = useState({})
    useEffect(() =>{
        // 获取store值
        store.subscribe(() =>{
            console.log(store.getState())
        })
        const infoDat = JSON.parse(sessionStorage.getItem('detail'))||{}
        setInfo(infoDat)
    },[])
    return (
        <Provider store={store}>
            <div className="detail-info">
                <img src={info.frontImg} />
                <div className="info mlr">
                    <p className="title">{info.name} （{info.areaName}）</p>
                    <div className="dec">2 份【小食】王道嫩香鸡块2份20元，1.5元冰淇淋，5元小食，7.5元咖啡，8.5元小食，9元小食，9元小食，9元咖啡，13元小食，14元双堡，14元单人餐，16元双堡，18元单人餐，18元单人餐，18.3元单人餐，24.5元单人餐，25元单人餐，26元单</div>
                    <BuyBnt />
                </div>
                <CartNav />
            </div>
        </Provider>
    )
}
export default DetailComp