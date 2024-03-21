<template>
    <div class="zrx-chart">
        <div class="center">
            <div class="value" v-if="showValue">
                <span class="num">{{ currentValue.toFixed(valueFixBit) }}</span>
                <i class="unit">{{ valueUnit }}</i>
            </div>
            <h4 class="sub-title" v-if="subTitle">{{ subTitle }}</h4>
        </div>
        <canvas ref="canvasRef" :width="radius * 2" :height="radius * 2"></canvas>
    </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
// canvas 元素
const canvasRef = ref();
// 可配置属性
const props = defineProps({
    /**
     * @description 半径
     * @example 130
     */
    radius: {
        type: [Number],
        default: () => 120
    },
    /**
     * @description 进度条宽度
     * @example 26
     */
    barWidth: {
        type: [Number],
        default: () => 25
    },
    /**
     * @description 圆环底色
     * @example '#13374f'
     */
    layerColor: {
        type: [String],
        default: () => '#13374f'
    },
    /**
     * @description 起始角度
     * @example 180
     */
    startAngle: {
        type: [Number],
        default: () => 140
    },
    /**
     * @description 角度范围
     * @example 200
     */
    angleRange: {
        type: [Number],
        default: () => 260
    },
    /**
     * @description 数值
     * @example 66
     */
    value: {
        type: [Number],
        default: () => 0
    },
    /**
     * @description 最大值
     * @example 100
     */
    max: {
        type: [Number],
        default: () => 100
    },
    /**
     * @description 最小值
     * @example 100
     */
    min: {
        type: [Number],
        default: () => 0
    },
    /**
     * @description 起始颜色
     * @example 'red'
     */
    startColor: {
        type: [String],
        default: () => '#0e8fff'
    },
    /**
     * @description 终止颜色
     * @example 'green'
     */
    endColor: {
        type: [String],
        default: () => '#30d5eb'
    },
    /**
     * @description 是否显示中心数字
     * @example false
     */
    showValue: {
        type: [Boolean],
        default: () => true
    },
    /**
     * @description 中心数字的位数
     * @example 0
     */
    valueFixBit: {
        type: [Boolean],
        default: () => 1
    },
    /**
     * @description 中心数值单位
     * @example '%'
     */
    valueUnit: {
        type: [String],
        default: () => ''
    },
    /**
     * @description 副标题
     * @example '风险指数'
     */
    subTitle: {
        type: [String],
        default: () => ''
    }
});
const currentValue = ref(props.min);
// canvas 上下文
let ctx;
// 动画
let animation;
// 绘制函数
const draw = () => {
    const radius = props.radius - props.barWidth / 2;
    const capAngle = Math.atan(props.barWidth / 2 / radius) * 2;
    let value = props.value < props.min ? props.min : (props.value > props.max ? props.max : props.value);
    if (value < currentValue.value) {
        currentValue.value = currentValue.value - (currentValue.value - value) * 0.1;
        value = currentValue.value;
    } else if (value > currentValue.value) {
        currentValue.value = currentValue.value + (value - currentValue.value) * 0.1;
        value = currentValue.value;
    }
    let startAngle = props.startAngle / 180 * Math.PI;
    let endAngle = (props.startAngle + value / (props.max - props.min) * props.angleRange) / 180 * Math.PI;
    const gradient = ctx.createConicGradient(startAngle, canvasRef.value.width / 2, canvasRef.value.height / 2);
    gradient.addColorStop(0, props.startColor);
    gradient.addColorStop(props.angleRange / 360, props.endColor);
    let angle = startAngle + capAngle / 2;
    let x = Math.cos(angle) * radius + canvasRef.value.width / 2;
    let y = Math.sin(angle) * radius + canvasRef.value.height / 2;
    // 绘制底色
    ctx.beginPath();
    ctx.arc(x, y, props.barWidth / 2, angle - Math.PI, angle);
    ctx.arc(canvasRef.value.width / 2, canvasRef.value.height / 2, props.radius, startAngle + capAngle / 2, (props.startAngle + props.angleRange) / 180 * Math.PI - capAngle / 2);
    x = Math.cos((props.startAngle + props.angleRange) / 180 * Math.PI - capAngle / 2) * radius + canvasRef.value.width / 2;
    y = Math.sin((props.startAngle + props.angleRange) / 180 * Math.PI - capAngle / 2) * radius + canvasRef.value.height / 2;
    ctx.arc(x, y, props.barWidth / 2, (startAngle + props.angleRange / 180 * Math.PI + capAngle / 2), (startAngle + props.angleRange / 180 * Math.PI + capAngle / 2) + Math.PI);
    ctx.arc(canvasRef.value.width / 2, canvasRef.value.height / 2, props.radius - props.barWidth, (props.startAngle + props.angleRange) / 180 * Math.PI - capAngle / 2, startAngle + capAngle / 2, true);
    ctx.fillStyle = props.layerColor;
    ctx.closePath();
    ctx.fill();
    x = Math.cos(angle) * radius + canvasRef.value.width / 2;
    y = Math.sin(angle) * radius + canvasRef.value.height / 2;
    // 如果小于最小的角度，则只绘制起始位置的一个点
    if (Math.abs(startAngle - endAngle) < capAngle) {
        ctx.beginPath();
        ctx.arc(x, y, props.barWidth / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
    } else {
        ctx.beginPath();
        ctx.arc(x, y, props.barWidth / 2, angle - Math.PI, angle);
        ctx.arc(canvasRef.value.width / 2, canvasRef.value.height / 2, props.radius, startAngle + capAngle / 2, endAngle - capAngle / 2);
        angle = endAngle - capAngle / 2;
        x = Math.cos(angle) * radius + canvasRef.value.width / 2;
        y = Math.sin(angle) * radius + canvasRef.value.height / 2;
        ctx.arc(x, y, props.barWidth / 2, angle, angle - Math.PI);
        ctx.arc(canvasRef.value.width / 2, canvasRef.value.height / 2, props.radius - props.barWidth, endAngle - capAngle / 2, startAngle + capAngle / 2, true);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();
    }
};

const setAnimation = () => {
    animation = window.requestAnimationFrame(setAnimation);
    ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
    draw();
};

onMounted(() => {
    ctx = canvasRef.value.getContext('2d');
    setAnimation();
});

onUnmounted(() => {
    window.cancelAnimationFrame(animation);
    animation = null;
});
</script>
<style lang="scss" scoped>
.zrx-chart {
    position: relative;
    display: inline-block;
    .center {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .value {
            .num {
                background-image: linear-gradient(180deg, #ffffff, rgba(white, 0));
                -webkit-background-clip: text;
                background-clip: text;
                font-size: 32px;
                color: transparent;
                font-weight: 900;
                font-style: italic;
                text-align-last: justify;
            }
            .unit {
                color: white;
                font-style: normal;
            }
        }
        .sub-title {
            color: white;
            margin-top: 4px;
            font-style: normal;
            text-align: center;
            white-space: nowrap;
        }
    }
}
</style>