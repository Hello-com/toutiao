<template>
    <div class="login-container">
      <van-nav-bar
          class="van-nav-bar"
          title="登陆/注册"
          left-arrow
          @click-left="$router.back()"
      />

<!--        登陆表单-->
<!--      基于 Vant 的表单验证：
          1. 使用 van-from 组件包裹所有的表单项 van-field
          2. 给 van-form 绑定 submit 事件, 当表单提交时会触发 submit 事件，
          提示： 只有表单验证通过， 它才会调用 submit
          3. 使用 Field 的 rules 属性定义校验规则
-->
      <van-form
                @submit="onLogin"
                @failed="onClick"
                :show-error="false"
                :show-error-message="false"
                validate-first
                ref="login-form"

      >
        <van-field
            v-model="user.mobile"
            icon-prefix="iconfont"
            center
            left-icon="shouji"
            placeholder="请输入手机号"
            name="mobile"
            :rules="formRules.mobile"
        />
        <van-field
            v-model="user.code"
            clearable
            center
            icon-prefix="iconfont"
            left-icon="yanzhengma"
            placeholder="请输入验证码"
            name="code"
            :rules="formRules.code"
        >
          <template #button>

            <van-count-down
                v-if="isCountDownShow"
                :time="1000 * 60"
                 format="ss s"
                @finish="isCountDownShow = false"
            />
            <van-button
                v-else
                class="send-btn"
                size="mini"
                round
                :loading = "isSendSmsLoading"
                @click.prevent="onSendSms"
            >发送验证码</van-button>
          </template>
        </van-field>

        <div class="login-btn-wrap">
          <van-button class="login-btn" type="info" block>登陆</van-button>
        </div>
      </van-form>


    </div>
</template>

<script>
import { login , sendSms} from '@/api/user'
import { Toast } from 'vant'

export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: '',  //手机号
        code: ''    //验证码
      },
      formRules: {
        mobile: [
          {required: true, message: '请输入手机号码'},
          {
            pattern: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {required: true, message: '请输入验证码'},
          {pattern: /^\d{6}$/, message: '验证码格式错误'},
        ]
      },
      isCountDownShow: false,  //控制倒计时和发送按钮的显示状态
      isSendSmsLoading: false  //发送验证码按钮的 loading 状态
    }


  },
  methods: {
    onClick(errors) {
      console.log(errors)
      if (errors.errors[0]) {
        this.$toast({
          message: errors.errors[0].message, //提示消息
          position: 'top'  //防止手机键盘太高看不见提示消息
        })
      }
    },
    async onLogin() {
      Toast.loading({
        message: '加载中...',  //提示文本
        forbidClick: true,   //禁止背景点击
        duration: 0  //展示时长(ms)，值为 0 时，toast 不会消失
      });
      //1. 找到数据接口
      //2. 封装请求方法
      //3. 请求调用登陆
      try {
        const { data } = await login(this.user)
        Toast.success('登陆成功')

        //将后端返回的用户登陆状态 （token等数据） 放到vuex容器中
        this.$store.commit('setUser',data.data)

        //登陆成功，跳转回原来页面
        this.$router.back()
        //先用这种方法，但是它不太好

      } catch (err) {
        Toast.fail('登陆失败,手机或验证码错误')
      }

      //4. 处理响应结果
    },
    async onSendSms () {
      try {

        //校验手机号码
        await this.$refs['login-form'].validate('mobile')
        //验证通过，请求发送验证码
        this.isSendSmsLoading = true  //展示按钮的loading 状态 ， 防止网络慢用户多点触发行为
        await sendSms(this.user.mobile)

        //短信发出去了，隐藏发送按钮，显示倒计时
        this.isCountDownShow = true

        // 倒计时结束 -》 隐藏倒计时 -> 显示发送按钮 （监听倒计时的 finish 事件处理）

      }catch (err){

        // try 里面任何代码的错误都会进入 catch
        // 不同的错误需要不同的提示，那就需要判断了
        let message = ''
        if (err && err.response && err.response.status === 429){

          // 发送短信失败的错误提示
          message= '发送太频繁，请稍后重试'
        }else if (err.name === 'mobile'){

          // 表单验证失败的错误提示
          message = err.message
        }else{

          // 未知错误
          message = '发送失败，请稍后重试'
        }

        // 提示用户
        this.$toast({
            message ,
            position: 'top'
          })

        // this.$toast({
        //   message: err.message,
        //   position: 'top'
        // })
      }

      // 无论发送验证码成功还是失败，最后都要关闭发送按钮 loading 状态
      this.isSendSmsLoading = false

    }
  },



}
</script>

<style scoped>


 .login-container .login-btn-wrap{
    padding: 26px 16px;
 }
 .login-container .login-btn{
   background: #6db4fb;
   border: none;
 }
 .login-container .van-button__text{
   font-size: 15px;
 }
 .login-container .van-cell-group {
   padding: 0px 8px 0 10px;
   margin-top: 20px;
 }

 .login-container .send-btn{
   width: 76px;
   height: 23px;
   background-color:  #ededed;
 }
 .login-container .van-button__text{
   font-size: 11px;
   color: #666;
 }
 .login-container .van-field__left-icon{
 }
</style>