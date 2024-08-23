<template>
  <a-config-provider
    :theme="{
      token: {
        colorPrimary: '#9155fd',
      },
      algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
    }"
  >
    <div class="login-container" :class="darkMode ? '' : 'layout-light'">
      <a-row justify="center" align="middle" style="margin-top: 30vh">
        <a-col :span="24">
          <a-card class="login-form">
            <template #cover>
              <a-col :span="24" align="middle">
                <div class="ems-login-logo">
                  <img src="/logo.png" />
                </div>
              </a-col>
            </template>
            <a-row justify="center">

              <a-col :span="24">
                <a-form :model="user">
                  <a-form-item name="username" :rules="[{ required: true, message: $t('user.login.username.required') }]">
                    <a-input v-model:value="user.username" :placeholder="$t('user.login.username.placeholder')">
                      <template #prefix>
                        <user-outlined style="color: rgba(0, 0, 0, 0.25)" />
                      </template>
                    </a-input>
                  </a-form-item>
                  <a-form-item name="password" :rules="[{ required: true, message: $t('user.login.password.required') }]">
                    <a-input-password v-model:value="user.password" :placeholder="$t('user.login.password.placeholder')">
                      <template #prefix>
                        <LockOutlined style="color: rgba(0, 0, 0, 0.25)" />
                      </template>
                    </a-input-password>
                  </a-form-item>
                  <a-form-item>
                    <a-button class="login-submit" type="primary" html-type="submit" @click="login">{{ $t("user.login.login") }}</a-button>
                  </a-form-item>
                </a-form>
              </a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </a-config-provider>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia"; // import storeToRefs helper hook from pinia
import { useAuthStore } from "~/store/user/auth"; // import the auth store we just created
import { theme } from "ant-design-vue";
import { useGlobalConfigStore } from "~/store/global";
import { ofetch } from "ofetch";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const globalConfig = useGlobalConfigStore();
const { darkMode, userTheme } = storeToRefs(globalConfig);

definePageMeta({
  layout: false,
});

const { authenticateUser } = useAuthStore(); // use authenticateUser action from  auth store

const { authenticated, role, code } = storeToRefs(useAuthStore()); // make authenticated state reactive with storeToRefs

const user = ref({
  username: "",
  password: "",
});
const router = useRouter();

const login = async () => {
  await authenticateUser(user.value); // call authenticateUser and pass the user object
  // redirect to homepage if user is authenticated
  console.log(code.value)
  if (code.value == 200) {
    if (authenticated) {
      router.push("/");
    }
    return
  } else {
    message.error(t("msg.login.error1"));
    return
  }
};
const userToken = useCookie("token");
const baseHeader = {
  "Content-Type": "application/json",
};
const config = useRuntimeConfig(event);
globalThis.$fetch = ofetch.create({ baseURL: config.public.apiBase, headers: baseHeader });

const currentTheme = ref(globalConfig.getUserTheme);
const { useToken } = theme;
const { token } = useToken();
</script>

<style>
body {
  margin: 0;
}

.ems-login-logo{
  height: 50px;
  text-align: center;
  line-height: 50px;
  margin: 16px;
  font-size: 50px;
  color: rgb(0 0 0 / 60%);
  font-weight: 900;
  font-style: italic;
}
.ems-login-logo img {
  height: 50px;
}

.login-form {
  min-width: 200px;
  min-height: 200px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.5);
  max-width: 650px;
}

/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  min-width: 400px;
  min-height: 100vh;
  background: url("/images/vi1.jpg") no-repeat center center;
  background-size: 100% 100%;
}

.layout-light.login-container {
  background: url("/images/vi1.jpg") no-repeat center center;
  background-size: 100% 100%;
}

.layout-light .login-form {
  background: rgba(255, 255, 255, 0.5);
}

.login-title {
  height: 30%;
  font-size: 3vw;
  color: #00aedf;
}

.login-submit {
  width: 100%;
}

.ems-logo-text-microgrid {
  fill: v-bind("currentTheme");
}
</style>
