<template>
	<div>
		<slot></slot>
		<div
			:id="chartId"
			class="list-group-item"
			:class="dragClass"
			v-if="chartId"
		></div>
	</div>
</template>

<script>
import { computed, watchEffect } from "vue";
import * as echarts from "echarts";
import interact from "interactjs";

const position = { x: 0, y: 0 };
interact(".draggable").draggable({
	listeners: {
		// start(event) {
		// 	console.log(event.type, event.target);
		// },
		move(event) {
			position.x += event.dx;
			position.y += event.dy;

			event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
		},
	},
});

export default {
	name: "Chart",
	props: ["chartId", "option", "dragClass"],
	setup(props) {
		let myChart;
		let option;
		// console.log(props.id)
		const createChart = () => {
			if (props.chartId) {
				const chartDom = document.getElementById(props.chartId);
				myChart = echarts.init(chartDom);
				option = computed(() => props.option);
				option.value && myChart.setOption(option.value);
				watchEffect(
					() => {
						myChart.setOption(option.value);
					},
					{
						flush: "post",
					}
				);
			}
		};
		return { createChart };
	},
  mounted() {
    this.createChart()
  },
};
</script>

<style scoped>
.list-group-item {
	margin: 0.1rem 0 0 0.1rem;
	border-radius: 0.75em;
	padding: 4%;
	touch-action: none;
	user-select: none;
	overflow: hidden;
}
</style>
