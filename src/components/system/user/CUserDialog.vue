<template>
  <a-drawer v-model:open="dialogVisible" width="500PX" class="custom-class"
            :footer-style="{ textAlign: 'right' }"
            :maskClosable="true"
            :title="dialogType == 'Insert' ? $t('user.user.titleAdd') : $t('user.user.titleUpdate')"
            placement="right">
    <template #footer>
      <a-button style="margin-right: 8px" @click="handleCancel">Cancel</a-button>
      <a-button type="primary" @click="handleSave">OK</a-button>
    </template>
    <a-form ref="formRef" :model="userForm" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item name="userName" :label="$t('user.user.userName')">
        <a-input v-model:value="userForm.username" :readonly="dialogType != 'Insert'"
                 :placeholder="$t('user.user.enterUserName')"/>
      </a-form-item>
      <a-form-item :label="$t('user.user.password')">
        <a-input v-model:value="userForm.password" :placeholder="$t('user.user.enterPassWord')"/>
      </a-form-item>
      <a-form-item :label="$t('user.user.rePassword')">
        <a-input v-model:value="userForm.rePassword" :placeholder="$t('user.user.confirmPassWord')"/>
      </a-form-item>
      <a-form-item :label="$t('user.user.selectrole')">
        <a-select v-model:value="userForm.role" :placeholder="$t('user.user.roleSelect')" :options="allRoleList"
                  option-label-prop="label">
        </a-select>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>
<script setup lang="ts">
import {sysUserStore} from "~/store/system/user/user";
import {sysRoleStore} from "~/store/system/role/role";
import {useI18n} from 'vue-i18n';

const {t} = useI18n();
const {addOrUpdateUser, getPageData} = sysUserStore();
const {userEntity, dialogType, dialogVisible,resCode} = storeToRefs(sysUserStore());
const {allRoleList} = storeToRefs(sysRoleStore());
const labelCol = {style: {width: "130px", textAlign: "left"}};
const wrapperCol = {span: 20};
const checkStrictly = ref<boolean>(true);
const checkedKeys = ref<string[]>([]);
const baseIds = ref<string[]>([])
let userForm = ref<any>({
  id: 0,
  username: "",
  password: "",
  role: 0,
  baseRole: 0,
});
watch(
    () => dialogVisible.value,
    (newValue, oldValue) => {
      if (newValue) {
        initPage()
      }
    }
);
const initPage = async () => {

  checkedKeys.value = []

  if (dialogType.value == 'Insert') {
    userForm.value.id = 0
    userForm.value.username = ''
    userForm.value.password = ''
    userForm.value.rePassword = ''
    userForm.value.role = ''
  } else {
    userForm.value.id = userEntity.value.id
    userForm.value.username = userEntity.value.username
    userForm.value.role = userEntity.value.role
  }
};

const handleSave = async () => {
  console.log(checkedKeys.value)
  if (formCheck()) {
    let parma = {
      id: userForm.value.id,
      username: userForm.value.username,
      password: userForm.value.password,
      role: userForm.value.role,
    };
    await addOrUpdateUser(dialogType.value == 'Insert', parma)
    if (resCode.value == 200) {
      handleCancel()
    }
  }
};
const formCheck = () => {
  if (userForm.value.userName == "") {
    message.error(t('msg.user.error1'));
    return false;
  }
  if (userForm.value.role == null) {
    message.error(t('msg.user.error2'));
    return false;
  }

  if (dialogType.value == 'Insert' && userForm.value.password == "") {
    message.error(t('msg.user.error3'));
    return false;
  }
  if (userForm.value.password != "") {
    if (userForm.value.password != userForm.value.rePassword) {
      message.error(t('msg.user.error4'));
      return false;
    }
  }
  return true;
};

const handleCancel = () => {
  getPageData()
  dialogVisible.value = false
};
</script>

<style scoped>
.ant-tree-list {
  padding-top: 10px !important;
}

::v-deep .ant-tree-checkbox {
  margin-top: 0px !important;
}
</style>