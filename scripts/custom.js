document.addEventListener('DOMContentLoaded', onReady);

function onReady() {
	updateParams();
	updateReturns();
	updateGlobal();
}

function updateParams() {
	queryAll(document, 'table.params .param-type').forEach($paramType => {
		const $paramDesc = $paramType.parentElement.nextElementSibling;
		const paramTypeHash = Object(query($paramType, 'a')).hash;

		if (paramTypeHash && $paramDesc) {
			const $hashDescription = query(document, `${paramTypeHash} ~ .description > p`);

			if ($hashDescription) {
				$paramDesc.appendChild($hashDescription.cloneNode(true));
			}
		}
	});
}

function updateReturns() {
	queryAll(document, 'h5 + dl.param-type').forEach($paramType => {
		const paramHash = Object(query($paramType, '.param-type > a')).hash;

		if (paramHash) {
			const $desc = query(document, `${paramHash} ~ .description > p`);

			const $paramDesc = document.createElement('div');

			$paramDesc.appendChild($desc.cloneNode(true));

			$paramType.parentNode.insertBefore($paramDesc, $paramType);
		}
	});
}

function updateGlobal() {
	const $globalMenuText = Object(query(document, 'body > nav > h3')).lastChild;

	if ($globalMenuText) {
		if ($globalMenuText.data === 'Global') {
			$globalMenuText.data = 'Methods';
		}
	}

	const $pageTitle = Object(query(document, '.page-title')).lastChild;

	if ($pageTitle) {
		if ($pageTitle.data === 'Global') {
			$pageTitle.data = 'Methods';
		}

		const $subsectionTitle = query($pageTitle.parentElement.nextElementSibling, '.subsection-title');

		if ($subsectionTitle) {
			$subsectionTitle.remove();
		}
	}
}

function query(scope, selector) {
	return scope.querySelector(selector);
}

function queryAll(scope, selector) {
	return Array.from(scope.querySelectorAll(selector));
}
