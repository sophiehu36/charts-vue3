<template>
	<div :id="chartId"></div>
</template>

<script>
import { computed, watchEffect } from "vue";
import * as echarts from "echarts";

export default {
	name: "Chart",
	props: ["chartId", "option"],
	setup(props) {
		// console.log(props.id)
		const createChart = () => {
			const chartDom = document.getElementById(props.chartId);
			const myChart = echarts.init(chartDom);
			const option = computed(() => props.option);
			option.value && myChart.setOption(option.value);
		};
		watchEffect(
			() => {
				createChart();
			},
			{
				flush: "post",
			}
		);
		return { createChart };
	},
	mounted() {
		this.createChart();
	},
};
</script>

<style scoped></style>
