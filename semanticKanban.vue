<template>
	<div class="ui basic segment">
		<div class="ui sixteen wide celled grid">
			<!-- Backlog columm -->
			<div class="ui three wide column">			
				<div class="ui blue ribbon label">{{_backlogLabel}}</div>
				<div
					v-on:click="openTask(null)"
					:title="_newTaskHint"
					class="ui circular right floated icon button">
					<i class="plus icon"></i>
				</div>
				<!-- Backlog cards container -->
				<div class="todo">
					<br/>    
				    <backlog-card
				    	v-for="t in _backlog"
				    	:task="t"
				    	:key="t.id"
				    	:owners="members"
				    	:extra-content="_backlogExtraContent"
				    	:top-content="_backlogTopContent"
				    	@openTask="openTask">
				    </backlog-card>
				</div>
			</div>
			<!-- Members, Doing, Blocked, and Done columns -->
			<div class="ui thirteen wide column">
				<div class="ui sixteen column celled grid">
					<!-- Column headers -->
					<div class="equal height row">
						<div class="three wide center aligned column">
							<div class="ui grey label">{{_teamLabel}}</div>
						</div>
						<div class="five wide column">
							<div class="ui yellow ribbon label">{{_doingLabel}}</div>
						</div>
						<div class="four wide column">
							<div class="ui red ribbon label">{{_blockedLabel}}</div>
						</div>
						<div class="four wide column">
							<div class="ui green ribbon label">{{_doneLabel}}</div>
						</div>
					</div>
					<!-- For each member, fill the taskboard: doing, blocked, and done tasks -->
					<div 
						v-for="member in _team"
						:key="member.id"
						class="equal height row">
						<!-- Members container -->
						<div class="three wide column">
							<img class="ui avatar image" :src="getImage(member.avatar)">
							<div class="ui basic left pointing label">{{member.name}}</div>
						</div>
						<!-- Doing cards container -->
						<div class="five wide column doing" :owner="member.id">
							<task-card
								v-for="t in member.doing"
								:task="t"
								:key="t.id"
								:extra-content="_taskExtraContent"
				    			:top-content="_taskTopContent"
								@openTask="openTask">
							</task-card>
						</div>
						<!-- Blocked cards container -->
						<div class="four wide column blocked" :owner="member.id">
							<task-card
								v-for="t in member.blocked"
								:task="t"
								:key="t.id"
								:extra-content="_taskExtraContent"
				    			:top-content="_taskTopContent"
								@openTask="openTask">
							</task-card>
						</div>
						<!-- Done cards container -->
						<div class="four wide column done" :owner="member.id">
							<task-card
								v-for="t in member.done"
								:task="t"
								:key="t.id"
								:extra-content="_taskExtraContent"
				    			:top-content="_taskTopContent"
								@openTask="openTask">
							</task-card>
						</div>
					</div>					
				</div>	    
			</div>
		</div>
		<task-dialog
			:owners="members"
			@updateTask="updateTask"
			ref="dialog">			
		</task-dialog>
	</div>
</template>

