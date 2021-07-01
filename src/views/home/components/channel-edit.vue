<template>
    <div class="channel-edit">
      <van-cell :border="false">
        <div slot="title" class="channel-title">我的频道</div>
        <van-button
          class="channel-btn"
          type="danger"
          plain
          round
          size="mini"
          @click="isEdit = !isEdit"
        >{{isEdit ? '完成' : '编辑'}}</van-button>
      </van-cell>

      <van-grid :gutter="10">
        <van-grid-item
            class="grid-item"
            :class="{active: index === active}"
            :icon="(isEdit && index !== 0) ? 'clear' : ''"
            v-for="(channels, index) in userChannels"
            :key="index"
            :text="channels.name"
            @click="onUserChannelClick(index)"
        />
      </van-grid>

      <van-cell :border="false">
        <div slot="title" class="channel-title">频道推荐</div>
      </van-cell>

      <van-grid :gutter="10">
        <van-grid-item
            class="grid-item"
            v-for="(channel , index) in recommendChannels"
            :key="index"
            :text="channel.name"
            @click="onAdd(channel)"
        />
      </van-grid>
    </div>
</template>

<script>
import { getAllChannels } from "@/api/channel";


export default {
  name: "ChannelEdit",
  components: {
  },
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      allChannels: [], //所有频道数据列表
      isEdit: false  //控制编辑的显示状态

    }
  },
  //计算属性
  computed: {
    // 推荐的频道列表
      recommendChannels () {
        //思路： 所有频道 - 我的频道 = 剩下推荐的频道
        //filter 方法： 过滤数据，根据方法返回的布尔值 true 来收集数据
        // filter 方法查找满足条件的所有元素
       return  this.allChannels.filter(channel => {
        //判断 channel 是否属于用户频道
         // find 方法查找满足条件的单个元素
         return !this.userChannels.find(userChannel => {
           // 找到满足该条件的元素
           return userChannel.id === channel.id
         })
        })
      }
  },
  watch: {},
  created() {
    this.loadAllChannels()
  },
  mounted() {
  },
  methods: {
    async loadAllChannels() {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    },
    onAdd (channel) {
      this.userChannels.push(channel)

      //数据持久化
    },
    onUserChannelClick(index) {
      if (this.isEdit && index !==0){
        //编辑状态，删除频道
        this.deleteChannel(index)
      }else {
        // 非编辑状态， 切换频道
        this.switchChannel(index)
      }


    },
    deleteChannel(index){
      console.log('删除频道')
      // 如果删除的是当前激活频道之前的频道
      if (index <= this.active){
        // 更新激活频道的索引
        this.$emit('update-active', this.active - 1)
      }
      this.userChannels.splice(index,1)
      //数据持久化2
    },
    switchChannel (index){
      console.log('切换频道')

      // 切换频道
      this.$emit('update-active',index)
      //关闭弹出层
      this.$emit('close')
    }
  }
}
</script>

<style scoped>
  .channel-edit{
    padding-top: 54px;
  }
  .channel-title{
    font-size: 16px;
    color: #333;
  }
  .grid-item{
    width: 80px;
    height: 43px;
  }
  /deep/.van-grid-item__content{
    background-color: #f4f5f6;
    border-radius: 10px;
  }
  /deep/.van-grid-item__text{
    font-size: 14px;
    color: #222;
    margin-top: 0;
  }
  .channel-btn{
    width: 55px;
  }
  /deep/.van-grid-item__icon{
    position: absolute;
    right: -6px;
    top: -7px;
    font-size: 20px;
    color: #ccc;

  }
  .active /deep/.van-grid-item__text{
    color: red;
  }
</style>