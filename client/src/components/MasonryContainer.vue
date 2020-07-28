<template>
	<div v-masonry transition-duration="1s" item-selector=".box__giph" class="giphs__box">
		<div v-masonry-tile v-for="element in results" :key="element.id" class="box__giph">
			<img :src="element.image" :alt="element.title" />
		</div>
	</div>
</template>

<script>
	export default {
		name: "MasonryContainer",
		props: {
			results: {
				type: Array,
				default: () => [],
			},

			error: {
				type: String,
				default: "",
			},

			loadingMoreElements: {
				type: Boolean,
				default: false,
			},
		},
	};
</script>