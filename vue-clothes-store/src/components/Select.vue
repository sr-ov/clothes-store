<template>
	<div class="card-good__sizes-wrapper card-good__select__wrapper">
		<button
			@click="isOpen = !isOpen"
			class="card-good__sizes card-good__select"
		>
			{{ text }}
		</button>
		<ul
			v-show="isOpen"
			class="card-good__sizes-list card-good__select-list"
			v-click-outside="vcoConfig"
		>
			<li
				v-for="(el, i) in data"
				@click="setItem(i)"
				:key="i"
				class="card-good__select-item"
			>
				{{ el }}
			</li>
		</ul>
		<div class="err" v-if="error">нужно выбрать {{ placeholder }}</div>
	</div>
</template>

<script>
export default {
	name: 'c-select',
	props: {
		data: Array,
		placeholder: String,
		modelValue: String,
		error: Boolean,
	},
	emits: ['update:modelValue', 'update:error'],
	data() {
		return {
			isOpen: false,
			item: -1,
			vcoConfig: {
				handler: this.handler,
				middleware: this.middleware,
				events: ['click'],
				isActive: true,
				capture: false,
			},
		}
	},
	methods: {
		setItem(item) {
			this.item = item
			this.isOpen = false
		},

		handler() {
			this.isOpen = false
		},

		middleware({ target }) {
			return (
				this.isOpen &&
				!target.closest('.card-good__select-list') &&
				!target.classList.contains('card-good__select')
			)
		},
	},

	computed: {
		text() {
			return this.item > -1
				? this.data[this.item]
				: `Выберите ${this.placeholder}`
		},
	},
	watch: {
		text(newValue) {
			this.$emit('update:modelValue', newValue)
			this.$emit('update:error', false)
		},
	},
}
</script>

<style scoped>
.err {
	font-size: 14px;
	color: red;
}
</style>
