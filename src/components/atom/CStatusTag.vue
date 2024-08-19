<template>
    <div class="c-status-tag">
        <alert-filled :style="iconStyle" />
        &nbsp;
        <span>{{ props.label }}</span>
    </div>
</template>
<script lang="ts" setup>
import { AlertFilled } from '@ant-design/icons-vue';

import { theme } from 'ant-design-vue';
const { useToken } = theme;
const { token } = useToken();
const props = defineProps({
    type: { type: String, default: 'default' },
    label: { String, default: '' },
    enabled: { Boolean, default: false }
});

let iconStyle = computed(() => {
    if (props.enabled) {
        switch (props.type) {
            case "success":
                return "color: " + token.value.colorSuccess
            case "warning":
                return "color: " + token.value.colorWarning
            case "error":
                return "color: " + token.value.colorError
        }
    }
    return "color: " + token.value.colorBorder
})
</script>

<style scoped>
.c-status-tag {
    /* 根据需要添加 */
}

.c-status-tag>.ell {
    width: auto;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>