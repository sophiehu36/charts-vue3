<template>
	<ChartSelector class="left" @add-chart="handleChartAdd"></ChartSelector>
	<div class="center">
		<Chart
			v-for="item in componentList"
			:chart-id="item.name + item.id"
			:key="item.id"
			:option="item.option"
		></Chart>
	</div>
	<div class="right">right</div>
</template>

<script>
import { ref } from "vue";
import ChartSelector from "@/components/ChartSelector.vue";
import Chart from "./components/Chart.vue";

export default {
	name: "App",
	components: { ChartSelector, Chart },
	setup() {
		const options = {
			histogram: {
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
			},
			pie: {
				title: {
					text: "某站点用户访问来源",
					subtext: "纯属虚构",
					left: "center",
				},
				tooltip: {
					trigger: "item",
				},
				legend: {
					orient: "vertical",
					left: "left",
				},
				series: [
					{
						name: "访问来源",
						type: "pie",
						radius: "50%",
						data: [
							{ value: 1048, name: "搜索引擎" },
							{ value: 735, name: "直接访问" },
							{ value: 580, name: "邮件营销" },
							{ value: 484, name: "联盟广告" },
							{ value: 300, name: "视频广告" },
						],
						emphasis: {
							itemStyle: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: "rgba(0, 0, 0, 0.5)",
							},
						},
					},
				],
			},
			line: {
				xAxis: {
					type: "category",
					data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
				},
				yAxis: {
					type: "value",
				},
				series: [
					{
						data: [150, 230, 224, 218, 135, 147, 260],
						type: "line",
					},
				],
			},
		};
		const componentList = ref([
			{
				name: "histogram",
				option: options.histogram,
				id: "0",
			},
			{
				name: "pie",
				option: options.pie,
				id: "1",
			},
		]);
		const addComponent = (v) => {
			console.log(v);
			componentList.value.push({
				name: v,
				option: options[v],
				id: componentList.value.length,
			});
			console.log(componentList);
		};
		return { componentList, addComponent };
	},
	methods: {
		handleChartAdd(v) {
			this.addComponent(v);
		},
	},
};
</script>

<style>
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	display: flex;
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
}

#app > div {
	box-sizing: border-box;
	width: 20%;
	height: 100%;
}

.left {
	padding: 60px;
}

.center {
	border-left: 1px solid black;
	border-right: 1px solid black;
	flex: 1;
	padding: 0 60px;
	overflow-y: auto;
	display: flex;
	flex-wrap: wrap;
}

.center > div {
	width: 400px;
	height: 400px;
}
</style>
