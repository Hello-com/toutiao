<template>
    <div class="article-list">
      <van-pull-refresh
          v-model="isRefreshLoading"
          :success-text="refreshSuccessText"
          :success-duration="1000"
          @refresh="onRefresh"
      >
      <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
      >

        <article-item
            v-for="(article , index) in articles"
            :key="index"
            :article="article"
        />
<!--        <van-cell-->
<!--            v-for="(article , index) in articles"-->
<!--            :key="index"-->
<!--            :title="article.title"-->
<!--        />-->
      </van-list>
      </van-pull-refresh>
    </div>
</template>

<script>
import { getArticle } from "@/api/article";
import ArticleItem from '@/components/article-item'

export default {
  name: "ArticleList",
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      articles: [], //数据列表
      loading: false, // 控制加载中的 loading 状态
      finished: false,// 控制加载结束状态，当家在结束，不再触发加载更多
      timestamp: null, //获取下一页的时间戳
      isRefreshLoading: false, //下拉刷新的 loading 状态
      refreshSuccessText: ''
    }
  },
  computed: {},
  watch: {},
  created() {
  },
  mounted() {
  },
  methods: {
    async onRefresh () {
      //下拉刷新，组件自己就会展示 loading 状态

      // 1. 请求获取数据
      const {data} = await getArticle({
        channel_id: this.channel.id,   //频道ID
        timestamp: Date.now(),  // 只要你传递不同的时间戳就一定给你放回不一样的数据，而且数据不为空
        with_top: 1
      })

      // 2. 把数据放到数据列表表中， （往顶部中添加）
      const { results } = data.data
      this.articles.unshift(...results)

      // 3. 关闭刷新的状态 loading
      this.isRefreshLoading = false
      this.refreshSuccessText = `更新了${results.length}条数据`

    },
    async onLoad() {
      // 异步更新数据
      // 1.请求获取数据
      const {data} = await getArticle({
        channel_id: this.channel.id,   //频道ID
        timestamp: this.timestamp || Date.now(),  //时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳, timestamp 相当于页码，
        with_top: 1    //	是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
      })
      console.log(data)
      // 2.把数据放到 list 数组中
      const {results} = data.data
      this.articles.push(...results)
      // 3. 设置本次加载状态结束，他才可以判断是否需要加载下一次，否则就会永远的停留在这里
      this.loading = false
      // 4. 数据全部加载完成
      if (results.length) {
        //更新获取下一页数据页码
        this.timestamp = data.data.pre_timestamp
      } else {
        //没有数据了，把加载状态设置为结束，不再触发加载更多
        this.finished = false
      }
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    }
  },

};
</script>

<style scoped>
  .article-list{
    left: 0;
    position: fixed;
    right: 0;
    bottom: 50px;
    top: 90px;
    overflow-y: auto;
  }
</style>