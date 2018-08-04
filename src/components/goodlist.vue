<template>
    <div class="goodsInfo">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!-- v-if判断 这里图片2的渲染在数据返回之前 所以加入if判断 在数据回来后在渲染页面  -->
                            <div class="pic-box" v-if="imglist.length!=0">
                                <ProductZoomer :baseImages="images" :base-zoomer-options="zoomerOptions"></ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.zhaiyao}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <span role="button" class="el-input-number__decrease ">
                                                        <i @click="buynum==1?1:buynum--" class="el-icon-minus"></i>
                                                    </span>
                                                    <span role="button" class="el-input-number__increase">
                                                        <i @click="buynum<goodsinfo.stock_quantity?buynum++:goodsinfo.stock_quantity" class="el-icon-plus"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <!---->
                                                        <input v-model="buynum" autocomplete="off" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner"
                                                            role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1"
                                                            aria-disabled="false">
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                    <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li>
                                            <a href="javascript:;" @click="isshowdesc=true" :class="{selected:isshowdesc}">商品介绍</a>
                                        </li>
                                        <li>
                                            <a href="javascript:;" @click="isshowdesc=false" :class="{selected:!isshowdesc}">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <div v-html="goodsinfo.content" class="tab-content entry" v-show="isshowdesc==true">
                                内容
                            </div>
                            <div class="tab-content" v-show="isshowdesc==false">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model.trim="commentmessage" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="commentbtn" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in commentlist" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | cuttime}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                            <Page :total="totalcount" :page-size="pagesize" placement="top" show-elevator show-sizer @on-change="pagechange($event)" @on-page-size-change="pagesizechange($event)" :page-size-opts='[5,10,15,20]'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg"> 
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="`/goodsInfo/`+item.id">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="`/goodsInfo/`+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | cuttime}}</span>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <BackTop></BackTop>
        <img :src="imglist[0].original_path" style="display:none" v-if="imglist.length!=0" class = "imgmove" alt="">
    </div>
</template>

<script>
    // 导入放大镜组件
    import ProductZoomer from 'vue-product-zoomer';
    // 引入jquery
    import $ from 'jquery';

    export default {
        name: "goodsinfo",
        data: function () {
            return {
                goodsinfo: {},
                hotgoodslist: [],
                imglist: [],
                buynum: 1,
                // 记录显示评论还是显示详情页的变量 
                isshowdesc: true,
                // 评论信息
                commentmessage: '',
                // 存放评论内容的数组1
                commentlist:[],
                // 评论显示的页数
                pageindex:1,
                // 每页显示的数量
                pagesize:5,
                // 总数据量
                totalcount:0,
                // m
                // 放大镜
                'images': {
                    'normal_size': [],
                },
                zoomerOptions: {
                    'zoomFactor': 2
                    ,
                    'pane': 'container-round',
                    'hoverDelay': 300,
                    'namespace': 'inline-zoomer',
                    'move_by_click': true,
                    'scroll_items': 5,
                    'choosed_thumb_border_color': "#bbdefb"
                }

            }
        },
        methods: {
            // 调接口获取数据
           
            getgoodInfo() {
                // 强制初始化
                this.imglist = [];
                // 同时初始化预览图片的数组
                this.images.normal_size = [];
                // 通过路由的方式拼接地址
                this.axios.get(`site/goods/getgoodsinfo/${this.$route.params.id}`)
                    .then(response => {
                        // console.log(response);
                        this.goodsinfo = response.data.message.goodsinfo;
                        this.hotgoodslist = response.data.message.hotgoodslist;
                        this.imglist = response.data.message.imglist;
                        // console.log(this.hotgoodslist);
                        this.imglist.forEach((v, i) => {
                            this.images.normal_size.push({
                                id: v.id,
                                url: v.original_path
                            });
                        })
                        // console.log(this.imglist);
                    })
                    .catch(err => {
                        // console.log(err);
                    });
               
            },
            getcomments(){
                 // 评论页数据获取
                 this.commentlist=[];
                 this.axios.get(`site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${this.pageindex}&pageSize=${this.pagesize}`)
                .then(response=>{
                    // console.log(response);
                    this.commentlist = response.data.message;
                    this.totalcount = response.data.totalcount;
                    // console.log(this.totalcount);
                })
                .catch(err=>{
                    console.log(err);
                })
            },
            // 评论
            commentbtn() {
                if (this.commentmessage == '') {
                    // ivue的弹窗提示
                    this.$Message.error({
                        content: "对方不想理你,并且想你抛出了世界上最好的语言",
                        closable: true
                    });
                    return
                } 
                // 调用接口 发表评论 
                this.axios.post(`site/validate/comment/post/goods/${this.$route.params.id}`,{
                    commenttxt : this.commentmessage
                })
                .then(response=>{
                    // console.log(response);
                    if(response.data.status==0){
                        // 评论成功 提示用户 
                        this.$Message.success('评论成功');
                        this.pagesize == 1 ;
                        this.commentmessage = "" ;
                    }
                })
                .catch(err=>{
                    console.log(err);
                     this.$Message.error('评论失败')
                })
            },
            pagechange(page){
                // console.log('page')
                // tihs.totalcount = 
                // console.log(page)
                this.pageindex = page;
                // 重新调用评论数据
                this.getcomments();
            },
            pagesizechange(size){
                // console.log('size')
                this.pagesize = size;
                // 重新调用评论数据
                this.getcomments(); f
            }
            ,cartAdd(){
                // 获取到加入购物车的位置
                let btnoffest = $('#buyButton .add').offset() ;
                // console.log(btnoffest);
                // 获取到购物车的位置
                let shoppingcar = $('.icon-cart').offset();
                // console.log(shoppingcar); 
                $('.imgmove').show().css(btnoffest).addClass('remove').animate(shoppingcar,1000,()=>{
                    $('.imgmove').hide().removeClass('remove')
                }) ;
                // 修改store库中的值 记录商品信息
                console.log(this.buynum); 
                this.$store.commit('buygood',{
                    goodid:this.$route.params.id ,
                    goodnum:this.buynum
                });
            }
        },
        // 在实例创建出来之后被立即调用 
        created() {
            this.getgoodInfo();
            this.getcomments();
            console.log(this.$store);
        },
        // beforeMount
        beforeMount() { },
        // 显示出来之后 打印$route
        mounted() { },
        // 观察属性 属性值改变时自动调用
        watch: {
            $route(to, from) {
                // 对路由的变化做出反应
                this.getgoodInfo();
                // 重新调用评论数据
                this.getcomments()
            }
        },
        // 注册放大镜组件
        components: {
            ProductZoomer
        }

    };
</script>

<style>
    /* 导入字体图标样式 */

    @import url("../../node_modules/font-awesome/css/font-awesome.min.css");
    .inline-zoomer-zoomer-box {
        width: 368px;
    }

    .pic-box .control-box .thumb-list {
        display: flex;
    }

    .thumb-list img {
        height: 78px;
        width: 78px;
        margin: 5px;
    }

    .control i {
        text-align: center;
    }
    .imgmove{
        display: block ;
        width:40px ;
        height:30px ;
        position: absolute;
        top:10px;
        right:50px ;
    }
    .imgmove.remove{
        transform: rotateZ(3600deg) scale(.3,.3);
        transition: 1s transform ;
    }
</style>