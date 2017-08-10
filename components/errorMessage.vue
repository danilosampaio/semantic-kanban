<template>
	<div v-if="showError" class="ui error message">
	  <div class="header">
	    {{error.message}}
	  </div>
	  {{error.stack}}
	</div>
</template>

<script>
	export default {
		props: ['error'],
		computed: {
			showError () {
				return this.error.message != null;
			}
		}
	}
</script>