<template>
  <a-drawer v-model:open="dialogVisible"
            :footer-style="{ textAlign: 'right' }"
            width="700PX" class="custom-class" placement="right"
            :maskClosable="true"
            :title="dialogType == 'Insert' ? $t('user.menu.titleAdd') : $t('user.menu.titleUpdate')">
    <template #footer>
      <a-button style="margin-right: 8px" @click="handleCancel">Cancel</a-button>
      <a-button type="primary" @click="handleSave">OK</a-button>
    </template>
    <a-form ref="formRef" :model="menuForm" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item :label="$t('user.menu.type')" v-if="dialogType == 'Insert'">
        <a-radio-group v-model:value="menuForm.menuType" name="menuType">
          <a-radio :value="1"> {{ $t("user.menu.directory") }}</a-radio>
          <a-radio :value="2"> {{ $t("user.menu.menu") }}</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item :label="$t('user.menu.parentDirectory')" v-if="menuForm.menuType == 2" name="parentId">
        <a-select v-model:value="menuForm.parentId" :options="parentMenu" option-label-prop="label"
                  :placeholder="$t('user.menu.parentDirectorySelect')">
        </a-select>
      </a-form-item>
      <a-form-item :label="
          menuForm.menuType == 2
            ? $t('user.menu.menu')
            : $t('user.menu.directory')
        " name="menuName">
        <a-input v-model:value="menuForm.menuName" :placeholder="
            menuForm.menuType == 2
              ? $t('user.menu.menuEnter')
              : $t('user.menu.directoryEnter')
          "/>
      </a-form-item>
      <a-form-item :label="$t('user.menu.router')" name="routerName">
        <a-input v-model:value="menuForm.routerName" :placeholder="$t('user.menu.routerEnter')"/>
      </a-form-item>
      <a-form-item :label="$t('user.menu.order')" name="orderNum">
        <a-input-number v-model:value="menuForm.orderNum" :min="0" :max="100"/>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>
<script setup lang="ts">
import {sysMenuStore} from "~/store/system/menu/menu";

const {addOrUpdateMenu} = sysMenuStore();
const {menuEntity, parentMenu, menuResCode,dialogType,dialogVisible } = storeToRefs(sysMenuStore());
const emits = defineEmits(["close"]);
const labelCol = {style: {width: "130px", textAlign: "left"}};
const wrapperCol = {span: 20};


interface MenuForm {
  id: number | 0;
  menuType: number | 1;
  parentId: number | null;
  menuName: string | "";
  routerName: string | "";
  isSys: number | 0;
  orderNum: number | 0;
}

let menuForm = ref<MenuForm>({
  id: 0,
  menuType: 1,
  parentId: null,
  menuName: "",
  routerName: "",
  isSys: 0,
  orderNum: 0,
});
const formRef = ref();
watch(
    () => dialogVisible.value,
    (newValue, oldValue) => {
      if (newValue) {
        initPage();
      }
    }
);
const initPage = async () => {
  if (dialogType.value == 'Insert') {
    menuForm.value.id = 0
    menuForm.value.menuType = 1
    menuForm.value.parentId = null
    menuForm.value.menuName = ""
    menuForm.value.routerName = ""
    menuForm.value.orderNum = 0
    return
  }
  menuForm.value.id = menuEntity.value.id
  menuForm.value.menuType = menuEntity.value.menuType
  menuForm.value.parentId = menuEntity.value.parentId
  menuForm.value.menuName = menuEntity.value.menuName
  menuForm.value.routerName = menuEntity.value.routerName
  menuForm.value.orderNum = menuEntity.value.orderNum

};
const handleSave = async () => {
  await addOrUpdateMenu(dialogType.value == 'Insert', menuForm);
  if (menuResCode.value == 200) {
    emits("close", true);
  }
};
const handleCancel = () => {
  formRef.value.resetFields();
  emits("close");
};
</script>