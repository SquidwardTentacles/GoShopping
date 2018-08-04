
<template>
    <div class="index">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
                <Rate allow-half v-model="valueHalf" />
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item,index) in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="(itemson, index) in item.subcates" :key="itemson.id">
                                                {{itemson.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a href="/goods/43.html"  v-for="(itemson, index) in item.subcates" :key="itemson.id"> {{itemson.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <!-- 引入element轮播图插件 -->
                        <el-carousel height="421px" indicator-position="outside">
                            <el-carousel-item v-for="(item, index) in toplist" :key="item.id">
                              <img :src="item.img_url" alt="" srcset="">
                            </el-carousel-item>
                          </el-carousel>
                    </div>
                    <!--幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in sliderlist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | cuttime}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="(item, index) in product" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p >
                    <a href="/goods/43.html" v-for="(e, i) in item.level2catelist">{{e.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="(itemprot, i) in item.datas" :key="itemprot.artID">
                            <router-link :to="'/goodsInfo/'+itemprot.artID">
                                <div class="img-box">
                                    <img :src="itemprot.img_url" v-lazy="itemprot.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{itemprot.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{itemprot.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{itemprot.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{itemprot.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// 导入模块
import axios from 'axios';
// 接口调用 http://47.106.148.205:8899/site/goods/gettopdata/goods


export default {
    // 数据
    data:function(){
        return {
            catelist:[],
            sliderlist:[],
            toplist:[],
            product:[],
            valueHalf:0,
           
        }
    },

    beforeMount(){
        
        this.axios.get(`/site/goods/gettopdata/goods`)
        .then((response)=>{
            //  console.log(response);
            this.catelist = response.data.message.catelist;
            this.sliderlist = response.data.message.sliderlist;
            this.toplist = response.data.message.toplist;
            // console.log(this);
        })
        .catch((err)=>{
            console.log(err);
        }) ;
        // 底部数据渲染
        this.axios.get(`/site/goods/getgoodsgroup`)
        .then((response)=>{
            // console.log(response);
            this.product=response.data.message
        })
        .catch((err)=>{
            console.log(err);
        })
    },
    // 显示出来调用
    mountede() {

    },
}
</script>
<style scoped>
    .el-carousel img{
        height:100% ;
        width:100% ;
        display:block ;
    }
</style>


