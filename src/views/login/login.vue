<template>
 <div class="container">
  <el-form ref="formRef" :model="formList" :rules="rules">
   <div class="title">vue3-admin</div>
   <div class="content">
    <el-form-item prop="username">
     <el-input
      v-model="formList.username"
      :prefix-icon="Avatar"
      clearable
      placeholder="请输入用户名"></el-input>
    </el-form-item>
    <el-form-item prop="password">
     <el-input
      v-model="formList.password"
      :prefix-icon="Lock"
      clearable
      show-password
      type="password"
      placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item prop="captcha" v-if="loginOrRegister">
     <div class="captcha_box">
      <el-input
       v-model="formList.captcha"
       :prefix-icon="ScaleToOriginal"
       clearable
       placeholder="请输入验证码"
       autocomplete="off"></el-input>
      <div
       v-html="captcha_img"
       class="captcha_image"
       @click="getCaptchaImg"></div>
     </div>
    </el-form-item>
    <el-form-item>
     <div class="form-btn-group">
      <el-button
       color="#626aef"
       class="submit-btn"
       type="primary"
       @click="submitForm(formRef)">
       {{ loginOrRegister ? '登录' : '注册' }}
      </el-button>
      <el-button color="#626aef" type="primary" @click="handleLoginOrRegister">
       <el-icon :size="20"> <Refresh /> </el-icon>
      </el-button>
     </div>
    </el-form-item>
   </div>
  </el-form>
 </div>
</template>

<script setup>
 import { onMounted } from 'vue'
 import { Avatar, Lock, ScaleToOriginal } from '@element-plus/icons-vue'
 import { reactive, ref } from 'vue'
 // import { login } from '../../api/user' // mock 测试使用
 import { ElMessage } from 'element-plus'
 import { login, register, getCaptcha } from '../../api/user'
 import { useRouter } from 'vue-router'

 onMounted(() => {
  getCaptchaImg()
 })

 // 获取路由实例
 const router = useRouter()

 // 定义表单实例，用于验证。
 const formRef = ref(null)

 // 定义要绑定的表单数据，注册登陆时候保存的数据，注意与formRef区别，formRef是绑定表单的实例
 const formList = reactive({
  username: '',
  password: '',
  captcha: '', // 验证码
 })

 // 定义验证规则
 const rules = {
  username: [
   { required: true, message: '请输入用户名', trigger: 'blur' },
   { max: 12, message: '长度不能超过 12 个字符', trigger: 'blur' },
  ],
  password: [
   { required: true, message: '请输入密码', trigger: 'blur' },
   { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' },
  ],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
 }

 const submitForm = (formEl) => {
  if (!formEl) return
  formEl.validate((valid) => {
   if (valid) {
    // 表单校验成功，判断当前是登录逻辑还是注册逻辑
    if (loginOrRegister.value) {
     // 登录逻辑,传参主要为了用它的一个清空表单的方法
     loginForm(formEl)
    } else {
     // 注册逻辑
     registerForm(formEl)
    }
   }
  })
 }

 // 切换注册登录
 // 定义保存注册还是登录的变量
 const loginOrRegister = ref(true)
 const handleLoginOrRegister = () => {
  loginOrRegister.value = !loginOrRegister.value
 }

 // 登录逻辑
 const loginForm = async (formEl) => {
  // 暂时注掉，先写前端页面，后面补全
  // const res = await login(formList)
  // if (res.code === 200) {
  //  // 跳转到首页
  //  formEl.resetFields()
  //  router.push('/home') 
  //  ElMessage.success(res.message)
  //  localStorage.setItem('token', res.data.token)
  // } else {
  //  getCaptchaImg()
  //  ElMessage.error(res.message)
  // }
  router.push('/home')
 }
 // 注册逻辑
 const registerForm = async (formEl) => {
  // 调用api接口
  const { message } = await register(formList)
  formEl.resetFields()
  ElMessage.success(message)
 }

 // 获取验证码
 const captcha_img = ref('')
 const getCaptchaImg = async () => {
  // 请求获取验证码接口
  // const res = await getCaptcha()
  // captcha_img.value = res.data
 }
</script>

<style scoped lang="scss">
 .container {
  width: 100%;
  height: 100vh;
  background: url('../../assets/login-bg.svg') no-repeat bottom;
  

  .title {
   font-size: 40px;
   color: #ffff;
   margin-bottom: 10px;
  }

  .el-form {
   display: flex;
   height: 100%;
   flex-direction: column;
   align-items: center;
   justify-content: center;

   .el-input {
    width: 400px;
    height: 45px;
    border-radius: 10%;
    background-color: #283443 !important;
   }
  }

  .content {
   width: 400px;
   .form-btn-group {
    width: 400px;
    display: flex;
    justify-content: space-between;

    .submit-btn {
     flex: 1;
    }
   }

   .captcha_box {
    display: flex;
    width: 100%;
    align-items: center;
    .captcha_image {
     width: 100px;
     transform: scale(0.9);
     cursor: pointer;
    }
   }
  }
 }
</style>
