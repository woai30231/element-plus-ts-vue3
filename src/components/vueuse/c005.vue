<template>
    <div>
        <UseBattery v-slot="{charging,level,chargingTime}">
            Is Charging: {{charging}}<br />
            设备充满电之前的秒数: {{chargingTime}}<br />
            设备当前电量：{{level}}
        </UseBattery>
    </div>
</template>
<script setup lang="ts">
// import { useBattery } from '@vueuse/core';
import { UseBattery } from '@vueuse/components';
// const {charging} = useBattery()
</script>