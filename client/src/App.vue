<template>
	<div>
		<header>
			<div class="logos">
				<img src="/giphy_logo.png" alt="giphy-logo" />
				<img src="/pixabay_logo.png" alt="pixabay-logo" />
			</div>
			<search-form @onDataReady="searchForElements" />
			<div class="error__box">
				<strong v-if="OneOfRequestsError">{{ OneOfRequestsError }}</strong>
				<strong v-if="error">We are sorry, but an error occured...</strong>
			</div>
		</header>
		<main>
			<section id="container" class="giphs">
				<strong class="loading__box">LOADING...</strong>
				<masonry-container :results="results" :error="error" :loadingMoreElements="loadingMoreElements" />
			</section>
		</main>
	</div>
</template>

<script>
	import SearchForm from "./components/SearchForm.vue";
	import MasonryContainer from "./components/MasonryContainer.vue";
	export default {
		name: "App",
		data() {
			return {
				loading: false,
				OneOfRequestsError: null,
				error: null,
				results: [],
				query: null,
				loadingMoreElements: false
			};
		},
		components: {
			SearchForm,
			MasonryContainer
		},
		watch: {
			query(value) {
				if (value) {
					this.error = null;
					this.fetchImagesAndGiphs(value);
				}
			}
		},
		methods: {
			fetchImagesAndGiphs({ search, page, offset, resultPerPage }) {
				if (!this.loadingMoreElements) {
					this.loading = true;
				}
				fetch(
					`http://localhost:8082/search?search=${search}&page=${page}&offset=${offset}&per_page=${resultPerPage}}`,
					{
						method: "GET"
					}
				)
					.then(response => {
						if (!response.ok) {
							throw new Error(response.statusText);
						}
						return response.json();
					})
					.then(data => {
						const { imagesAndGiphs, errors } = data;
						this.results = [...this.results, ...imagesAndGiphs];
						if (errors.length !== 0) {
							setTimeout(() => {
								this.OneOfRequestsError = null;
							}, 2000);
							this.OneOfRequestsError = "One of your requests has failed.";
						}
					})
					.then(() => {
						this.loading = false;
						this.loadingMoreElements = false;
					})
					.catch(error => {
						this.error = error;
					});
			},
			searchForElements(search) {
				this.results = [];
				this.query = { search, resultPerPage: 10, offset: 0, page: 1 };
			}
		}
	};
</script>

