## 1.基础用法(画像app)
<demo03a621d046f1 />
```vue{4}
<template>
    <gradient-ring-chart-2 :value="v" subTitle="风险指数" valueUnit="%"></gradient-ring-chart-2>
</template>
<script setup>;
import { ref } from 'vue';

const v = ref(50);

</script>
<style lang="scss" scoped>
.zrx-chart {
    background-color: white;
    padding: 32px;
    &:after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 140px;
        height: 140px;
        border-radius: 50%;
        border: 14px solid rgb(238, 240, 245);
        mask-image: linear-gradient(180deg, red, transparent);
    }
}
</style>
```
## 属性
<demo5c2a70bcc660 />
<script setup>
import demo03a621d046f1 from '../../document/gradientRingChart2/1.基础用法(画像app).vue'
import demo5c2a70bcc660 from '../../document/gradientRingChart2/属性.vue'
</script>