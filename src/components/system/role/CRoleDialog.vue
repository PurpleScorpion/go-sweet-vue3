<template>
  <a-drawer
    v-model:open="dialogVisible"
    :footer-style="{ textAlign: 'right' }"
    width="500PX" class="custom-class" placement="right"
    :maskClosable="true"
    :title="dialogType == 'Insert' ? $t('user.role.titleAdd') : $t('user.role.titleUpdate')">
    <template #footer>
      <a-button style="margin-right: 8px" @click="handleCancel">Cancel</a-button>
      <a-button type="primary" @click="handleSave">OK</a-button>
    </template>
    <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item :label="$t('user.role.roleName')">
        <a-input
          v-model:value="role.roleName"
          :placeholder="$t('user.role.enterRoleName')"
        />
      </a-form-item>
      <a-form-item :label="$t('user.role.roleSelect')">
        <a-tree
          v-if="menuList.length > 0"
          v-model:checkedKeys="checkedKeys"
          checkable
          default-expand-all
          checkStrictly="checkStrictly"
          @check="onCheck"
          :tree-data="menuList"
        >
        </a-tree>
      </a-form-item>
    </a-form>
  </a-drawer>
</template>
<script setup lang="ts">
import { treeNodeProps } from "ant-design-vue/es/vc-tree/props";
import { sysRoleStore } from "~/store/system/role/role";
import { sysMenuStore } from "~/store/system/menu/menu";
const { addOrUpdateRole,getPageData } = sysRoleStore();
const { roleEntity,dialogType,dialogVisible,roleResCode } = storeToRefs(sysRoleStore());
const { pageData: menuPageData } = storeToRefs(sysMenuStore());
const labelCol = { style: { width: "130px", textAlign: "left" } };
const wrapperCol = { span: 20 };
const menuList = ref<any>([]);
const checkedKeys = ref<any>([]);
const menuIds = ref<string[]>([])
interface RoleForm {
  id: number | 0;
  roleName: string | "";
  menuIds: any | [];
}
let role = ref<RoleForm>({
  id: 0,
  roleName: "",
  menuIds: [],
});
watch(
  () => dialogVisible.value,
  (newValue, oldValue) => {
    if (newValue) {
      initPage();
    }
  }
);
const initPage = async () => {
    menuList.value = []
    checkedKeys.value = []
    let jsonString = JSON.stringify(menuPageData.value);
    jsonString = jsonString.replaceAll("\"id\"","\"key\"")
    jsonString = jsonString.replaceAll("\"menuName\"","\"title\"")
    
    menuList.value = JSON.parse(jsonString)
    
    if (dialogType.value == 'Insert'){
        role.value.id = 0
        role.value.roleName = ''
        role.value.menuIds = []
        return
    }
    role.value.id = roleEntity.value.id
    role.value.roleName = roleEntity.value.roleName
    checkedKeys.value = roleEntity.value.menuIds
    menuIds.value = roleEntity.value.menuIds
};

watch(checkedKeys , () => {
  if (checkedKeys.value && checkedKeys.value.checked){
    menuIds.value = checkedKeys.value.checked
  }
});

const handleSave = async () => {
  let parma = {
    id: role.value.id,
    roleName: role.value.roleName,
    menuIds: menuIds.value,
  };
  await addOrUpdateRole(dialogType.value == 'Insert', parma);
  if (roleResCode.value == 200){

    handleCancel()
  }
};

const onCheck = (
  checkedKeys: { value: any },
  info: { node: { eventKey: any }; checked: any }
) => {
  checkedKeys.value = checkedKeys;
  let arr: any = findChildren(info.node.eventKey);
  if (info.checked) {
    for (let i = 0; i < arr.length; i++) {
      if (!contain(checkedKeys.value.checked, arr[i])) {
        checkedKeys.value.checked.push(arr[i]);
      }
    }
  } else {
    //判断是否为父组件
    if (hasParent(info.node.eventKey)) {
      //移出所有的子节点
      checkedKeys.value.checked = checkedKeys.value.checked.filter(
        (item: any) => !arr.includes(item)
      );
    } else {
      //如果该子组件同级的所有子组件全部没有选中,则移除父组件
      //先找同级子组件
      let obj = findSelf(info.node.eventKey);
      if (obj != null) {
        //查找平级组件
        let child: any = findChildren(obj.parentId);
        //判断平级组件是否全部取消
        let flag = false;
        for (let i = 0; i < child.length; i++) {
          if (contain(checkedKeys.value.checked, child[i])) {
            flag = true;
          }
        }
        if (!flag) {
          //如果全部取消 ,则删除父元素
          checkedKeys.value.checked = checkedKeys.value.checked.filter(
            (item: any) => item !== obj.parentId
          );
        }
      }
    }
  }
};

const hasParent = (num: any) => {
  for (let i = 0; i < menuList.value.length; i++) {
    if (menuList.value[i].key == num) {
      return true;
    }
  }
  return false;
};
const contain = (arr: string | any[], num: any) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == num) {
      return true;
    }
  }
  return false;
};
const findSelf = (id: any) => {
  for (let i = 0; i < menuList.value.length; i++) {
    if (menuList.value[i].type == 0) continue;
    let children = menuList.value[i].children;
    let arr = [menuList.value[i].key];
    if (children != null && children.length > 0) {
      for (var j = 0; j < children.length; j++) {
        if (children[j].key == id) {
          return children[j];
        }
      }
    }
  }
  return null;
};
const findChildren = (id: any) => {
  //先查是否选中的是父节点
  for (let i = 0; i < menuList.value.length; i++) {
    if (menuList.value[i].key == id) {
      let arr = [];
      //查找子节点
      let children = menuList.value[i].children;
      if (children != null && children.length > 0) {
        for (var j = 0; j < children.length; j++) {
          arr.push(children[j].key);
        }
      }
      return arr;
    }
  }
  //否则查询子节点
  for (let i = 0; i < menuList.value.length; i++) {
    if (menuList.value[i].type == 0) continue;
    let children = menuList.value[i].children;
    let arr = [menuList.value[i].key];
    if (children != null && children.length > 0) {
      for (var j = 0; j < children.length; j++) {
        if (children[j].key == id) {
          return arr;
        }
      }
    }
  }
};
const handleCancel = () => {
  getPageData()
  dialogVisible.value = false
};
</script>

