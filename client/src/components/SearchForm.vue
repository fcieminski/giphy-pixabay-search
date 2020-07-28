<template>
	<div class="input__container">
		<form @submit.prevent="handleSubmit" class="container__box">
			<input placeholder="Cmon, search already!" class="box__input" v-model="search" type="text" />
			<button type="submit" class="box__search-button">
				<i class="material-icons material-icons--light">search</i>
			</button>
		</form>
	</div>
</template>

<script>
	export default {
		name: "SearchForm",
		data() {
			return {
				search: "",
			};
		},
		components: {},
		created() {},
		computed: {},
		methods: {
			handleSubmit() {
				if (this.search) {
					this.$emit("onDataReady", this.search);
				}
			},
		},
	};
</script>