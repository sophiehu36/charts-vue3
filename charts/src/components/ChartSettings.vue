<template>
	<div>
		<div class="wrapper" contenteditable="true" @blur="handleContentChange">
			{{ JSON.stringify(settings.value) }}
		</div>
	</div>
</template>

<script>
import { ref } from "vue";
export default {
	name: "ChartSettings",
	props: ["option"],
	setup(props) {
		console.log(props.option);
		const settings = props.option || ref({});
		return { settings };
	},
	methods: {
		handleContentChange(e) {
			console.log("change", e.target);
			this.$emit("change-option", e.target.innerText);
		},
	},
};
</script>

<style scoped>
.wrapper {
	text-align: left;
}
</style>
