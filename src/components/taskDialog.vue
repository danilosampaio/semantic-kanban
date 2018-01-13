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
							<option value="archived">Archived</option>
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
				</div>
				<div class="fields">
					<div class="field" v-if="newTag">
						<div class="ui mini input">
							<input
								v-on:keyup.enter="saveNewTag"
								v-on:keyup.esc="cancelNewTag"
								type="text"
								name="newTag">
						</div>
					</div>
					<div class="field" v-if="newTag">
						<chrome-picker
							v-model="colors"
							:palette="palette"
							ref="colorpicker" />
					</div>
					<a v-if="!newTag" v-on:click="addNewTag" class="ui left pointing basic label">
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
	import { Compact } from 'vue-color'

	export default {
		components: {
			'chrome-picker': Compact
		},
		props: ['owners'],
		data () {
			return {
				task: {
					id: null,
					subject: null,
					description: null,
					status: 'backlog',
					owner: null,
					dueDate: null,
					tags: []
				},
				newTag: false,
				palette: ['#DB2828', '#F2711C', '#FBBD08', '#B5CC18', '#21BA45', '#00B5AD', '#2185D0', '#A333C8', '#E03997', '#A5673F', '#1B1C1D'],
				semanticColors: ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'purple', 'pink', 'brown', 'black'],
				colors: {
					hex: '#21BA45',
					hsl: {
						h: 134,
						s: 0.7,
						l: 0.43,
						a: 1
					},
					hsv: {
						h: 134,
						s: 0.82,
						v: 0.73,
						a: 1
					},
					rgba: {
						r: 33,
						g: 186,
						b: 69,
						a: 1
					},
					a: 1
				}
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
				this.newTag = false
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
					return tag.value
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
				const pickedColorIndex = this.$refs.colorpicker.pick ? this.palette.indexOf(this.$refs.colorpicker.pick) : -1
				const color = pickedColorIndex > -1 ? this.semanticColors[pickedColorIndex] : ''
				const value = e.target.value
				if (!this.task.id) {
					this.task.tags.push({value, color})
				}
				this.$emit('addTag', this.task, {value, color})
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
