<template>
   <c-realtime-data />
</template>

<script setup lang="ts">
import { ref } from 'vue'; 
import { useGlobalConfigStore } from "~/store/global";
import CRealtimeData from '~/components/dashboard/CRealtimeData.vue';
const globalConfig = useGlobalConfigStore()
globalConfig.setPageTitle("pageTitle.dashboard");

</script>
