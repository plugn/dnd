
function getCoords(elem) {
	const box = elem.getBoundingClientRect();
	return {
		top: box.top + pageYOffset,
		left: box.left + pageXOffset
	};
}

function generateList(amount) {
	let item = document.querySelector('.block .item');
	console.log(item.nodeName);
	//item.style.display = 'none';
	let len = amount || 10;
	console.log('len', len)
	for (let i=0; i<len; i++) {
		let dupe = item.cloneNode(true);
		dupe.classList.add('dupe');
		dupe.innerHTML +=  'item # ' + (i+1);
		// console.log(dupe.nodeName + ':',dupe.textContent);
		item.parentNode.appendChild(dupe)
	}
}
function clearList() {
	document.querySelectorAll('.block .dupe')
		.forEach(function(dupe) {
			dupe.parentNode.removeChild(dupe);
		});
}
clearList();
generateList(18);

(function (scope) {
	let stateDefaults = {
			isDragging: false,
			dragElement: null,
			dragGhost: null,
			dragSelector: null,
			downX: undefined,
			downY: undefined,
			shiftX: undefined,
			shiftY: undefined
		},
		state = Object.assign({}, stateDefaults);


	function createGhost(sourceElement) {

		// запомнить старые свойства, чтобы вернуться к ним при отмене переноса
		let ghostElement = sourceElement;
		let old = {
			parent: ghostElement.parentNode,
			nextSibling: ghostElement.nextSibling,
			position: ghostElement.position || '',
			left: ghostElement.left || '',
			top: ghostElement.top || '',
			zIndex: ghostElement.zIndex || ''
		};

		// функция для отмены переноса
		ghostElement.rollback = function() {
			old.parent.insertBefore(ghostElement, old.nextSibling);
			ghostElement.style.position = old.position;
			ghostElement.style.left = old.left;
			ghostElement.style.top = old.top;
			ghostElement.style.zIndex = old.zIndex
		};

		return ghostElement;
	}


	function onDrag (e) {
		console.log('dragTracking() currentTarget', e.currentTarget.nodeName, ' target:', e.target.nodeName);
		if (! state.dragElement) { return; }
		if (! state.dragGhost ) {
/*
			let dragTolerance = 3;
			let moveX = e.pageX - state.downX;
			let moveY = e.pageY - state.downY;
			if ( Math.abs(moveX) < dragTolerance && Math.abs(moveY) < dragTolerance ) {
				return; // ignore shaking
			}
*/
			state.dragGhost = createGhost(state.dragElement);
			if (!state.dragGhost) {
				console.warn('problems with createGhost() for ', state.dragElement);
				return;
			}

			const coords = getCoords(state.dragGhost);
			state.shiftX = state.downX - coords.left;
			state.shiftY = state.downY - coords.top;

			startDrag(e);

		}
		state.dragGhost.style.left = e.pageX - state.shiftX + 'px';
		state.dragGhost.style.top = e.pageY - state.shiftY + 'px';

	}

	function startDrag(e) {
		let ghost = state.dragGhost;
		ghost.style.zIndex = 500;
		ghost.style.position = 'absolute';
		document.body.appendChild(ghost);
	}


	function initDrag(e) {
		console.log('initDrag()');
		if (e.which != 1) { return; }

		let elem = e.target.closest(state.dragSelector);

		console.log('target', e.target, 'elem', elem);

		if (!elem) { return; }

		// запомнить переносимый объект
		state.dragElement = elem;

		// запомнить координаты, с которых начат перенос объекта
		state.downX = e.pageX;
		state.downY = e.pageY;

		document.addEventListener('mousemove', onDrag);



	}


	function finishDrag(e) {
		let dropElem = findDroppable(e);

		if (!dropElem) {
			onDragCancel();
		} else {
			onDragEnd(dropElem);
		}
		console.log('finishDrag()', e);
		state = Object.assign({}, stateDefaults);

		console.log(' * mousemove unbound');

		document.removeEventListener('mousemove', onDrag);

	}
	function findDroppable(event) {
		// спрячем переносимый элемент
		state.dragGhost.hidden = true;

		// получить самый вложенный элемент под курсором мыши
		let elem = document.elementFromPoint(event.clientX, event.clientY);

		// показать переносимый элемент обратно
		state.dragGhost.hidden = false;

		if (elem == null) {
			// такое возможно, если курсор мыши "вылетел" за границу окна
			return null;
		}

		return elem.closest(state.dropSelector);
	}

	this.onDragEnd = function(dropElem) {

		dropElem.appendChild(state.dragElement);
	};
	this.onDragCancel = function(dragObject) {};


	function start(selector, dropSelector) {
		state.dragSelector = selector || 'body';
		state.dropSelector = dropSelector || state.dragSelector;
		// state.dragNodes = selector && document.querySelectorAll(selector);

		document.addEventListener('mousedown', initDrag);
		document.addEventListener('mouseup', finishDrag);
	}

	function stop () {
		document.removeEventListener('mousedown',initDrag);
		document.removeEventListener('mouseup', finishDrag);
	}

	scope.Drag = {
		start: start,
		stop: stop
	};


})(window);





