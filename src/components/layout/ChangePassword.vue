<template>
  <div>
    <a-modal
      v-model:open="props.controlVisible"
      :title="$t('user.login.change_password')"
      @ok="handleOk"
      @cancel="handleCancel(false)"
    >
      <a-form-item>
        <a-input
          v-model:value="user.oldPassword"
          type="password"
          placeholder="Old Password"
        >
          <template #prefix
            ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model:value="user.password"
          type="password"
          placeholder="New Password"
        >
          <template #prefix
            ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
          /></template>
        </a-input>
      </a-form-item>
    </a-modal>
  </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from "~/store/user/auth";
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const { changePwd } = useAuthStore();
const { changePwdData } = storeToRefs(useAuthStore());
const props = defineProps({
  controlVisible: {
    type: Boolean,
    default: false,
  },
});
const user = ref({
  id: 0,
  oldPassword: "",
  password: "",
});
const emits = defineEmits(["close"]);
const handleCancel = (flag:Boolean) => {
  emits("close",flag);
};
const handleOk = async () => {
  const token = useCookie('token')
  user.value.id = token.value
  await changePwd(user);
  if (changePwdData.value && changePwdData.value.code == 200) {
      handleCancel(true)
  } else if(changePwdData.value && changePwdData.value.code == 500){
      message.error(t('message.updatePasswordError500'));
  } else if(changePwdData.value && changePwdData.value.code == 501){
      message.error(t('message.updatePasswordError501'));
  } else {
      message.error(t('message.updatePasswordError'));
  }
  
};
</script>