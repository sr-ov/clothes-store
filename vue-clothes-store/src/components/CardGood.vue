<template>
	<li class="goods__item">
		<article class="good">
			<router-link class="good__link-img" :to="path">
				<img
					class="good__img"
					:src="`/goods-image/${good.preview}`"
					:alt="good.name"
				/>
			</router-link>
			<div class="good__description">
				<p class="good__price">{{ good.price }} ₽</p>
				<h3 class="good__title">
					{{ good.brand }}
					<span class="good__title__grey"> {{ good.name }}</span>
				</h3>
				<p v-if="good.sizes" class="good__sizes">
					Размеры (RUS):
					<span class="good__sizes-list">{{ good?.sizes.join(' ') }}</span>
				</p>
				<router-link class="good__link" :to="path">Подробнее</router-link>
			</div>
		</article>
	</li>
</template>

<script>
export default {
	name: 'card-good',
	props: { good: Object },

	data() {
		return {
			path: `/goods/${this.good.categoryName}/${this.good.id}`,
		}
	},
}
</script>
