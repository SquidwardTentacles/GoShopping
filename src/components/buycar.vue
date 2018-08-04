<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <!-- 没有商品的时候展示 -->
                                <tr v-if="list&&list.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <!-- 有数据的时候显示 -->
                                <tr v-for="(item, index) in list" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch v-model="item.isbuy" active-color="#409eff" inactive-color="#555555">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo"><img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <el-input-number v-model="item.buycount" @change="countchange($event,index)" size="mini" :min="1" :max="10" label="描述文字"></el-input-number>
                                    </td>
                                    <td width="104" align="left"></td>
                                    <td width="54" align="center">
                                        <a @click="delindex=index;showmodel=true" href="javascript:void(0)">删除</a>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectcount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{totalprice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                           
                            <router-link to="/payorder">
                                <button class="submit">立即结算</button>
                            </router-link>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
        <!-- 弹出框 -->
        <Row>
            <Modal v-model="showmodel" width="360">
                <p slot="header" style="color:#f60;text-align:center">
                    <Icon type="ios-information-circle"></Icon>
                    <span>删除</span>
                </p>
                <div style="text-align:center">
                    <p>是否确认删除.</p>
                </div>
                <div slot="footer">
                    
                    
                </div>
                <Row>
                    <Col span="12">
                        <Button type="success" size="large" long @click="showmodel=false">取消</Button>
                    </Col>
                    <Col span="12">
                        <Button type="error" size="large" long @click="del">删除</Button>
                    </Col>
                </Row>
            </Modal>
        </Row>
    </div>
</template>

<script>
    export default {
        name: "buycar",
        data: function () {
            return {
                list:undefined,
                delindex:0,
                showmodel:false,
                
            }
        },
        // 获取数据 
        created() {
            // 获取数据拼接为id1,id2,id3
            this.$Spin.show();
            // console.log(this.$store.state.buylist);
            let buylist = this.$store.state.buylist;
            let ids = '';
            for (const key in buylist) {
                ids += key;
                ids += ",";
            }
            // 判断是否有值 有值才调用接口 
            if(ids==''){
                this.$Spin.hide();
                this.list=[];
                return ;
            } ;
            // 删除最后一个逗号 
            ids = ids.slice(0, -1);
            console.log(ids);
            this.axios.get(`site/comment/getshopcargoods/${ids}`)
            .then(response=>{
                // console.log(response);
                // console.log(response.data.message);-
                // 吧购买商品的数量匹配到返回的数据中
                response.data.message.forEach((v,i) => {
                    // 通过id获取购物车中的 加入到购物车中的数量
                    v.buycount = buylist[v.id];
                    v.isbuy = true ;
                    this.$Spin.hide();
                });
                this.list=response.data.message;
                // vue无法跟踪动态更改的变量 只能跟踪事先定义好的 解决方法 将要更改的变量先更改再定义
            })
        },
        // 计算属性
        computed:{
            selectcount(){
                // 声明一个变量记录选中的数量
                let totalcount = 0; 
                // 非空判断 
                if(this.list==undefined) return totalcount ;
                this.list.forEach(v=>{
                    if(v.isbuy){
                        totalcount+=v.buycount;
                    }
                })
                return totalcount ;
            },
            totalprice(){
                let price =0;
                if(this.list==undefined)return price ;
                this.list.forEach(v=>{
                    if(v.isbuy){
                        price+=v.buycount*v.sell_price
                    }
                })
                return price
            },
        }
        ,methods:{
            countchange(value,index){
                //  console.log(value,index);
                this.$store.commit('changecount',{
                    goodid:this.list[index].id,
                    goodnum:value
                })
            },
            del(){
                // console.log(this.delindex);
                // 删除vuex中的数据 先获取id后再删除数据
                this.$store.commit('delgodbyid',this.list[this.delindex].id);
                // 删除购物车中的数据
                this.list.splice(this.delindex,1);
                // 关闭对话框 
                this.showmodel=false;
            }
        },
    }
</script>

<style>
</style>