<template>
	<div class="left">
		<draggable
			class="dragArea list-group selection"
			:list="selection"
			:group="{ name: 'chart', pull: 'clone', put: false }"
			@change="log"
			@end="handleEnd"
			@mousemove="handleDragOver"
			:clone="cloneChart"
			:move="onMove"
			item-key="id"
		>
			<template #item="{ element }">
				<Chart :chart-id="element.id" :option="element.option"
					><p>{{ element.name }}</p></Chart
				>
			</template>
		</draggable>
	</div>
	<div class="center">
		<template v-for="(value, name) in lists" :key="name">
			<draggable
				class="dragArea list-group"
				:list="value"
				group="chart"
				@change="log"
				@end="handleEnd"
				@mousemove="handleDragOver"
				item-key="id"
			>
				<template #item="{ element }">
					<Chart
						:chart-id="element.id"
						:option="element.option"
						@click="handleChartSelect(element, name)"
					/>
				</template>
			</draggable>
		</template>
	</div>
	<ChartSettings
		class="right"
		:option="chartOption"
		:info="chartInfo"
		@change-option="handleOptionChange"
	/>
</template>

<script>
import { ref } from "vue";
import draggable from "vuedraggable";
import Chart from "./components/Chart.vue";
import ChartSettings from "@/components/ChartSettings.vue";
let idGlobal = 4;

export default {
	name: "App",
	lists: "Custom Clone",
	order: 2,
	components: { draggable, Chart, ChartSettings },
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
		const selection = [
			{ name: "histogram", id: 1, option: options.histogram },
			{ name: "pie", id: 2, option: options.pie },
			{ name: "line", id: 3, option: options.line },
		];
		const lists = ref({ list: [] });
		const chartOption = ref({});
		const chartInfo = ref({});
		const moveItem = ref({});
		return { selection, lists, moveItem, chartOption, chartInfo };
	},
	methods: {
		log: function(evt) {
			window.console.log(evt);
			if (evt.added) {
				console.log(this.moveItem, evt.added.element);
				this.moveItem.id = evt.added.element.id;
			}
		},
		cloneChart({ option, name }) {
			return {
				id: idGlobal++,
				name,
				option,
			};
		},
		handleChartSelect(e, n) {
			// console.log("select", e, this.chartOption, n);
			this.chartOption.value = e.option;
			this.chartInfo.value = { id: e.id, name: n };
		},
		handleOptionChange(e, info) {
			// console.log("e", JSON.parse(e), info.value.name);
			const el = JSON.parse(e);
			const name = info.value.name;
			const id = info.value.id;
			let index;
			for (let i in this.lists[name]) {
				if (this.lists[name][i].id == id) {
					index = i;
				}
			}
			this.lists[name][index].option = el;
		},
		onMove(e) {
			console.log(e);
			if (e.to.classList.contains("selection")) {
				return false;
			}
			return true;
		},
		handleDragOver(e) {
			// console.log("dragover", e);
			// console.log(this.moveItem);
			this.moveItem.x = e.x;
			this.moveItem.y = e.y;
		},
		handleEnd(e) {
			console.log("end", e);
			// const { id, x, y } = this.moveItem;
			// const ele = document.getElementById(id);
			// ele.style.position = "absolute";
			// ele.style.top = `${x -280}px`;
			// ele.style.left = `${y -280}px`;
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
	overflow-y: auto;
}

.left {
	padding: 10px 0px;
	background: lightgrey;
	display: flex;
	justify-content: center;
}

.left p {
	padding: 10px 0 0 0;
	margin: 0;
}

.left .list-group {
	flex-wrap: wrap;
	justify-content: center;
}

.left .list-group-item {
	transform: scale(70%);
	width: 280px;
	height: 280px;
	padding: 0;
}

.center {
	border-left: 1px solid black;
	border-right: 1px solid black;
	flex: 1;
	padding: 0 50px;
	display: flex;
	flex-wrap: wrap;
}

.center .list-group-item {
	width: 400px;
	height: 400px;
}

.dragArea {
	width: 100%;
	height: 100%;
	/* background: chartreuse; */
}

.list-group {
	position: relative;
	display: flex;
	flex-wrap: wrap;
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
