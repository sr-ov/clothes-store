<template>
	<section class="promo">
		<div class="container">
			<ul class="promo__grid">
				<li class="promo__grid-item promo__grid-item__big">
					<img class="promo__grid-image" src="image/beach.jpg" alt="" />
				</li>

				<li class="promo__grid-item promo__grid-item__small">
					<img class="promo__grid-image" src="image/sport.jpg" alt="" />
				</li>

				<li class="promo__grid-item promo__grid-item__small">
					<img class="promo__grid-image" src="image/umbrella.jpg" alt="" />
				</li>
			</ul>

			<ul class="promo__grid promo__grid-reverse">
				<li class="promo__grid-reverse-item promo__grid-reverse-item__big">
					<img class="promo__grid-image" src="image/premium.jpg" alt="" />
				</li>

				<li
					class="promo__grid-reverse-item promo__grid-reverse-item__small"
				>
					<img class="promo__grid-image" src="image/sneakers.jpg" alt="" />
				</li>

				<li
					class="promo__grid-reverse-item promo__grid-reverse-item__small"
				>
					<img class="promo__grid-image" src="image/child.jpg" alt="" />
				</li>
			</ul>
		</div>
	</section>
</template>

<script>
export default {
	name: 'home-page',
}
</script>
