<template>
	<Home />
</template>

<script>
import Home from "@/views/Home.vue";

export default {
	components: { Home },
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
</style>
