import {defineStore} from 'pinia';
import { statusCode } from '~/store/status-code'

export const sysUserStore = defineStore('sysUser', {
    state: () => ({
        id: 0,
        dialogType: 'Insert',
        dialogVisible: false,
        username: '',
        pageSize: 10,
        current: 1,
        totalCount: 0,
        pageData: [{}],
        userEntity: {},
        resCode: 200,
    }),

    actions: {
        async getPageData() {
            const parma = {
                username: this.username,
                current: this.current,
                pageSize: this.pageSize,
            }
            const {data}: any = await useFetch('/sys/user/pageData', {
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
        async getUserById(id: any) {
            const {data}: any = await useFetch(`/sys/user/getUserById/${id}`, {
                method: 'get',
                watch: false
            });
            this.userEntity = {}
            if (data.value.code == 200) {
                this.userEntity = data.value.data
            }
        },
        async deleteUserById(id: any) {
            const {data}: any = await useFetch(`/sys/user/deleteUserById/${id}`, {
                method: 'get',
                watch: false
            });
            this.resCode = data.value.code
            statusCode(data.value)
        },
        async addOrUpdateUser(hasAdd: boolean, parma: any) {
            const {data}: any = await useFetch(`/sys/user/${hasAdd ? 'userInsert' : 'userUpdate'}`, {
                method: 'post',
                body: parma,
                watch: false
            });
            this.resCode = data.value.code
            statusCode(data.value)
        },
        async healthCheck() {
            const {data}: any = await useFetch(`/sys/user/healthCheck`, {
                method: 'get',
                watch: false
            });
            if (data.value && data.value.code == 200 && data.value.data){
                sessionStorage.setItem("token",data.value.data)
            }
        },
        async changeUserStatus(parma: any) {
            const {data}: any = await useFetch(`/sys/user/changeUserStatus`, {
                method: 'post',
                body: parma,
                watch: false
            });
            statusCode(data.value)
        },

    },
});