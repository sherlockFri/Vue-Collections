<template>
  <div>
    <van-nav-bar title="用户登录" left-text="返回" left-arrow @click-left="goBack"/>
    <div class="register-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username=''"
        :error-message="usernameErrorMsg"
      />

      <van-field
        ref="password"
        v-model="password"
        :type="type"
        label="密码"
        :icon="icon"
        @click-icon="showOrHidePsw"
        placeholder="请输入密码"
        required
        :error-message="passwordErrorMsg"
      />
      <div class="register-button">
        <van-button type="primary" @click="LoginAction" size="large" :loading="openLoading">马上登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      type: "password",
      icon: "password-not-view",
      username: "",
      password: "",
      openLoading: false, //是否开启用户注册的Loading状态
      usernameErrorMsg: "", //当用户名出现错误时的提示信息
      passwordErrorMsg: "" //当密码出现错误时的提示信息
    };
  },
  watch: {
    username() {
      if (this.username.length < 5) {
        this.usernameErrorMsg = "用户名不能少于5位";
      } else {
        this.usernameErrorMsg = "";
      }
    },
    password() {
      if (this.password.length < 6) {
        this.passwordErrorMsg = "密码不能少于6位";
      } else {
        this.passwordErrorMsg = "";
      }
    }
  },
  created() {
    if (localStorage.userInfo) {
      Toast.success("您已经登录过了");
      this.$router.push("/");
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    LoginAction() {
      //左边错误不执行右边的
      this.checkForm() && this.axiosLoginUser();
    },

    async axiosLoginUser() {
      this.openLoading = true;
      axios({
        url: url.login,
        method: "post",
        data: {
          userName: this.username,
          password: this.password
        }
      })
        .then(response => {
          if (response.data.code == 200) {
            new Promise((resolve, reject) => {
              localStorage.userInfo = { userName: this.username };
              setTimeout(() => {
                resolve();
              }, 500);
            })
              .then(() => {
                Toast.success("登录成功");
                this.$router.push("/");
              })
              .catch(err => {
                Toast.fail("登录状态保存失败");
                console.log(err);
              });
          } else {
            Toast.fail(response.data.massage);
            this.openLoading = false;
          }
        })
        .catch(error => {
          console.log(error);
          Toast.fail("登录失败");
          this.openLoading = false;
        });
    },
    //****表单验证方法
    checkForm() {
      let isOk = true;
      if (!this.username.length) {
        this.usernameErrorMsg = "用户名不能为空";
        isOk = false;
      } else {
        this.usernameErrorMsg = "";
      }
      if (!this.password.length) {
        this.passwordErrorMsg = "密码不能为空";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }

      return isOk;
    },
    showOrHidePsw() {
      if (this.type === "password") {
        this.type = "text";
        this.icon = "password-view";
      } else {
        this.type = "password";
        this.icon = "password-not-view";
      }
    }
  }
};
</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 80px;
}
.register-button {
  padding-top: 10px;
}
</style>
