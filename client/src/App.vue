<template>
	<div>
		<header>
			<div class="logos">
				<img src="/giphy_logo.png" alt="giphy-logo" />
				<img src="/pixabay_logo.png" alt="pixabay-logo" />
			</div>
			<search-form />
			<div class="error__box">
				<strong v-if="OneOfRequestsError">{{ OneOfRequestsError }}</strong>
				<strong v-if="error">We are sorry, but an error occured...</strong>
			</div>
		</header>
		<main>
			<section id="container" class="giphs">
				<strong class="loading__box">LOADING...</strong>
			</section>
		</main>
	</div>
</template>

<script>
	import SearchForm from "./components/SearchForm.vue";
	export default {
		name: "App",
		data() {
			return {
				loading: false,
				OneOfRequestsError: null,
				error: null
			};
		},
		components: {
			SearchForm
		}
	};
</script>

