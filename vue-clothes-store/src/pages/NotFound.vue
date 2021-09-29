<template>
	<div class="container">
		<h1>Страница не найдена</h1>
		<router-link to="/" v-slot="{ navigate }">
			<el-link @click="navigate" type="success">На главную</el-link>
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'not-found',
}
</script>

<style lang="scss" scoped>
div {
	padding: 200px 0;
	text-align: center;
}

h1 {
	margin: 30px 0;
}
</style>
