<template>
	<div v-loading.fullscreen="loading" :element-loading-background="bg"></div>
</template>

<script>
export default {
	name: 'c-spinner',
	props: {
		loading: Boolean,
		bg: {
			type: String,
			default: '#fff',
		},
	},
}
</script>
