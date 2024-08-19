<template>
  <a-row :gutter="16">
    <a-col :span="6">
      <a-card>
        <a-statistic
            title="Feedback"
            :value="11.28"
            :precision="2"
            suffix="%"
            :value-style="{ color: '#3f8600' }"
            style="margin-right: 50px"
        >
          <template #prefix>
            <arrow-up-outlined />
          </template>
        </a-statistic>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card>
        <a-statistic
            title="Idle"
            :value="9.3"
            :precision="2"
            suffix="%"
            class="demo-class"
            :value-style="{ color: '#cf1322' }"
        >
          <template #prefix>
            <arrow-down-outlined />
          </template>
        </a-statistic>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card>
        <a-statistic
            title="Idle"
            :value="9.3"
            :precision="2"
            suffix="%"
            class="demo-class"
            :value-style="{ color: '#cf1322' }"
        >
          <template #prefix>
            <arrow-down-outlined />
          </template>
        </a-statistic>
      </a-card>
    </a-col>
    <a-col :span="6">
      <a-card>
        <a-statistic
            title="Idle"
            :value="9.3"
            :precision="2"
            suffix="%"
            class="demo-class"
            :value-style="{ color: '#cf1322' }"
        >
          <template #prefix>
            <arrow-down-outlined />
          </template>
        </a-statistic>
      </a-card>
    </a-col>
    <a-col :span="24" style="margin-top: 20px">
      <a-card>
        <div id="main" style="width:100%;height: 500px;"></div>
      </a-card>
    </a-col>
    <a-col :span="24" style="margin-top: 20px">
      <a-card>
        <c-calendar
            v-model:value="carlendarValue"
            :show-holiday="true"
            :auto-year-to-month-mode="true"
        >
          <template #dateCellRender="{ current }">
            <ul class="events" v-for="item in calendarDatas" :key="item.id">
              <a-badge
                  v-if="current.toISOString().substring(0, 10) == item.modelTime"
                  :status="item.className.slice(3)"
                  :text="item.title"
              />
            </ul>
          </template>
        </c-calendar>
      </a-card>
    </a-col>
  </a-row>
</template>
<script lang="ts" setup>
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons-vue';
import * as echarts from 'echarts';
import dayjs from "dayjs";
import CCalendar from "~/components/atom/CCalendar.vue";

const carlendarValue = ref<dayjs.Dayjs>();
const calendarDatas = ref<any>(null);


onMounted(() => {
  initEchart()
})

const initEchart = () => {
  let chartDom = document.getElementById('main');
  let myChart = echarts.init(chartDom);
  let option;

  option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true
      }
    ]
  };
  option && myChart.setOption(option);
}



</script>

<style scoped>

</style>