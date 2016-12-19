(function () {
	initDrag();


	function initDrag() {

		$('.list-group-item')
			.attr('draggable', 'true')
			.on('dragstart', function(event) {
				var dt = event.originalEvent.dataTransfer;
				dt.setData('text', 'dndText');
				console.log('dt', dt);
				return true;
			})
			.on('dragend', function (event)  {
				return false;
			});

		$('.list-group')
			.on('dragover', function () {
				return false;
			})
			.on('drop', function (event) {
				var dt = event.originalEvent.dataTransfer;
				console.log('drop', dt.getData('text'));
				return true;

			})

	}

})();



