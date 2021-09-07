<template>
	<ChartSelector class="left" @add-chart="handleChartAdd" />
	<div class="center">
		<draggable
			:list="componentList"
			:disabled="!enabled"
			item-key="id"
			class="list-group"
			ghost-class="ghost"
			:move="checkMove"
			@start="dragging = true"
			@end="dragging = false"
		>
			<template #item="{ element }">
				<Chart
					:chart-id="element.name + element.id"
					:option="element.option"
					@click="handleChartSelect(element)"
				></Chart>
			</template>
		</draggable>
	</div>
	<ChartSettings
		class="right"
		:option="chartOption"
		@change-option="handleOptionChange"
	/>
</template>

<script>
import { ref } from "vue";
import draggable from "vuedraggable";
import Chart from "./components/Chart.vue";
import ChartSelector from "@/components/ChartSelector.vue";
import ChartSettings from "@/components/ChartSettings.vue";

export default {
	name: "App",
	display: "Simple",
	order: 0,
	components: { ChartSelector, ChartSettings, Chart, draggable },
	setup() {
		const enabled = ref(true);
		const dragging = ref(false);
		const id = ref(1);
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
				id: 0,
			},
			{
				name: "pie",
				option: options.pie,
				id: 1,
			},
		]);
		const addComponent = (v) => {
			console.log(v);
			componentList.value.push({
				name: v,
				option: options[v],
				id: ++id.value, //id是最后一项的id+1
			});
			console.log(componentList);
		};
		const chartOption = ref({});
		return { enabled, dragging, componentList, chartOption, addComponent };
	},
	methods: {
		handleChartAdd(v) {
			this.addComponent(v);
		},
		checkMove: function(e) {
			window.console.log("Future index: " + e.draggedContext.futureIndex);
		},
		handleChartSelect(e) {
			console.log("select", e.option, this.chartOption);
			this.chartOption.value = e.option;
			this.chartOption.value.id = e.id;
		},
		handleOptionChange(e) {
			console.log("e", JSON.parse(e));
			const el = JSON.parse(e);
			let index;
			for (let i in this.componentList) {
				if (this.componentList[i].id == el.id) index = i;
			}
			this.componentList[index].option = el;
			console.log(this.componentList[index]);
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
  background: lightgrey;
}

.center {
	border-left: 1px solid black;
	border-right: 1px solid black;
	flex: 1;
	padding: 0 50px;
	overflow-y: auto;
}

.list-group {
	display: flex;
	flex-wrap: wrap;
}

.list-group > div {
	width: 400px;
	height: 400px;
}

.right label {
	display: block;
	text-align: left;
	padding-left: 30px;
}

.right input {
	width: 90%;
}

</style>
