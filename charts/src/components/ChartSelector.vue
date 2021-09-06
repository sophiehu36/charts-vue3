<template>
	<div class="container">
		<div
			v-for="(item, index) in chartTypes"
			:key="index"
			@click="handleChartSelect(item.value)"
		>
			{{ item.label }}
		</div>
	</div>
</template>

<script>
export default {
	name: "ChartSelector",
	setup(props, { emit }) {
		const chartTypes = [
			{ label: "柱状图", value: "Histogram" },
			{ label: "饼图", value: "PieChart" },
			{ label: "折线图", value: "LineChart" },
		];
		const handleChartSelect = (value) => {
			emit("add-chart", value);
		};
		return { chartTypes, handleChartSelect };
	},
};
</script>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
}

.container > div {
	padding: 20px;
	border: 1px solid black;
	border-radius: 10px;
	margin-bottom: 20px;
	cursor: pointer;
}
</style>
