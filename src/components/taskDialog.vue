<template>
	<div class="ui modal">
		<div class="ui segment">
			<form class="ui form">
				<div class="required field">
					<label>Subject</label>
					<input type="text" name="subject" v-model="task.subject">
				</div>
				<div class="field">
					<label>Description</label>
					<textarea rows="2" v-model="task.description"></textarea>
				</div>
				<div class="fields">
					<div class="seven wide required field">
						<label>Owner</label>
						<select class="ui fluid search dropdown" name="owner" v-model="task.owner">
							<option v-for="ow in owners" :value="ow.id">{{ow.name}}</option>
						</select>
					</div>
					<div class="required field">
						<label>Due Date</label>
						<input 
							id="taskDueDate"
							name="dueDate" 
							type="text" 
							v-model="task.dueDate" 
							data-toggle="datepicker">
					</div>
					<div class="required field">
						<label>Status</label>
						<select class="ui fluid search dropdown" name="status" v-model="task.status">
							<option value="backlog">Backlog</option>
							<option value="doing">Doing</option>
							<option value="blocked">Blocked</option>
							<option value="done">Done</option>
						</select>
					</div>
				</div>
				<div class="fields">
					<div
						v-for="tag in _tags"
						:class="getTagClass(tag)">
						{{formattedTag(tag)}}
						<i v-on:click="deleteTag(tag)" class="close icon"></i>
					</div>
					<div class="ui input">
						<input
							v-if="newTag"
							v-on:keyup.enter="saveNewTag"
							v-on:keyup.esc="cancelNewTag"
							type="text"
							name="newTag">
					</div>
					<a v-on:click="addNewTag" class="ui left pointing basic label">
						<i class="plus icon"></i> New tag
					</a>
				</div>
			</form>
			<button v-on:click="saveTask()" class="ui button">Save</button>
		</div>
	</div>
</template>

<script type="text/javascript">
	import _ from 'lodash'
	import $ from 'jquery'
	import moment from 'moment'
	import '@fengyuanchen/datepicker'
	import '@fengyuanchen/datepicker/dist/datepicker.css'

	export default {
		props: ['owners'],
		data () {
			return {
				task: {
					id: null,
					subject: null,
					description: null,
					status: null,
					owner: null,
					dueDate: null,
					tags: []
				},
				newTag: false
			}
		},
		computed: {
			_tags () {
				return this.task && this.task.tags
					? this.task.tags
					: []
			}
		},
		methods: {
			show (task) {
				if (task) {
					_.assign(this.task, task)
				} else {
					this.task.id = null
					this.task.subject = null
					this.task.description = null
					this.task.status = 'backlog'
					this.task.owner = null
					this.task.dueDate = null
					this.task.tags = []
				}
				$(this.$el).modal('show')
			},
			hide () {
				$(this.$el).modal('hide')
			},
			saveTask () {
				this.$emit('updateTask', this.task)
				this.hide()
			},
			formattedTag (tag) {
				if (typeof tag === 'object') {
					return tag.title
				} else {
					return tag
				}
			},
			getTagClass (tag) {
				if (typeof tag === 'object') {
					return 'ui ' + tag.color + ' label'
				} else {
					return 'ui label'
				}
			},
			addNewTag () {
				this.newTag = true
			},
			saveNewTag (e) {
				this.newTag = false
				this.$emit('addTag', this.task, e.srcElement.value)
			},
			cancelNewTag () {
				this.newTag = false
			},
			deleteTag (tag) {
				this.$emit('deleteTag', this.task, tag)
			}
		},
		mounted () {
			var vm = this
			$(this.$el).find('#taskDueDate').datepicker({
				format: 'mm/dd/yyyy hh:mm',
				autoHide: true
			}).on('pick.datepicker', function (e) {
				vm.task[e.currentTarget.name] = moment(e.date).format('MM/DD/YYYY hh:mm')
			})
		}
	}
</script>
