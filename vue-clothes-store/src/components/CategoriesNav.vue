<template>
	<nav class="subheader__navigation navigation">
		<ul class="navigation__list">
			<li class="navigation__item">
				<router-link class="navigation__link" to="/goods" exact>
					Все
				</router-link>
			</li>

			<li
				v-for="{ id, name: en, nameRu: ru } in categories"
				:key="id"
				class="navigation__item"
			>
				<router-link
					:class="[
						'navigation__link',
						{ 'router-link-exact-active': en === $route.params.category },
					]"
					:to="`/goods/${en}`"
					exact
				>
					{{ ru }}
				</router-link>
			</li>
		</ul>
	</nav>
</template>

<script>
import { mapState } from 'vuex'

export default {
	name: 'categories-nav',

	data() {
		return {
			path: '',
		}
	},

	computed: mapState({ categories: ({ goods }) => goods.categories }),
}
</script>
