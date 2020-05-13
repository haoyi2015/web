import React from 'react'
import { Link } from 'react-router-dom'

import '../style/header.scss'

function HeaderComp () {
    return (
        <div className="dl-header">
            <div className="search-warp clearfix mlr">
                <div className="input">
                    <Link to="search">
                        <input type="text" placeholder="请输入搜索内容" />
                    </Link>
                </div>
            </div>
        </div>
    )
}
export default HeaderComp