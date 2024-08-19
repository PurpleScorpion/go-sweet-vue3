import { defineStore } from 'pinia';
import { statusCode } from '~/store/status-code'

export const sysMenuStore = defineStore('sysMenu', {
    state: () => ({
        id: 0,
        dialogType: 'Insert',
        dialogVisible: false,
        pageData: [{}],
        parentMenu: [{}],
        menuEntity: {},
        menuResCode: 200
    }),

    actions: {
        async getPageData() {
            const { data } : any = await useFetch('/sys/menu/pageData', {
                method: 'post',
                watch: false
            });
            this.pageData = []
            if (data.value && data.value.code == 200 && data.value.data) {
                for (let i = 0; i < data.value.data.length; i++) {
                    this.pageData.push(data.value.data[i]);
                }
            }
        },
        async deleteMenuById(id: any) {
          const { data }: any = await useFetch(`/sys/menu/deleteMenuById/${id}`, {
            method: 'get',
            watch: false
          });
          statusCode(data.value)
        },
        async allParentMenu() {
          const { data }: any = await useFetch(`/sys/menu/allParentMenu`, {
            method: 'get',
            watch: false
          });
          this.parentMenu = []
          if (data.value && data.value.code == 200 && data.value.data) {
              for (let i = 0; i < data.value.data.length; i++) {
                  this.parentMenu.push({
                    value: data.value.data[i].id,
                    label: data.value.data[i].menuName
                  })
              }
          }
        },
        async getMenuById(id: any) {
          const { data }: any = await useFetch(`/sys/menu/getMenuById/${id}`, {
            method: 'get',
            watch: false
          });
          this.menuEntity = {}
          if (data.value && data.value.code == 200) {
              this.menuEntity = data.value.data
          }
        },
        async addOrUpdateMenu(hasAdd: any, parma: any) {
          const { data }: any = await useFetch(`/sys/menu/${hasAdd ? 'menuInsert' : 'menuUpdate'}`, {
            method: 'post',
            body: parma,
            watch: false
          });
          this.menuResCode = data.value.code
          statusCode(data.value)
        },
    },
});