<template>
	<div class="left">
		<draggable
			class="dragArea list-group selection"
			:list="selection"
			:group="{ name: 'chart', pull: 'clone', put: false }"
			@change="log"
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
				item-key="id"
			>
				<template #item="{ element }">
					<Chart
						:chart-id="element.id"
						drag-class="draggable"
						:option="element.option"
						@click="handleChartSelect(element, name)"
					/>
				</template>
			</draggable>
		</template>
	</div>
	<ChartSettings
		class="right"
		:option="selectedChartOption"
		:info="selectedChartInfo"
		@change-option="handleOptionChange"
	/>
</template>

<script>
import draggable from "vuedraggable";
import Chart from "@/components/Chart.vue";
import ChartSettings from "@/components/ChartSettings.vue";
import useChartEffects from "@/effects";

let idGlobal = 4;

export default {
	name: "App",
	lists: "Custom Clone",
	order: 2,
	components: { draggable, Chart, ChartSettings },
	setup() {
		const {
			selection,
			lists,
			selectedChartOption,
			selectedChartInfo,
			changeChartOption,
			getChartSelectedInfo,
		} = useChartEffects();
		return {
			selection,
			lists,
			selectedChartOption,
			selectedChartInfo,
			changeChartOption,
			getChartSelectedInfo,
		};
	},
	methods: {
		log: function(evt) {
			window.console.log(evt);
		},
		cloneChart({ option, name }) {
			return {
				id: idGlobal++,
				name,
				option,
			};
		},
		handleChartSelect(e, n) {
			// console.log("select", e, this.selectedChartOption, n);
			this.getChartSelectedInfo(e, n);
		},
		handleOptionChange(e, info) {
			// console.log("e", JSON.parse(e), info.value.name);
			this.changeChartOption(e, info);
		},
		onMove(e) {
			console.log(e);
			if (e.to.classList.contains("selection")) {
				return false;
			}
			return true;
		},
	},
};
</script>

<style>
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
	border-left: 3px solid #d0d0d5;
	border-right: 3px solid #d0d0d5;
	flex: 1;
	padding: 0 50px;
	/* display: flex;
	flex-wrap: wrap; */
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

.dragArea > div {
	display: inline-block;
	cursor: move;
}

/* .list-group {
	position: relative;
} */

.right label {
	display: block;
	text-align: left;
	padding-left: 30px;
}

.right input {
	width: 90%;
}
</style>
