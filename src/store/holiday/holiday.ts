import { defineStore } from 'pinia';
import { statusCode } from '~/store/status-code'

export const holidayMenuStore = defineStore('holidayMenu', {
    state: () => ({
        id: 0,
        dialogType: 'Insert',
        dialogVisible: false,
        pageSize: 10,
        current: 1,
        totalCount: 0,
        pageData: ref<any>([]),
        holidayList: ref<any>([]),
    }),

    actions: {
        async getPageData() {
            const parma = {
                current: this.current,
                pageSize: this.pageSize,
            }
            const { data } : any = await useFetch('/holiday/pageData', {
                method: 'post',
                body: parma,
                watch: false
            });
            this.pageData = []
            if (data.value && data.value.code == 200 && data.value.data) {
                for (let i = 0; i < data.value.data.length; i++) {
                    this.pageData.push(data.value.data[i]);
                }
            }
        },
        async getHoliday(year: any) {

        },
    },
});