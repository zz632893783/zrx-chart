<template>
    <div class="zrx-tip">
        <div ref="containerRef" :class="['container', `placement-${ placement }`]">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
// 容器 dom 对象
const containerRef = ref();
// 可支持配置属性
const props = defineProps({
    /**
     * @description 内容部分的位置，可选值 'top', 'right', 'bottom', 'left'
     * @example 'left'
     */
    placement: {
        type: [String],
        default: () => 'top'
    },
    /**
     * @description 凸起部分的宽度
     * @example 12
     */
    tipWidth: {
        type: [Number],
        default: () => 14
    },
    /**
     * @description 凸起部分的高度
     * @example 12
     */
    tipHeight: {
        type: [Number],
        default: () => 10
    },
    /**
     * @description 容器圆角
     * @example 12
     */
    borderRadius: {
        type: [Number],
        default: () => 10
    }
});
// 观察者对象
let observer = null;
// 绘制 mask 要用到的背景
const computeMaskBg = async () => {
    containerRef.value.style.padding = 0;
    const padding = `padding${ ({ top: 'Bottom', bottom: 'Top', left: 'Right', right: 'Left' })[props.placement] }`;
    containerRef.value.style[padding] = `${ props.tipHeight }px`;
    await Promise.resolve();
    const canvas = document.createElement('canvas');
    canvas.width = containerRef.value.offsetWidth;
    canvas.height = containerRef.value.offsetHeight;
    await Promise.resolve();
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    switch (props.placement) {
        case 'top':
            ctx.moveTo(canvas.width / 2, canvas.height);
            ctx.lineTo(canvas.width / 2 - props.tipWidth / 2, canvas.height - props.tipHeight);
            ctx.arc(props.borderRadius, canvas.height - props.tipHeight - props.borderRadius, props.borderRadius, 90 / 180 * Math.PI, 180 / 180 * Math.PI);
            ctx.arc(props.borderRadius, props.borderRadius, props.borderRadius, 180 / 180 * Math.PI, 270 / 180 * Math.PI);
            ctx.arc(canvas.width - props.borderRadius, props.borderRadius, props.borderRadius, 270 / 180 * Math.PI, 360 / 180 * Math.PI);
            ctx.arc(canvas.width - props.borderRadius, canvas.height - props.tipHeight - props.borderRadius, props.borderRadius, 0 / 180 * Math.PI, 90 / 180 * Math.PI);
            ctx.lineTo(canvas.width / 2 + props.tipWidth / 2, canvas.height - props.tipHeight);
            break;
        case 'bottom':
            ctx.moveTo(canvas.width / 2, 0);
            ctx.lineTo(canvas.width / 2 + props.tipWidth / 2, props.tipHeight);
            ctx.arc(canvas.width - props.borderRadius, props.tipHeight + props.borderRadius, props.borderRadius, 270 / 180 * Math.PI, 360 / 180 * Math.PI);
            ctx.arc(canvas.width - props.borderRadius, canvas.height - props.borderRadius, props.borderRadius, 0 * Math.PI, 90 / 180 * Math.PI);
            ctx.arc(props.borderRadius, canvas.height - props.borderRadius, props.borderRadius, 90 / 180 * Math.PI, 180 / 180 * Math.PI);
            ctx.arc(props.borderRadius, props.tipHeight + props.borderRadius, props.borderRadius, 180 / 180 * Math.PI, 270 / 180 * Math.PI);
            ctx.lineTo(canvas.width / 2 - props.tipWidth / 2, props.tipHeight);
            break;
        case 'right':
            ctx.moveTo(0, canvas.height / 2);
            ctx.lineTo(props.tipHeight, canvas.height / 2 - props.tipWidth / 2);
            ctx.arc(props.tipHeight + props.borderRadius, props.borderRadius, props.borderRadius, 180 / 180 * Math.PI, 270 / 180 * Math.PI);
            ctx.arc(canvas.width - props.borderRadius, props.borderRadius, props.borderRadius, 270 / 180 * Math.PI, 360 / 180 * Math.PI);
            ctx.arc(canvas.width - props.borderRadius, canvas.height - props.borderRadius, props.borderRadius, 0 / 180 * Math.PI, 90 / 180 * Math.PI);
            ctx.arc(props.tipHeight + props.borderRadius, canvas.height - props.borderRadius, props.borderRadius, 90 / 180 * Math.PI, 180 / 180 * Math.PI);
            ctx.lineTo(props.tipHeight, canvas.height / 2 + props.tipWidth / 2);
            break;
        case 'left':
            ctx.moveTo(canvas.width, canvas.height / 2);
            ctx.lineTo(canvas.width - props.tipHeight, canvas.height / 2 + props.tipWidth / 2);
            ctx.arc(canvas.width - props.tipHeight - props.borderRadius, canvas.height - props.borderRadius, props.borderRadius, 0 / 180 * Math.PI, 90 / 180 * Math.PI);
            ctx.arc(props.borderRadius, canvas.height - props.borderRadius, props.borderRadius, 90 / 180 * Math.PI, 180 / 180 * Math.PI);
            ctx.arc(props.borderRadius, props.borderRadius, props.borderRadius, 180 / 180 * Math.PI, 270 / 180 * Math.PI);
            ctx.arc(canvas.width - props.tipHeight - props.borderRadius, props.borderRadius, props.borderRadius, 270 / 180 * Math.PI, 360 / 180 * Math.PI);
            ctx.lineTo(canvas.width - props.tipHeight, canvas.height / 2 - props.tipWidth / 2);
            break;
    }
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();
    const base64 = canvas.toDataURL();
    containerRef.value.style.mask = `url(${ base64 })`;
};
// 监听内容位置变化
watch(() => props.placement, computeMaskBg);

onMounted(() => {
    computeMaskBg();
    observer = new ResizeObserver(mutations => computeMaskBg());
    observer.observe(containerRef.value);
});

onBeforeUnmount(() => {
    observer?.disconnect(containerRef.value);
    observer = null;
});
</script>
<style lang="scss" scoped>
.zrx-tip {
    width: 0;
    height: 0;
    position: relative;
    .container {
        background-color: rgba(white, 0.05);
        backdrop-filter: blur(6px);
    }
    .placement-top {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translate(-50%, 0);
    }
    .placement-right {
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate(0, -50%);
    }
    .placement-bottom {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translate(-50%, 0);
    }
    .placement-left {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);
    }
}
</style>
