<template>
	<ChartSelector class="left" @add-chart="handleChartAdd"></ChartSelector>
	<div class="center">
		<component
			v-for="item in componentList.value"
			:is="item.name"
			:chart-id="item.name + item.id"
			:key="item.id"
		></component>
	</div>
	<div class="right">right</div>
</template>

<script>
import { ref } from "vue";
import ChartSelector from "@/components/ChartSelector.vue";
import Histogram from "@/components/Histogram.vue";
import PieChart from "@/components/PieChart.vue";

export default {
	name: "App",
	components: { ChartSelector, Histogram, PieChart },
	setup() {
		const componentList = ref([
			{ name: "Histogram", id: "1" },
			{ name: "PieChart", id: "2" },
		]);
		const addComponent = (value) => {
			componentList.value.push({ name: value, id: componentList.length++ });
		};
		return { componentList, addComponent };
	},
	methods: {
		handleChartAdd(value) {
			console.log(value);
			this.addComponent(value);
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
}

.center > div {
	width: 400px;
	height: 400px;
}
</style>
