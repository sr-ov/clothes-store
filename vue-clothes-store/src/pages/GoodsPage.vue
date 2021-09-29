<template>
	<section class="goods">
		<div class="container">
			<transition-fade>
				<ul v-if="!isLoading" class="goods__list">
					<card-good
						v-for="good in goods"
						:good="good"
						:key="good.id"
					></card-good>
				</ul>
			</transition-fade>
		</div>
		<c-spinner :loading="isLoading" bg="transparent"></c-spinner>
	</section>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'goods-page',
	computed: mapState({
		goods: ({ goods }) => goods.goods,
		isLoading: ({ goods }) => goods.loading,
	}),
}
</script>
