import { ref } from "vue";

export default function useChartEffects() {
	// 默认配置
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

	// 默认图表
	const selection = [
		{ name: "histogram", id: 1, option: options.histogram },
		{ name: "pie", id: 2, option: options.pie },
		{ name: "line", id: 3, option: options.line },
	];

	// 新建图表列表
	const lists = ref({ list: [] });

	// 选中的图表信息
	const selectedChartOption = ref({});
	const selectedChartInfo = ref({});

	// 改变图表配置
	function changeChartOption(e, info) {
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
	}

	// 获取选中的图标信息
	function getChartSelectedInfo(e, n) {
		this.selectedChartOption.value = e.option;
		this.selectedChartInfo.value = { id: e.id, name: n };
	}
	return {
		selection,
		lists,
		selectedChartOption,
		selectedChartInfo,
		changeChartOption,
		getChartSelectedInfo,
	};
}
