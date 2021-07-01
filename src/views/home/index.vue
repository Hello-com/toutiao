<template>
    <div class="home-container">
<!--      导航栏-->
      <van-nav-bar
          class="van-nav-bar">
        <van-button slot="title"
                    class="search-btn"
                    type="info"
                    icon="search"
                    round
                    size="small"
        >搜索</van-button>
      </van-nav-bar>
<!--      /导航栏-->

<!--      文章频道列表-->

<!--      标签页组件有一个功能，只要你第一次查看标签页的时候才会渲染里面的内容-->
      <van-tabs class="channel-tabs" v-model="active">
        <van-tab
            v-for="channel in channels"
            :title="channel.name"
            :key="channel.id"
        >
<!--          文章列表-->
          <article-list :channel="channel"/>
<!--          /文章列表-->
        </van-tab>

<!--        汉堡按钮定位把列表最后的位置挡住了，解决办法就是在这里添加一个占位元素-->
        <div slot="nav-right" class="wap-nav-placeholder"></div>
        <div
            slot="nav-right"
            @click="isChannelEditShow = true"
            class="wap-nav-warp"
        >
          <van-icon name="wap-nav" />
        </div>
      </van-tabs>
<!--      /文章频道列表-->

      <van-popup
          v-model="isChannelEditShow"
          position="bottom"
          class="channel-edit-popup"
          closeable
          close-icon-position="top-left"
          get-container="body"
          style="height: 100%"
      >

        <!--   简便写法 模板中的 $event   表示时间参数
          @update-active="active = $event"-->
        <channel-edit
            :user-channels="channels"
            :active="active"
            @close="isChannelEditShow = false"
            @update-active="onUpdateActive"
        />
      </van-popup>
    </div>
</template>

<script>
import { getUserChannels } from "@/api/user"
import ArticleList from "@/views/home/components/article-list"
import ChannelEdit from "@/views/home/components/channel-edit"

export default {
  name: "HomeIndex",
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,  //控制被激活的标签
      channels: [], // 频道列表
      isChannelEditShow: false  //控制编辑频道的显示状态
    }
  },
  created() {
    //加载文章频道数据
    this.loadChannels()
  },
  methods: {
   async loadChannels () {
      //请求获取频道数据
      const { data } = await getUserChannels()
      this.channels = data.data.channels
    },
    onUpdateActive(index) {
      this.active = index
  }

  }
}
</script>

<style scoped>
   .home-container .search-btn{
      width: 277px;
      height: 32px;
      background: #5babfb;
     border: none;
    }
   /deep/ .van-nav-bar__title{
      max-width: unset;

    }
   .van-icon{
     font-size: 16px;
   }
   .van-button__text{
     font-size: 14px;
   }
   .channel-tabs{

   }
   /deep/ .van-tab{
     /*border-right: 1px solid #edeff3;*/
     /*border-bottom: 1px solid #edeff3;*/
   }
   /deep/.van-tabs__line{
     width: 15px !important;
     height: 3px;
     background: #3296fa;
     bottom: 20px;
   }
   /*.channel-edit-popup{*/
   /*  height: 100%;*/
   /*}*/
   .wap-nav-warp{
     position: fixed;
     right: 0;
     height: 44px;
     width: 33px;
     display: flex;
     justify-content: center;
     align-items: center;
     background: #fff;
     opacity: .9;
   }
   .van-icon{
     font-size: 21px;
   }
   .wap-nav-placeholder{
     width: 33px;
     flex-shrink: 0;
   }
</style>