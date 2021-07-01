<template>
    <div class="my-container">
      <van-cell-group v-if="user" class="my-info">
        <van-cell
            class="base-info"
            center
            :border="false"
          >
          <van-image
              class="avater"
              slot="icon"
              round
              fit="cover"
              :src="currentUser.photo"
          />
          <div class="name" slot="title">{{currentUser.name}}</div>
          <van-button
              class="update-btn"
              type="default"
              size="small"
              round
          >编辑资料</van-button>
        </van-cell>

        <van-grid class="data-info" :border="false">
          <van-grid-item class="data-info-item">
            <div class="text-wrap" slot="text">
              <div class="count">{{currentUser.art_count}}</div>
              <div class="text">头条</div>
            </div>
          </van-grid-item>
          <van-grid-item class="data-info-item">
            <div slot="text" class="text-wrap">
             <div class="count">{{ currentUser.follow_count }}</div>
              <div class="text">关注</div>
            </div>
          </van-grid-item>
          <van-grid-item class="data-info-item">
            <div slot="text" class="text-wrap">
              <div class="count">{{ currentUser.fans_count }}</div>
              <div class="text">粉丝</div>
            </div>
          </van-grid-item>
          <van-grid-item  class="data-info-item">
            <div slot="text" class="text-wrap">
              <div class="count">{{ currentUser.like_count }}</div>
              <div class="text">获赞</div>
            </div>
          </van-grid-item>
        </van-grid>
      </van-cell-group>

      <div v-else class="not-login">
        <div @click="$router.push('/login')">
          <img class="mobile" src="./mobile.png">
        </div>
        <div>
          <div class="text">登陆/注册</div>
        </div>
      </div>

      <van-grid class="nav-grid mb-4"  :column-num="2">
        <van-grid-item
            class="nav-grid-item"
            icon-prefix="iconfont"
            icon="shoucang"
            text="收藏"
        />
        <van-grid-item
            class="nav-grid-item"
            icon-prefix="iconfont"
            icon="lishi"
            text="历史"
        />
      </van-grid>

      <van-cell title="消息通知" is-link url="/" />
      <van-cell title="小智同学" class="mb-4" is-link to="/" />
      <van-cell
          v-if="user"
          class="logout-cell"
          title="退出登陆"
          @click="onLogout"
      />
    </div>
</template>

<script>
import { mapState} from "vuex";
import { getCurrentUser } from '@/api/user'

export default {
  name: "MyIndex",
  data () {
    return {
      currentUser: {

      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.loadCurrentUser()
  },
  methods: {
    async loadCurrentUser () {
      const { data } = await getCurrentUser()
      this.currentUser = data.data
    },

    onLogout() {

      //提示用户确认退出
      // 确认 -> 处理退出
     this.$dialog.confirm({
        title: '推出提示',
        message: '确认要退出登陆吗 ？',
      })
          .then(() => {   //确认执行这里
            // 清除用户登陆状态
            this.$store.commit('setUser',null)
          })
          .catch(() => { //退出执行这里
            // on cancel
          });
    }
  }
}
</script>

<style scoped>
  .my-info{
    background: url("./banner.png") no-repeat;
    background-size: cover;
  }
  .not-login{
    height: 180px;
    background: url("banner.png");
    background-size: cover;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
  .not-login .mobile{
    width: 66px;
    height: 66px;
  }
  .not-login .text{
    font-size: 14px;
    color: #fff;
  }

  .my-info .base-info{
    background: unset;
    height: 115px;
    box-sizing: border-box;
    padding-top: 38px;
    padding-bottom: 11px;
  }
  .my-info .avater{
    height: 66px;
    width: 66px;
    border: 1px solid #fff;
    box-sizing: border-box;
    margin-right: 11px;
  }
  .my-info .name{
    font-size: 15px;
    color: #fff;
  }
  .my-info .update-btn{
    height: 16px;
    font-size: 10px;
    color: #666;
  }
  .data-info{

  }
  .data-info .data-info-item{
    height: 65px;
    color: #fff;
  }
  .data-info .text-wrap{
    /*display: flex;*/
    /*flex-direction: column;*/
    /*justify-content: center;*/
    text-align: center;
  }
  .data-info .count{
    font-size: 18px;
  }
  .data-info .text{
    font-size: 10px;
  }

  .nav-grid{

  }
  .nav-grid .nav-grid-item{
    height: 70px;
  }
  .nav-grid /deep/ .iconfont {
    font-size: 20px;
  }
  /deep/ .iconfont-shoucang{
    color: #eb5253;
  }
  /deep/ .iconfont-lishi{
    color: #ff9d1d;
  }
  /deep/ .van-grid-item__text{
    color: #333;
    font-size: 14px;
  }
  .logout-cell{
    text-align: center;
    color: #d86262;
  }
  .mb-4 {
    margin-bottom: 4px;
  }

  .my-info /deep/ .van-grid-item__content{
    background: unset;
  }

</style>