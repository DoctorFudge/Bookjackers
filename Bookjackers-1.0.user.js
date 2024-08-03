// ==UserScript==
// @name         Bookjackers
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Highlights bookjackers' names as a warning.
// @author       Fudge
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const words = [
        '_nearfine_', '-Book Bargains-', 'AA7Days', 'academic_book_guy', 'ADONAI BOOKS',
        'AHA-Books', 'amazon college books', 'Amctj', 'angeobooks', 'anstinbooks', 'Any Book',
        'Any_Book', 'Best-Book-Depot', 'BennettBooksLtd', 'betterbooks2009', 'Book Deals',
        'Book Garden', 'Book Smart', 'Book Surplus', 'Booked Again', 'BookGroveMedia',
        'Books of the Smoky Mountains', 'Books_Care', 'BookSleuth', 'Books Unplugged',
        'BooksRunner', 'breakprice', 'BRILANTI BOOKS', 'Brooke Books', 'Butterfly Books',
        'Byrd Books', 'Campbell Bookstore', 'Castle Rock', 'Cloud 9 Books', 'Cold Books',
        'Colibris', 'CONTINENTAL MEDIA & BEYOND', 'Crashing Rocks', 'DailyDeal USA',
        'Denver Deep Reads', 'Diafan Media', 'East West Academic Books', 'Elitedigital',
        'ergodebooks', 'ExtremelyReliable', 'fast-track-books', 'FishandSave', 'forest_of_wisdom',
        'Front Cover Books', 'Funny Precious', 'GF Books, Inc.', 'GlassFrogBooks', 'GoldBooks',
        'GoldenDragon', 'GoldenWavesOfBooks', 'Gray Fox USA', 'GreatBookPrices', 'Hafa Adai Books',
        'International Books', 'Irish Booksellers', 'jason_kurt', 'joypros', 'katesutter',
        'kefalonitis', 'kime_enterprises', 'KingsRidgeMedia', 'lana\'s Shop', 'lance books',
        'Land of Magazines', 'LibraryMercantile', 'Lost Books', 'LowKeyBooks', 'Lucky\'s Fulfillment',
        'melisasandy', 'Merseabooks', 'metropole_press', 'Migna Book Store', 'Murray Media',
        'MyGrandmasGoodies', 'myrockland', 'nearfine-us', 'NOHINSA BOOKS', 'nuggetbooks33',
        'OTTAPLACKAL BOOKS', 'Paradise', 'Park Place Products', 'planet_books', 'Pop\'s Shop Online',
        'price break', 'profnath', 'Quality7', 'relationship', 'Save With Sam', 'sbd',
        'Serendipity UnLtd', 'SGS Trading Inc', 'shopbychoice', 'soundtrack', 'southlandplace',
        'Strait City Trading', 'Successful New', 'Summit Read', 'SunnyDeer Sales', 'Sunshine & Firefly Canada',
        'the_book_community', 'thebookgrove', 'TOTAL BOOKS', 'Tradingcenter', 'TSCBOOKS',
        'Twin City Rarities', 'UCAEDU70', 'US_Bookseller', 'Vault Media', 'walton_boostore',
        'Wisepenny Books', 'Wizard Books', 'Woody\'s Books', 'worldreaders', 'Thriftbooks'
    ];

    const regex = new RegExp('\\b(' + words.join('|') + ')\\b', 'gi');

    function highlightText(node) {
        if (node.nodeType === 3) { // text node
            const match = node.nodeValue.match(regex);
            if (match) {
                const span = document.createElement('span');
                span.innerHTML = node.nodeValue.replace(regex, '<span style="background-color: red; color: white;">$&</span>');
                node.parentNode.replaceChild(span, node);
            }
        } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
            for (let i = 0; i < node.childNodes.length; i++) {
                highlightText(node.childNodes[i]);
            }
        }
    }

    highlightText(document.body);
})();