<script type="text/javascript">
	import _ from 'lodash';	
	import $ from 'jquery';
	import dragula from 'dragula';
	import BacklogCard from './components/backlogCard.vue';
	import TaskCard from './components/taskCard.vue';
	import TaskDialog from './components/taskDialog.vue';
	import './node_modules/dragula/dist/dragula.css'; 

	export default {
		components: {
			BacklogCard,
			TaskCard,
			TaskDialog
		},
		props: {
			/*
				[{
					id: 1,
					name: 'Awesome Feature X',
					description: 'Implement Awesome Feature X',
					status: 'doing',
					dueDate: '2017-05-22 09:00',
					owner: 1
				}]
			*/
			tasks: {
	        	type: Array,
	        	required: true
	        },
	        /*
				[{
					id: 1,
					name: 'Danilo Sampaio',
					avatar: 'img/danilo.png'
				}]
			*/
	        members: {
	        	type: Array,
	        	required: true
	        },
	        /*
				{
					columnLabels: ['Backlog','Team','Doing','Blocked','Done'],
					newTaskHint: 'New Task'
				}
			*/
	        options: {
	        	type: Object,
	        	required: false
	        }
    	},
		computed: {
			_members () {
				if (this.members && this.members.length > 0) {
			  		return this.members.concat({
			  			id: 'unsigned',
			  			name: 'unsigned',
			  			doing: [],
			  			blocked: [],
			  			done: []
			  		});
			  	} else {
			  		return [{
			  			id: 'unsigned',
			  			name: 'unsigned',
			  			doing: [],
			  			blocked: [],
			  			done: []
			  		}];
			  	}
			},
			_backlog () {
				return _.filter(this.tasks, {status: 'backlog'});
			},
			_team () {
				if (this.tasks && this.tasks.length) {
					const tasks = _.filter(this.tasks, task => task.status !== 'backlog');
					const team = [];

					for (let i = 0; i < tasks.length; i++) {
						const task = tasks[i];
						let member = _.find(this._members, {id: task.owner});
						if (!member) {
							member = this._members[0];
						}

						if (!_.find(team, {id: member.id})){
							team.push(member);
						}

				  		if (task.status === 'backlog') {
				  			this.backlog.push(task);
				  		} else if (task.status === 'doing') {
				  			if (!member.doing) {
				  				member.doing = [];
				  			}
							member.doing.push(task);
				  		} else if (task.status === 'blocked') {
				  			if (!member.blocked) {
				  				member.blocked = [];
				  			}
							member.blocked.push(task);
				  		} else if (task.status === 'done') {
				  			if (!member.done) {
				  				member.done = [];
				  			}
							member.done.push(task);
				  		}
				  	};
				  	return _.sortBy(team, ['name']);
			  	} else {
			  		return this._members;
			  	}
			},
			_columnLabels () {
				if (this.options && this.options.columnLabels) {
					return this.options.columnLabels;
				} else {
					return ['Backlog','Team','Doing','Blocked','Done'];
				}
			},
			_backlogLabel () {
				return this._columnLabels[0];
			},
			_teamLabel () {
				return this._columnLabels[1];
			},
			_doingLabel () {
				return this._columnLabels[2];
			},
			_blockedLabel () {
				return this._columnLabels[3];
			},
			_doneLabel () {
				return this._columnLabels[4];
			},
			_newTaskHint () {
				return this.options && this.options.newTaskHint ?
					this.options.newTaskHint : 'New Task';
			},
			_backlogExtraContent () {
				return this.options && this.options.backlogExtraContent ? this.options.backlogExtraContent() : null;
			},
			_backlogTopContent () {
				return this.options && this.options.backlogTopContent ? this.options.backlogTopContent() : null;
			},
			_taskExtraContent () {
				return this.options && this.options.taskExtraContent ? this.options.taskExtraContent() : null;
			},
			_taskTopContent () {
				return this.options && this.options.taskTopContent ? this.options.taskTopContent() : null;
			}
		},
		methods: {			
			//TODO: needs refactoring
			getImage: function(avatar){
		        return (avatar || 'unsigned');
		    },
		    openTask: function(task) {
		        if (!this.options || this.options.defaultTaskDialog){
		        	this.$refs.dialog.show(task);
		        } else {
			        if (task){
			        	this.$emit('openTask', task);
			    	} else {
			    		this.$emit('newTask');
			    	}
		    	}
		    },
		    getTaskById: function(id) {
		    	const backlogTask = _.find(this._backlog, {id: id});
		    	if (backlogTask) {
		    		return backlogTask;
		    	}

		    	return _.find(this.tasks, {id: id});
		    },
		    updateTask (task) {
		    	this.$emit('updateTask', task);
		    },
		  	configDragula () {
		  		const self = this;
		  		//https://superuser.com/questions/840102/how-do-you-disable-swipe-history-navigation
			  	//Go to chrome://flags/#overscroll-history-navigation
			  	//Disable the Overscroll history navigation experiment:
			  	var drake = dragula({
				    isContainer: function (el) {
				      return el.classList.contains('todo') ||
				             el.classList.contains('doing') ||
				             el.classList.contains('blocked') ||
				             el.classList.contains('done');
				    },
				    moves: function (el, target, source, sibling) {
				    	var id = $(el).attr('id');
				    	var owner = $(target).attr('owner');
				    	var status = $(target).attr('class').split(' ').reverse()[0];

				    	var sourceOwner = $(source).attr('owner');
				    	var sourceStatus = $(source).attr('class').split(' ').reverse()[0];
				      
				    	if (owner != sourceOwner || status != sourceStatus) {
				        	return true;
				    	} else {
				    		return false;
				    	}
				    },
				    accepts: function (el, target, source, sibling) {
				    	var id = $(el).attr('id');
				    	var owner = $(target).attr('owner');
				    	var status = $(target).attr('class').split(' ').reverse()[0];

				    	var sourceOwner = $(source).attr('owner');
				    	var sourceStatus = $(source).attr('class').split(' ').reverse()[0];
				      
				    	if (owner != sourceOwner || status != sourceStatus) {
				        	return true;
				    	} else {
				        	return false;
				    	}
				    }
				});

			  	drake.on('drop', function (el, target, source, sibling) {
				    var id = Number($(el).attr('id'));
				    var owner = $(target).attr('owner');
				    var status = $(target).attr('class').split(' ').reverse()[0];

				    var sourceOwner = $(source).attr('owner');
				    var sourceStatus = $(source).attr('class').split(' ').reverse()[0];
				    
				    if (owner != sourceOwner || status != sourceStatus) {
				    	var task = _.assign({}, self.getTaskById(id));
				    	task.status = status;
				    	task.owner = owner;
				    	
				    	self.$emit('updateTask', task);
				      	return true;
				    } else {
				    	return false;
				    }
			  	});
		  	}
		},
		mounted: function() {
			this.configDragula();		
		}
	}	
</script>
