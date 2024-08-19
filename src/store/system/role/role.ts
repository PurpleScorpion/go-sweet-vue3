import { defineStore } from 'pinia';
import { statusCode } from '~/store/status-code'

export const sysRoleStore = defineStore('sysRole', {
    state: () => ({
        id: 0,
        dialogType: 'Insert',
        dialogVisible: false,
        rolename: '',
        pageSize: 10,
        current: 1,
        totalCount: 0,
        pageData: [{}],
        roleEntity: {},
        allRoleList: [{}],
        roleResCode: 200
    }),

    actions: {
        async getPageData() {
            const parma = {
                rolename: this.rolename,
                current: this.current,
                pageSize: this.pageSize,
            }
            const { data } : any = await useFetch('/sys/role/pageData', {
                method: 'post',
                body: parma,
                watch: false
            });
            this.pageData = []
            this.totalCount = 0
            if (data.value && data.value.code == 200 && data.value.data && data.value.data.list) {
                this.totalCount = data.value.data.totalCount
                for (let i = 0; i < data.value.data.list.length; i++) {
                    this.pageData.push(data.value.data.list[i]);
                }
            }
        },
        async getRoleById(id: any) {
          const { data }: any = await useFetch(`/sys/role/getRoleById/${id}`, {
            method: 'get',
            watch: false
          });
          this.roleEntity = {}
          if (data.value.code == 200) {
            this.roleEntity = data.value.data
          }
        },
        async deleteRoleById(id: any) {
          const { data }: any = await useFetch(`/sys/role/deleteRoleById/${id}`, {
            method: 'get',
            watch: false
          });
          statusCode(data.value)
        },
        async addOrUpdateRole(hasAdd: any, parma: any) {
          const { data }: any = await useFetch(`/sys/role/${hasAdd ? 'roleInsert' : 'roleUpdate'}`, {
            method: 'post',
            body: parma,
            watch: false
          });
          this.roleResCode = data.value.code
          statusCode(data.value)
        },
        async getAllRole() {
          const { data }: any = await useFetch('/sys/role/getAllRole', {
            method: 'get',
            watch: false
          });
          this.allRoleList = []
          if (data.value && data.value.code == 200 && data.value.data != null) {
            for (let i = 0; i < data.value.data.length; i++) {
              this.allRoleList.push({
                value: data.value.data[i].id,
                label: data.value.data[i].roleName
              })
            }
          }
        },
    },
});