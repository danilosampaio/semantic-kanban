<template>
	<div class="ui mini modal">
		<div class="ui segment">
			<form class="ui form">
				<div class="required field">
					<label>Name</label>
					<input type="text" name="name" v-model="member.name">
				</div>
			</form>
			<button v-on:click="save()" class="ui button">Save</button>
		</div>
	</div>
</template>

<script type="text/javascript">
	import _ from 'lodash'
	import $ from 'jquery'

	export default {
		data () {
			return {
				member: {
					id: null,
					name: null
				}
			}
		},
		methods: {
			show (member) {
				if (member) {
					_.assign(this.member, member)
				} else {
					this.member.id = null
					this.member.name = null
				}
				$(this.$el).modal('show')
			},
			hide () {
				$(this.$el).modal('hide')
			},
			save () {
				this.hide()
				this.$emit('updateMember', this.member)
			}
		}
	}
</script>
