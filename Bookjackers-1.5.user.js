// ==UserScript==
// @name         Bookjackers
// @namespace    http://tampermonkey.net/
// @version      1.5
// @description  Highlights bookjackers' names as a warning.
// @author       Fudge
// @match        *://*.abebooks.com/*
// @match        *://*.abebooks.co.uk/*
// @match        *://*.abebooks.de/*
// @match        *://*.abebooks.fr/*
// @match        *://*.abebooks.it/*
// @match        *://*.abebooks.ca/*
// @match        *://*.iberlibro.com/*
// @match        *://*.zvab.com/*
// @match        *://*.ebay.com/*
// @match        *://*.ebay.co.uk/*
// @match        *://*.ebay.de/*
// @match        *://*.ebay.fr/*
// @match        *://*.ebay.ca/*
// @match        *://*.ebay.com.au/*
// @match        *://*.ebay.it/*
// @match        *://*.ebay.es/*
// @match        *://*.ebay.nl/*
// @match        *://*.ebay.ie/*
// @match        *://*.ebay.be/*
// @match        *://*.ebay.com.hk/*
// @match        *://*.ebay.com.sg/*
// @match        *://*.ebay.com.my/*
// @match        *://*.amazon.com/*
// @match        *://*.amazon.co.uk/*
// @match        *://*.amazon.de/*
// @match        *://*.amazon.fr/*
// @match        *://*.amazon.ca/*
// @match        *://*.amazon.com.au/*
// @match        *://*.amazon.it/*
// @match        *://*.amazon.es/*
// @match        *://*.amazon.co.jp/*
// @match        *://*.amazon.in/*
// @match        *://*.amazon.com.br/*
// @match        *://*.amazon.nl/*
// @match        *://*.amazon.cn/*
// @match        *://*.amazon.com.mx/*
// @match        *://*.biblio.com/*
// @match        *://*.biblio.co.uk/*
// @match        *://*.biblio.com.au/*
// @match        *://*.bookshop.org/*
// @match        *://*.bookshop.org.uk/*
// @match        *://*.vialibri.net/*
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
	'use strict';
	
	const SELLERS_URL = 'https://raw.githubusercontent.com/DoctorFudge/Bookjackers/refs/heads/main/sellers.json';
	
	let baddudes = [];
	let cooldudes = [];

	function fixWord(word) {
		return word.replace(/&/g, '(?:&|and)').replace(/’|`/g, '(?:\'|’|`)').replace(/'/g, '(?:\'|’|`)').replace(/[\s-_]/g, '[\\s-_]*');
	}

	function fetchSellers() {
		return new Promise((resolve, reject) => {
			GM_xmlhttpRequest({
				method: 'GET',
				url: SELLERS_URL,
				onload: function(response) {
					try {
						const data = JSON.parse(response.responseText);
						baddudes = data.bookjackers || [];
						cooldudes = data.cooldudes || [];
						console.log('Bookjackers: Loaded', baddudes.length, 'bad sellers and', cooldudes.length, 'good sellers');
						resolve();
					} catch (err) {
						console.error('Bookjackers: Failed to parse JSON:', err);
						reject(err);
					}
				},
				onerror: function(err) {
					console.error('Bookjackers: Failed to fetch sellers list:', err);
					reject(err);
				}
			});
		});
	}

	function highlightText(node, badList, coolList) {
		if (node.nodeType === 3 && !node.parentNode.classList.contains('bookjacker') && !node.parentNode.classList.contains('supercool')) {
			let match;
			if ((match = node.nodeValue.match(badList))) {
				const span = document.createElement('span');
				span.classList.add('bookjacker');
				span.innerHTML = node.nodeValue.replace(badList, '<span style="background-color: red; color: white;">$&</span>');
				node.parentNode.replaceChild(span, node);
			} else if ((match = node.nodeValue.match(coolList))) {
				const span = document.createElement('span');
				span.classList.add('supercool');
				span.innerHTML = node.nodeValue.replace(coolList, '<span style="background-color: darkgreen; color: white; font-weight: bold;">$&</span>');
				node.parentNode.replaceChild(span, node);
			}
		} else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE' && node.nodeName !== 'INPUT' && node.nodeName !== 'TEXTAREA' && !node.isContentEditable) {
			for (let i = 0; i < node.childNodes.length; i++) {
				highlightText(node.childNodes[i], badList, coolList);
			}
		}
	}

	function highlightPage() {
		if (baddudes.length === 0 && cooldudes.length === 0) {
			console.log('Bookjackers: No seller lists loaded');
			return;
		}
		
		const fixedbookjackers = baddudes.map(fixWord);
		const fixedcooldudes = cooldudes.map(fixWord);
		const badList = new RegExp('(' + fixedbookjackers.join('|') + ')', 'gi');
		const coolList = new RegExp('(' + fixedcooldudes.join('|') + ')', 'gi');

		highlightText(document.body, badList, coolList);
		
		const notification = document.createElement('div');
		notification.style.position = 'fixed';
		notification.style.bottom = '10px';
		notification.style.right = '10px';
		notification.style.padding = '10px';
		notification.style.backgroundColor = 'black';
		notification.style.color = 'white';
		notification.style.opacity = '0.8';
		notification.style.zIndex = '9999';
		notification.style.borderRadius = '5px';
		notification.innerText = `Sellers Highlighted (${baddudes.length} bad, ${cooldudes.length} good)`;
		document.body.appendChild(notification);
		
		setTimeout(() => {
			notification.style.transition = 'opacity 2s';
			notification.style.opacity = '0';
			setTimeout(() => {
				notification.remove();
			}, 2000);
		}, 2000);
	}

	async function init() {
		try {
			await fetchSellers();
		} catch (err) {
			console.error('Bookjackers: Using empty seller lists due to fetch error');
		}
		
		// 5-second delay in milliseconds, adjust to taste.
		setTimeout(highlightPage, 5000);
	}

	init();
})();
