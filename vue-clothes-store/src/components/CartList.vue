<template>
	<transition-group name="list">
		<el-row
			v-for="item in items"
			:key="item.productId"
			:gutter="20"
			class="row"
		>
			<el-col :span="14">
				<el-col :span="6">
					<el-image
						fit="contain"
						:src="`/goods-image/${item.productPreview}`"
						:alt="item.name"
						class="img"
					/>
				</el-col>
				<el-col>
					<el-row>{{ item.productName }}</el-row>
					<el-row v-if="item.size">размер: {{ item.size }}</el-row>
					<el-row v-if="item.color">цвет: {{ item.colour }}</el-row>
				</el-col>
			</el-col>
			<el-col :span="6">
				<el-input-number
					v-model.number="item.cntSize"
					@change="
						(newValue, oldValue) =>
							$emit(
								'change-quantity',
								item.size,
								item.color,
								item.productId,
								newValue,
								oldValue,
							)
					"
					:min="0"
				></el-input-number>
			</el-col>
			<el-col :span="4">
				<div>{{ item.productPrice }} ₽</div>
			</el-col>
		</el-row>
	</transition-group>
</template>

<script>
export default {
	name: 'cart-list',
	emits: ['change-quantity'],

	props: {
		items: { type: Array, required: true },
	},
}
</script>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
	transition: all 0.3s ease-in-out;
}
.list-enter-from,
.list-leave-to {
	opacity: 0;
}
</style>
