<template>
    <div class="zrx-tip">
        <!-- <div ref="containerRef" :class="['container', `placement-${ placement }`]" :style="`backdrop-filter: blur(${ filterBlur }px);`"> -->
        <div :class="['container', `placement-${ placement }`]" :style="`backdrop-filter: blur(${ filterBlur }px);`" :id="`zrx-chart-${ randomId }`" ref="chartRef">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
// 容器 dom 对象
const chartRef = ref();
const randomId = new Array(4).fill().map(() => Math.round(0xffff * Math.random()).toString(16).padStart(4, 4)).join('-');
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
    },
    /**
     * @description 模糊程度
     * @example 6
     */
    filterBlur: {
        type: [Number],
        default: () => 6
    },
    /**
     * @description 线条的宽度
     * @example 1
     */
    borderWidth: {
        type: [Number],
        default: () => 1
    },
    /**
     * @description 线条的颜色
     * @example rgba(255, 0, 0, 0.5)
     */
    borderColor: {
        type: [String],
        default: () => 'rgba(255, 255, 255, 0.05)'
    }
});
// 观察者对象
let observer = null;
// 绘制 mask 要用到的背景
const computeMaskBg = async (borderBackground) => {
    const container = document.getElementById(`zrx-chart-${ randomId }`) || chartRef.value;
    container.style.padding = 0;
    const padding = `padding${ ({ top: 'Bottom', bottom: 'Top', left: 'Right', right: 'Left' })[props.placement] }`;
    container.style[padding] = `${ props.tipHeight }px`;
    await Promise.resolve();
    const canvas = document.createElement('canvas');
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;
    await Promise.resolve();
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    switch (props.placement) {
        case 'top':
            ctx.moveTo(canvas.width / 2, canvas.height - 0);
            ctx.lineTo(canvas.width / 2 - props.tipWidth / 2, canvas.height - props.tipHeight - 0);
            ctx.arc(props.borderRadius + 0, canvas.height - props.tipHeight - props.borderRadius - 0, props.borderRadius, 90 / 180 * Math.PI, 180 / 180 * Math.PI);
            ctx.arc(props.borderRadius + 0, props.borderRadius + 0, props.borderRadius, 180 / 180 * Math.PI, 270 / 180 * Math.PI);
            ctx.arc(canvas.width - props.borderRadius - 0, props.borderRadius + 0, props.borderRadius, 270 / 180 * Math.PI, 360 / 180 * Math.PI);
            ctx.arc(canvas.width - props.borderRadius - 0, canvas.height - props.tipHeight - props.borderRadius - 0, props.borderRadius, 0 / 180 * Math.PI, 90 / 180 * Math.PI);
            ctx.lineTo(canvas.width / 2 + props.tipWidth / 2, canvas.height - props.tipHeight - 0);
            break;
        case 'bottom':
            ctx.moveTo(canvas.width / 2, 0);
            ctx.lineTo(canvas.width / 2 + props.tipWidth / 2, props.tipHeight + 0);
            ctx.arc(canvas.width - props.borderRadius - 0, props.tipHeight + props.borderRadius + 0, props.borderRadius, 270 / 180 * Math.PI, 360 / 180 * Math.PI);
            ctx.arc(canvas.width - props.borderRadius - 0, canvas.height - props.borderRadius - 0, props.borderRadius, 0 * Math.PI, 90 / 180 * Math.PI);
            ctx.arc(props.borderRadius + 0, canvas.height - props.borderRadius - 0, props.borderRadius, 90 / 180 * Math.PI, 180 / 180 * Math.PI);
            ctx.arc(props.borderRadius + 0, props.tipHeight + props.borderRadius + 0, props.borderRadius, 180 / 180 * Math.PI, 270 / 180 * Math.PI);
            ctx.lineTo(canvas.width / 2 - props.tipWidth / 2, props.tipHeight + 0);
            break;
        case 'right':
            ctx.moveTo(0, canvas.height / 2);
            ctx.lineTo(props.tipHeight + 0, canvas.height / 2 - props.tipWidth / 2);
            ctx.arc(props.tipHeight + props.borderRadius + 0, props.borderRadius + 0, props.borderRadius, 180 / 180 * Math.PI, 270 / 180 * Math.PI);
            ctx.arc(canvas.width - props.borderRadius - 0, props.borderRadius + 0, props.borderRadius, 270 / 180 * Math.PI, 360 / 180 * Math.PI);
            ctx.arc(canvas.width - props.borderRadius - 0, canvas.height - props.borderRadius - 0, props.borderRadius, 0 / 180 * Math.PI, 90 / 180 * Math.PI);
            ctx.arc(props.tipHeight + props.borderRadius + 0, canvas.height - props.borderRadius - 0, props.borderRadius, 90 / 180 * Math.PI, 180 / 180 * Math.PI);
            ctx.lineTo(props.tipHeight + 0, canvas.height / 2 + props.tipWidth / 2);
            break;
        case 'left':
            ctx.moveTo(canvas.width - 0, canvas.height / 2);
            ctx.lineTo(canvas.width - props.tipHeight - 0, canvas.height / 2 + props.tipWidth / 2);
            ctx.arc(canvas.width - props.tipHeight - props.borderRadius - 0, canvas.height - props.borderRadius - 0, props.borderRadius, 0 / 180 * Math.PI, 90 / 180 * Math.PI);
            ctx.arc(props.borderRadius + 0, canvas.height - props.borderRadius - 0, props.borderRadius, 90 / 180 * Math.PI, 180 / 180 * Math.PI);
            ctx.arc(props.borderRadius + 0, props.borderRadius + 0, props.borderRadius, 180 / 180 * Math.PI, 270 / 180 * Math.PI);
            ctx.arc(canvas.width - props.tipHeight - props.borderRadius - 0, props.borderRadius + 0, props.borderRadius, 270 / 180 * Math.PI, 360 / 180 * Math.PI);
            ctx.lineTo(canvas.width - props.tipHeight - 0, canvas.height / 2 - props.tipWidth / 2);
            break;
    }
    ctx.closePath();
    if (borderBackground === 'background') {
        ctx.fillStyle = 'white';
        ctx.fill();
    }
    if (borderBackground === 'border') {
        ctx.strokeStyle = props.borderColor;
        ctx.lineWidth = props.borderWidth * 2;
        ctx.stroke();
    }
    // return canvas.toDataURL();
    return new Promise(resolve => canvas.toBlob(blob => resolve(window.URL.createObjectURL(blob))));
};
// 监听内容位置变化
watch(() => props.placement, computeMaskBg);

onMounted(() => {
    const container = document.getElementById(`zrx-chart-${ randomId }`) || chartRef.value;
    observer = new ResizeObserver(async mutations => {
        const [background, border] = await Promise.all([
            computeMaskBg('background'),
            computeMaskBg('border')
        ]);
        container.style.mask = `url(${ background })`;
        container.style.backgroundImage = `url(${ border })`;
    });
    observer.observe(container);
});

onBeforeUnmount(() => {
    const container = document.getElementById(`zrx-chart-${ randomId }`) || chartRef.value;
    observer?.disconnect(container);
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
