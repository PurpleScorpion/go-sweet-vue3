<template>
    <a-table class="mt-20 fsize22 mytable" :columns="columns" :bordered="false" :row-key="record => record.Id"
        :pagination="false" :data-source="pageData">
        <template #headerCell="{ column }">
            <span>{{ $t(column.title) }}</span>
        </template>
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <EditOutlined
              class="icon"
              @click="userAlertsHandle(record.id)"
            />
            <a-divider type="vertical" />
            <DeleteOutlined class="icon" @click="deleteUser(record.id)" />
            <a-divider type="vertical" />
            <a-switch :checkedValue="record.status == 0"
                      :checked-children="$t('user.mst.base.enabled')"
                      :un-checked-children="$t('user.mst.base.disabled')"
                      @click="changeStatus(record.id,record.status)" />
          </template>
        </template>
    </a-table>
    <a-pagination v-model:current="current" style="float:right" id="limit-page" @change="changePage"
        :page-size-options="pageSizeOptions" :total="totalCount"
        :show-total="totalCount => $t('common.pageLimit.limit1')+` ${totalCount} `+$t('common.pageLimit.limit1')"
        show-size-changer :page-size="pageSize" @showSizeChange="onShowSizeChange">
        <template slot="buildOptionText" slot-scope="props">
            {{ props.value }}/ {{ $t('common.pageLimit.limit1') }}
        </template>
    </a-pagination>
</template>

<script lang="ts" setup>
    import { useGlobalConfigStore } from "~/store/global";
    import { ref } from "vue";
    import { useI18n } from 'vue-i18n';
    import { sysUserStore } from "~/store/system/user/user";
    import { sysRoleStore } from "~/store/system/role/role";
    const { current,
        pageSize,
        totalCount,
        pageData,
        dialogType,
        dialogVisible,
    } = storeToRefs(sysUserStore());

    const { getPageData,deleteUserById,getUserById,changeUserStatus } = sysUserStore();
    const { getAllRole } = sysRoleStore();
    const { t } = useI18n();

    const pageSizeOptions = ref<any>(['10', '20', '30', '40', '50'])

    const columns = [{
        title: "user.user.userName",
        dataIndex: "username",
        key: "username",
        width: "15%",
    },
    {
        title: "user.user.role",
        dataIndex: "roleName",
        key: "roleName",
        width: "15%",
    },
    {
        title: "user.user.createTime",
        dataIndex: "lastModifiedDate",
        key: "lastModifiedDate",
        width: "15%",
    },
    {
        title: "user.user.action",
        dataIndex: "action",
        key: "action",
        width: "15%",
    },
    ];
    onMounted(() => {
        initPage()
    });

    const changePage = async (page : number, ps) => {
        current.value = page
        await getPageData()
    }

    const onShowSizeChange = async (ct, ps : number) => {
        pageSize.value = ps;
        current.value = 1
        await getPageData()
    }

    const initPage = async () => {
        current.value = 1
        pageSize.value = 10
        await getPageData()
    }

    const changeStatus = async(id : number,status: number) => {

      let state = 0
      if (status == 0){
        state = 1
      }

      await changeUserStatus({
        id: id,
        status: state,
      })
      await getPageData();
    }

    const deleteUser = async (id: any) => {
      Modal.confirm({
        title: t('user.user.deleteUser'),
        centered:true,
        async onOk() {
          await deleteUserById(id);
          await getPageData()
        },
        onCancel() {},
      });
    };
    
    const userAlertsHandle = async(id: any) => {
        await getUserById(id)
        await getAllRole()
        dialogType.value = "Update"
        dialogVisible.value = true;
    };
</script>

<style scoped>
    .icon {
        font-size: 18px;
    }
    .d-success-text {
        color: #6fce7f;
    }

    .d-error-text {
        color: #d93026;
    }

    .d-close-text {
        color: rgb(136, 136, 136);
    }

    .d-warning-text {
        color: #ffc440;
    }



    #limit-page {
        .ant-select {
            font-weight: normal;
        }

        .ant-pagination-options {
            height: 44px;
        }

        .ant-select-selection-selected-value {
            height: 32px;
            line-height: 27px;
        }

        float: right;
        margin-bottom: 20px;
        margin-top: 10px;
    }
</style>