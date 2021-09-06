<template>
	<div :id="chartId"></div>
</template>

<script>
import * as echarts from "echarts";

export default {
	name: "Histogram",
	props: ["chartId"],
	setup(props) {
		// console.log(props.id)
		const createHistogram = () => {
			var chartDom = document.getElementById(props.chartId);
			var myChart = echarts.init(chartDom);
			var option;

			option = {
				xAxis: {
					type: "category",
					data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				},
				yAxis: {
					type: "value",
				},
				series: [
					{
						data: [120, 200, 150, 80, 70, 110, 130],
						type: "bar",
						showBackground: true,
						backgroundStyle: {
							color: "rgba(180, 180, 180, 0.2)",
						},
					},
				],
			};

			option && myChart.setOption(option);
		};
		return { createHistogram };
	},
	mounted() {
		this.createHistogram();
	},
};
</script>

<style scoped></style>
