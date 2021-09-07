<template>
	<div :id="chartId"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
	name: "Chart",
	props: ["chartId", "option"],
	setup(props) {
		// console.log(props.id)
		const createChart = () => {
			var chartDom = document.getElementById(props.chartId);
			var myChart = echarts.init(chartDom);
			var option;

			option = props.option;

			option && myChart.setOption(option);
		};
		return { createChart };
	},
	mounted() {
		this.createChart();
	},
};
</script>

<style scoped></style>
