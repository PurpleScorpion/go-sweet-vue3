
<template>
    <a-calendar ref="selfRef" class="c-calender" v-bind="$attrs" :mode="panelMode" @panelChange="onPanelChanged"
        @select="onSelected">
        <template #dateFullCellRender="{ current }">
            
            <div class="ant-picker-cell-inner ant-picker-calendar-date" :style="getDateStyle(current)">
                <div class="ant-picker-calendar-date-value"><span class="holiday-name">{{ current.holiday }}</span>{{
                    current.date() }}</div>
                <div class="ant-picker-calendar-date-content">
                    <slot name="dateCellRender" :current="current"></slot>
                </div>
            </div>
        </template>
        <template #monthCellRender="{ current }">
            <slot name="monthCellRender" :current="current"></slot>
        </template>
    </a-calendar>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import dayjs from "dayjs";
import { theme } from 'ant-design-vue';
import { useGlobalConfigStore } from "~/store/global";
import { holidayMenuStore } from "~/store/holiday/holiday";
const {
  getHoliday,
} = holidayMenuStore();

const { holidayList } = storeToRefs(
    holidayMenuStore()
);

const props = defineProps({
    autoYearToMonthMode: Boolean,
    showHoliday: Boolean,
});
const selfRef = ref()

const panelMode = ref('month')
const globalConfig = useGlobalConfigStore()
const { useToken } = theme;
const { token } = useToken();

const emit = defineEmits(["panelChange", "select"])

const onPanelChanged = (date: dayjs.Dayjs, mode: string) => {
    if (mode === 'month') {
        
        getHoliday(date.startOf('month').format("YYYY-MM-DD"))
        
    } else {
        // holidays = []
    }
    panelMode.value = mode;
    selfRef.value.$forceUpdate();
    emit('panelChange', date, mode)
}

const onSelected = (date: dayjs.Dayjs, info: { source: 'year' | 'month' | 'date' | 'customize' }) => {
    if (props.autoYearToMonthMode && info.source === 'month') {
        panelMode.value = 'month';
        selfRef.value.$forceUpdate();
    }
    emit('select', date, info)
}

type CustomDayjs = {
    [K in keyof dayjs.Dayjs]: dayjs.Dayjs[K];
} & {
    holiday: string;
}


// 日期样式设置
const getDateStyle = (val: CustomDayjs) => {
    if (panelMode.value !== 'month') {
        return;
    }
    const day = val.day();
    let isHoliday = false;
    val.holiday = '';

    if (props.showHoliday) {
        if (holidayList && holidayList.value.length > 0) {
            for (var j = 0; j < holidayList.value.length; j++) {
                if (val.format("YYYY-MM-DD") == holidayList.value[j].date) {
                    isHoliday = true
                    val.holiday = holidayList.value[j].name
                    break;
                }
            }
        }
    }
    // 如果是周六周日
    if (isHoliday) {
        // 默认light，透明度0x80
        let bgColor = token.value.colorErrorBorder + "80";
        let fontColor = 'red';
        if (globalConfig.darkMode) {
            bgColor = token.value['volcano-1'] + "FF";
            fontColor = token.value['volcano-7'];
        }
        return "background-color:" + bgColor + ";height:100%;color:red;font-weight: bold;color:" + fontColor;
    }
};

</script>
<style >
.c-calender .ant-picker-cell {
    padding: 1px 0 !important;
}

.c-calender .ant-picker-calendar-date-value {
    font-size: 1.3vw;
}

.c-calender .ant-picker-calendar-date-value>.holiday-name {
    font-size: 0.7vw;
    margin-right: 5px;
}
.ant-badge-status-text{
    font-size: 16px !important;
}
.ant-badge-status-success{
    width: 12px !important;
    height: 12px !important;
}
.ant-picker-calendar-date-value {
  padding-top: 10px !important;
}
</style>