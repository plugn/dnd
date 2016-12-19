(function () {
	'use strict';

	function byId (id) { return document.getElementById(id); }


/*
	Sortable.create(byId('foo'), {
		group: "words",
		animation: 150,
		store: {
			get: function (sortable) {
				var order = localStorage.getItem(sortable.options.group);
				return order ? order.split('|') : [];
			},
			set: function (sortable) {
				var order = sortable.toArray();
				localStorage.setItem(sortable.options.group, order.join('|'));
			}
		},
		onAdd: function (evt){ console.log('onAdd.foo:', [evt.item, evt.from]); },
		onUpdate: function (evt){ console.log('onUpdate.foo:', [evt.item, evt.from]); },
		onRemove: function (evt){ console.log('onRemove.foo:', [evt.item, evt.from]); },
		onStart:function(evt){ console.log('onStart.foo:', [evt.item, evt.from]);},
		onSort:function(evt){ console.log('onStart.foo:', [evt.item, evt.from]);},
		onEnd: function(evt){ console.log('onEnd.foo:', [evt.item, evt.from]);}
	});


	Sortable.create(byId('bar'), {
		group: "words",
		animation: 150,
		onAdd: function (evt){ console.log('onAdd.bar:', evt.item); },
		onUpdate: function (evt){ console.log('onUpdate.bar:', evt.item); },
		onRemove: function (evt){ console.log('onRemove.bar:', evt.item); },
		onStart:function(evt){ console.log('onStart.foo:', evt.item);},
		onEnd: function(evt){ console.log('onEnd.foo:', evt.item);}
	});

*/

	// Multi groups
	Sortable.create(byId('multi'), {
		animation: 150,
		draggable: '.tile',
		handle: '.tile__name'
	});

	[].forEach.call(byId('multi').getElementsByClassName('tile__list'), function (el){
		Sortable.create(el, {
			group: 'photo',
			animation: 150
		});
	});


/*
	// Editable list
	var editableList = Sortable.create(byId('editable'), {
		animation: 150,
		filter: '.js-remove',
		onFilter: function (evt) {
			evt.item.parentNode.removeChild(evt.item);
		}
	});


	byId('addUser').onclick = function () {
		Ply.dialog('prompt', {
			title: 'Add',
			form: { name: 'name' }
		}).done(function (ui) {
			var el = document.createElement('li');
			el.innerHTML = ui.data.name + '<i class="js-remove">✖</i>';
			editableList.el.appendChild(el);
		});
	};
*/


/*
	// Advanced groups
	[{
		name: 'advanced',
		pull: true,
		put: true
	},
		{
			name: 'advanced',
			pull: 'clone',
			put: false
		}, {
		name: 'advanced',
		pull: false,
		put: true
	}].forEach(function (groupOpts, i) {
		Sortable.create(byId('advanced-' + (i + 1)), {
			sort: (i != 1),
			group: groupOpts,
			animation: 150
		});
	});


	// 'handle' option
	Sortable.create(byId('handle-1'), {
		handle: '.drag-handle',
		animation: 150
	});
*/



})();


