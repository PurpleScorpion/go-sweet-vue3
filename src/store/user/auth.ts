import { number } from 'echarts';
import { defineStore } from 'pinia';
import { statusCode } from '~/store/status-code'

interface UserPayloadInterface {
  username: string;
  password: string;
}
export const useAuthStore = defineStore('auth', {
  state: () => ({
	code:ref<number>(),
    authenticated: false,
    loading: false,
    role:number,
    changePwdData: ref<any>(),
    userPageData: ref<any>(),
    menuList: {
      code: Number,
      msg: String,
      data: ref<any>()
    },
    userPageHelper: {
        current: 1,
        pageSize: 10,
        username: ""
    },
    roleList: ref<any>(),
    rolePageList: ref<any>(),
    menuShowList: ref<any>(),
  }),

  actions: {
    async authenticateUser({ username, password }: UserPayloadInterface) {
      // useFetch from nuxt 3
      const { data, pending }: any = await useFetch('/login', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: {
          username,
          password,
        },
        watch: false
      });
      this.loading = pending;
      this.authenticated = false;
      if (data.value) {
		this.code = data.value.code
        this.menuShowList=[]
        this.role = data?.value?.data.role
        this.authenticated = true; // set authenticated  state value to true
        const menuShowList = useCookie('menuShowList');
        menuShowList.value = data.value.data.routers;
        sessionStorage.setItem("token",data?.value?.data.token)
        sessionStorage.setItem("role",data?.value?.data.role)
        sessionStorage.setItem("username",data?.value?.data.username)
        sessionStorage.setItem("menuShowList",data.value.data.routers)
      }
    },
    async changePwd(parma: any) {
      const { data }: any = await useFetch(`/rePassword`, {
        method: 'post',
        body: parma,
        watch: false
      });
      this.changePwdData = data.value
    },
    logUserOut() {
      const token = useCookie('token'); // useCookie new hook in nuxt 3
      this.authenticated = false; // set authenticated  state value to false
      token.value = null; // clear the token cookie
      const passwordStatus = useCookie('passwordStatus');
      passwordStatus.value = null
      sessionStorage.removeItem("token")
    },
    async getRoleById(id: any) {
      const { data }: any = await useFetch(`/role/getRoleById/${id}`, {
        method: 'get',
        watch: false
      });
      if (data.value.code == 200) {
        return data.value.data
      }
    },
    async deleteMenuById(id: any) {
      const { data }: any = await useFetch(`/menu/deleteMenuById/${id}`, {
        method: 'get',
        watch: false
      });
      statusCode(data.value)
    },
    
    async deleteRoleById(id: any) {
      const { data }: any = await useFetch(`/role/deleteRoleById/${id}`, {
        method: 'get',
        watch: false
      });
      statusCode(data.value)
    },
    
    async getAllRole() {
      const { data }: any = await useFetch('/role/getAllRole', {
        method: 'get',
        watch: false
      });
      if (data.value && data.value.code == 200 && data.value.data != null) {
        let roleData = [];
        for (let i = 0; i < data.value.data.length; i++) {
          roleData.push({
            value: data.value.data[i].id,
            label: data.value.data[i].roleName
          })
        }
        return roleData
      }
    },
  },
});