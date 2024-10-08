// ==UserScript==
// @name         Bookjackers
// @namespace    http://tampermonkey.net/
// @version      1.4
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
// @grant        none
// ==/UserScript==

(function() {
	'use strict';
	const baddudes = ['_nearfine_', '-Book Bargains-', 'AA7Days', 'academic_book_guy', 'ADONAI BOOKS', 'AHA-Books', 'amazon college books', 'Amctj', 'angeobooks', 'anstinbooks', 'Any Book', 'Any_Book', 'Best-Book-Depot', 'BennettBooksLtd', 'betterbooks2009', 'Book Deals', 'Book Garden', 'Book Smart', 'Book Surplus', 'Booked Again', 'BookGroveMedia', 'Books of the Smoky Mountains', 'Books_Care', 'BookSleuth', 'Books Unplugged', 'BooksRunner', 'breakprice', 'BRILANTI BOOKS', 'Brooke Books', 'Butterfly Books', 'Byrd Books', 'Campbell Bookstore', 'Castle Rock', 'Cloud 9 Books', 'Cold Books', 'Colibris', 'CONTINENTAL MEDIA & BEYOND', 'Crashing Rocks', 'DailyDeal USA', 'Denver Deep Reads', 'Diafan Media', 'East West Academic Books', 'Elitedigital', 'ergodebooks', 'ExtremelyReliable', 'fast-track-books', 'FishandSave', 'forest_of_wisdom', 'Front Cover Books', 'Funny Precious', 'GF Books, Inc.', 'GlassFrogBooks', 'GoldBooks', 'GoldenDragon', 'GoldenWavesOfBooks', 'Gray Fox USA', 'GreatBookPrices', 'Hafa Adai Books', 'International Books', 'Irish Booksellers', 'jason_kurt', 'joypros', 'katesutter', 'kefalonitis', 'kime_enterprises', 'KingsRidgeMedia', 'lana\'s Shop', 'lance books', 'Land of Magazines', 'LibraryMercantile', 'Lost Books', 'LowKeyBooks', 'Lucky\'s Fulfillment', 'melisasandy', 'Merseabooks', 'metropole_press', 'Migna Book Store', 'Murray Media', 'MyGrandmasGoodies', 'myrockland', 'nearfine-us', 'NOHINSA BOOKS', 'nuggetbooks33', 'OTTAPLACKAL BOOKS', 'Paradise', 'Park Place Products', 'planet_books', 'Pop\'s Shop Online', 'price break', 'profnath', 'Quality7', 'Save With Sam', 'sbd', 'Serendipity UnLtd', 'SGS Trading Inc', 'shopbychoice', 'southlandplace', 'Strait City Trading', 'Successful New', 'Summit Read', 'SunnyDeer Sales', 'Sunshine & Firefly Canada', 'the_book_community', 'thebookgrove', 'TOTAL BOOKS', 'Tradingcenter', 'TSCBOOKS', 'Twin City Rarities', 'UCAEDU70', 'US_Bookseller', 'Vault Media', 'walton_boostore', 'Wisepenny Books', 'Wizard Books', 'Woody\'s Books', 'worldreaders'];
	const cooldudes = ['20 Ants Fine Books', '32.1 Rare Books', '4Shadows', '84 Charing Cross Road', '86 Books', 'A.M. Rapach', 'Aardvark Books', 'Abierto Books', 'Accidental Bookseller', 'Adam McInturf', 'Adam Schachter', 'Ainsworth Books', 'Al Hess', 'Aladdine Joroff', 'Alan Angele', 'Alex Hime', 'Alexis and George Sirrakos', 'Alican Akin', 'Alkahest Books', 'All About Authors', 'Allington Antiquarian', 'Also Books', 'Alta Collection', 'Amatoria Fine Art Books', 'Amy Candiotti and Sean Carlson', 'Amy Ione', 'Andrea Peacock', 'Andrew Gaspar', 'Andrew Gutterman', 'Andrew Langer', 'Andrew Lenoir', 'Andrew Nottman', 'Andrew Szaflarski-saidi', 'Andrew Yerre', 'Andy Rapach', 'Angling Books', 'Anglophile Books International Bookfinders', 'Anne Archer', 'Anthology Booksellers', 'Antique Books Australia', 'Arches Bookhouse', 'Argonaut Book Shop', 'Ari Bayvertyan', 'Ariel Books', 'Armadillo & Dicker', 'Arroyo Seco Books', 'Artem Rare Books', 'Astro Trader Books', 'Auldfarran Books', 'Austin\'s Antiquarian Books', 'Axel Benadi', 'B Street Books', 'Back Lane Books', 'Bagatelle Books', 'Balopticon Books', 'Banjo Booksellers', 'Barbara Chalk', 'Barbarossa Books', 'Barrow Bookstore', 'Barter Books', 'Bartleby\'s Books', 'Basement Books', 'Bayside Books of Maryland', 'Bee Creek Books', 'Bennor Books', 'Beth Fisher', 'Betty Kilner', 'Between the Covers', 'Bevis Stephen Clarke', 'Biblioctopus', 'Bibliodditiques', 'Bibliodisia', 'Bibliomania', 'Billy Morrison', 'Biomed Rare Books', 'Black Cat Caboodle', 'Black Dog Rare Books', 'Black Paw Books', 'Blacks Bookshop', 'Blind-Horse-Books', 'Bliss Books', 'Bluebird Books', 'Bluemango Books and Manuscripts', 'Bluestocking Books', 'Bluff Park Rare Books', 'Bob Linn', 'Bob Maddox', 'Boobooks', 'Book Collector\'s Library', 'Book Hunter\'s Holiday', 'Book Merchant Jenkins', 'BookAddiction', 'Bookcharmed Books', 'Bookfever.com', 'Bookmarc\'s', 'Books & Bidders', 'Books for Cooks', 'Books from the Crypt', 'Books On The Boulevard', 'Books on the West', 'Books-and-Records.com', 'Bookworks', 'Bound2plzBooks', 'Brancamp Books', 'Brandon Rison', 'Brattle Book Shop', 'Brazos Bend Books', 'Brenner\'s Books', 'Brian DiMambro', 'Brian Frailey', 'Bridgesbookshop', 'Bronwyn Smith', 'Brothers\' Fine and Collectible Books', 'Bruce Barnett', 'Bruce Cave', 'Bruce Johnson', 'Bryan Harrison', 'Bryan Young', 'Buckingham Books', 'Bucks County Bookshop', 'Bungalow Books', 'Buteo Books', 'By The Way Books', 'Calico Cat Bookshop', 'Camden Lock Books', 'Cameron Rittenhouse-Smith', 'Candace Hibbard', 'Captain\'s Book Shoppe', 'Captured Tyme Rare Books', 'Carl Mortenson', 'Carlos Martinez', 'Carol Grossman', 'Carpetbagger Books', 'Cat\'s Tale Used Books', 'Cecilia Hecksher', 'Champ & Mabel Collectibles', 'Charles Fedorowicz', 'Charles Kutcher', 'Charles Nelson', 'Charles Schmieg', 'Charles Spataro', 'Chris Frape', 'Chris Korczak', 'Chris Lowenstein', 'Chris Volk', 'Christian Fassbender', 'Christina Chappell', 'Christison Rare Books', 'Christo Snyman', 'Christopher Maffei', 'Christopher Morrow', 'Christopher Nicklaw', 'Christopher Ridler', 'Chuck Whiting', 'Churchill Book Collector', 'Cindy Black', 'Classic Books and Ephemera', 'Classic Editions', 'Classic First Editions', 'Clausen Books', 'Clearwater Books', 'Cleveland Book Company', 'Collectors Treasury', 'Colleen Croft', 'Complete Traveller Antiquarian Bookstore', 'Cook\'s Bookcase', 'Cox & Budge', 'Craig W. Horle', 'Crossroads Books', 'Crow Hop Rare Books', 'Curtis Waugh', 'Cynthia Davis Buffington', 'Cynthia Ragni', 'D. T. Pendleton', 'D.E. "Betty" Kilner', 'D.E. (Betty) Kilner', 'D.E. Kilner', 'Dale A. Sorenson', 'Dale Sorenson', 'Dan Glaeser Books', 'Daniel Glaeser', 'Dark Hollow Books', 'Daryl Rule', 'David A. Hamilton Americana', 'David C. Purt', 'David Eilenberger', 'David F. Fanning', 'David Hamilton', 'David Miller', 'David Smith', 'David Spilman', 'David Szewczyk', 'David Tobin', 'Deborah & Ron Harcus', 'Deborah and Ron Harcus', 'Deborah Harcus', 'Deborah Thornton Pendleton', 'Dennis & Janet Seekins', 'Dennis Lillie', 'Dennis Ray', 'Denominator Books', 'Derek Lunn', 'Dereks Transport Books', 'Desert Wind Rare Books', 'Diane Black', 'Dianne & Steven Cox', 'Diatrope Books', 'Diversity Books', 'Dividing Line Books', 'Dodman Books', 'DogStar Books', 'Don C. Longmuir', 'Don Nelson', 'Doug Nelson', 'Douglas Clausen', 'Downtown Brown Books', 'Dr Marino Guida', 'Dr. Marino Guida', 'Dromanabooks', 'Duff Murphy', 'Duncan McLaren', 'Dungeness Books', 'Durdles Books', 'E. Ridge Fine Books', 'Early Aeronautica', 'Eclectic Bookworm', 'Ed Hoffman', 'Ed Markiewicz', 'Edgar James', 'Eilenberger Rare Books', 'Elena Serru', 'Elizabeth Kelly - Griswold', 'Elizabeth Kelly-Griswold', 'Elizabeth Svendsen', 'Elk Creek Heritage Books', 'Elk River Books', 'Ellen Saito', 'Ellipsis Rare Books', 'Emerson Richards', 'Eric Kindig', 'Eric Mayer', 'Eric Rasmussen', 'Ernest J. Rodriguez', 'Eternal Return Antiquarian', 'Eva Feheri', 'Evan Miller', 'Evening Land Books', 'Evening Star Books', 'Evolving Lens Bookseller', 'Excelsa Scripta Rare Books', 'Ezra The Bookfinder', 'Ezra Tishman', 'Family Album', 'Fantasy Illustrated', 'Feheri Books', 'Fine Editions Ltd', 'Fireside Angler', 'First Edition Rare Books', 'First Edition too Inc', 'First Place Books', 'Forgotten Lore Bookshop', 'Four Rivers Books', 'Fran Chennells', 'Frances G. Durako', 'Frost Pocket Farm', 'Furrowed Brow Books', 'G. F. Wilkinson Books', 'Gargoyle Books', 'Garrett Scott', 'Garrett Scott, Bookseller', 'Garrison House Books', 'Garrison House Ephemera', 'Gary Wilkie', 'Gayle A. Williamson', 'Gene Alloway', 'Gene Baade', 'Gene W. Baade', 'Genesee Books', 'Geoff Cox', 'Geoff Klass', 'Geoffrey A. Goers', 'Geoffrey Goers', 'Geoffrey\'s Rare Books', 'George Cross', 'George F. Wilkinson', 'GIBBS BOOKS', 'Granada Bookstore', 'Grayshelf Books', 'Grendel Books', 'Gwen Bartlett', 'H.A.S. Beane Books', 'Haaswurth Books', 'Haec City', 'Hanselled Books', 'Hard to Find Books', 'Hardy Books', 'Harropian Books', 'Haunted Bookshop', 'HCBOOKS', 'Henniker Book Farm and Gifts', 'Herland Books', 'Hermitage Bookshop', 'Hinchbooks', 'Hoffman Books', 'Holly Chaffee', 'Howard Prouty', 'Hugo Rijpma', 'Ian Colle', 'Ian Morley', 'Ian Powell', 'Inklings & Yarnspinners', 'InkQ Rare Books', 'Irving Book Company', 'Ivy Ridge Books', 'J & J Lubrano Music Antiquarians', 'J Wesley Baker', 'J. Lawton Booksellers', 'J. Patrick McGahern Books', 'Jack Salling', 'Jake Jeffers', 'James Evans', 'James Lawton', 'James Sarantidis', 'James South', 'Jamie Hale', 'Janet Berns', 'Janet Green', 'Jason Burley', 'Jason Hibbitt', 'Jason Nairn', 'Jason Rosenfeld', 'Jay Nelson', 'Jay W. Nelson', 'Jeff Meave', 'Jeff Mezzocchi', 'Jeffrey N. Coopman', 'Jeffrey Rothermel', 'Jeffrey Yalan', 'Jennifer Mercurio', 'Jenny Wren Books', 'Jeremy Moberg-Sarver', 'Jessica Mulley', 'Jim and Mina Stachow', 'Jo Ann Hakola', 'Joanne Weiss', 'Joe Hix', 'Joe Luttrell', 'Joe van de Weghe', 'John Atkins', 'John F. Kuenzig', 'John Hardy', 'John Hinchliffe', 'John Howell', 'John Leger', 'John Lubrano', 'John Lynch', 'John P. Rozier', 'John Phillips', 'John Sweeney', 'John Thomson', 'John Windle', 'Jon S. Richardson', 'Jonathan David Smalter', 'Jonathon Ward', 'Joseph Perlman', 'Josh Niesse and Megan Bell', 'Jusara Book Shop', 'Justin Escudier', 'Justin Woolley', 'Kaaterskill Books', 'Karen Cinquemani', 'Karen F. Austin', 'Karin Bergsagel', 'Karol Krysik', 'Kate Mitas', 'Kathlyn Stewart', 'Kathy Judge', 'Katie Zondlo', 'Kayleighbug Books', 'Keener Books & Collectibles', 'Keith Botelho', 'Keith Preston', 'Kelmscott Bookshop', 'Ken Amos', 'Ken Lopez', 'Ken Palko', 'Ken Sanders', 'Kenneth Gloss', 'Kenneth Karmiole', 'Kenneth Varane', 'Kenny Parolini', 'Kernoozers Ltd', 'Kevin Johnson', 'Kevin Kinley', 'Kevin Sell', 'Khalkedon Rare Books', 'Kim Blaker', 'Kim Herrick', 'Knowledge Legacy Bookstore', 'Kolbe & Fanning Numismatic Booksellers', 'Kristaps Laucis', 'Kristina Intinarelli', 'Kristina Sparrow', 'Kruger of Hawaii', 'Kubik Fine Books Ltd', 'Kuenzig Books', 'Lacey Brown', 'Langdon Manor Books', 'Larry O\'Shaughnessy', 'Larry Rakow', 'Laura Bodon-Campbell', 'Laura L. Bodon-Campbell', 'Laurelle Swan', 'Laurie M. Wolfe', 'Lawrence Ewing', 'Lawrence Hammar', 'Lawrence Pruner', 'Le Bookiniste', 'Leaf and Stone Books', 'Lee and Ivye Johnson', 'Lee Linn', 'Leonard Shoup', 'Leslie Arthur', 'Leslie Nelson', 'Lewis Buckingham', 'Lewis Cohen', 'Liam McGahern', 'Liberty Book Store', 'Librairie Axel Benadi', 'Librakons Rare Books', 'LIBRARIANA', 'Linda and Micky West', 'Lindsay Christison', 'Lion\'s End', 'Literary Cat Books', 'Liz Pollock', 'Logos Books', 'Lord Durham Rare Books', 'Lorna Quorn', 'Lorne Bair', 'Lost Paddle Books', 'Louisa Clarke', 'Lynne and Jim Owens', 'Lys Weiss, PhD', 'M Mazzullo Bookseller', 'M. Callen', 'M. L. Granlund', 'M.A.D. House Artists', 'Madoc Books', 'Maggie Gammon', 'Maggie Mazzullo', 'Marc Beaudin', 'Marc C. Williams', 'Marc Kuritz', 'Mare Booksellers', 'Mark Benjamin', 'Mark Funke', 'Mark Meynell', 'Mark My Words', 'Marko Milovanovic', 'Marvin Granlund', 'Marvin McIntyre', 'Mary Carney', 'Mary E. Storbeck', 'Mary Norman', 'Matthew Caywood', 'Matthew Kollmer', 'Matthew Mina', 'McBride Rare Books', 'McInBooks', 'McLin Haven Books', 'Medium Rare Books', 'Memento Mori Fine and Rare Books', 'Mercurio Books, Maps, and Prints', 'Meyer Boswell Books, Inc.', 'Michael and David Wehmeyer', 'Michael Bathrick', 'Michael Brenner', 'Michael Muilenberg', 'Michael Mulcahy', 'Michael Piper', 'Michael Popek', 'Michael Pyron', 'Michael Slosberg', 'Michael Stratton', 'Michael Tuck', 'Michael Utt', 'Michael Watson', 'Michelle Y. Barron', 'Mill Race Books', 'Miranda Culp', 'Mirth A. Deshler', 'Mirth Deshler', 'Mobilis Books', 'Moira Horowitz', 'Montgomery Rare Books', 'Moroccobound Fine Books', 'Mosher Books', 'Mostly Useful Fictions', 'Motte & Bailey Booksellers', 'Mozart Books Ltd.', 'Mustafa C. Ekber', 'Nat DesMarais Rare Books', 'Nathan Barker', 'Nathaniel Des Marais', 'Nelson & Nelson, Booksellers', 'Nelson EH Reid', 'Nelson Rare Books', 'Neville Brackenreg', 'Nialle Sylvan', 'Nick Bikoff', 'Nickolaus Bikoff', 'Nightshade Booksellers', 'Noctua Books', 'Norman Graubart', 'Nothing Like A Good Book', 'Oasis Books', 'Object Relations', 'Oddfellow\'s Fine Books', 'Old Saratoga Books', 'Orchid Books', 'Orchid Press', 'Owen Kubik', 'Pages of Boston', 'Patricia Martinak', 'Patrick Hansma', 'Patrick Kutcher', 'Patrick M. Elliott', 'Patrick Olson', 'Patrick Olson Rare Books', 'Patrick\'s Rare Books', 'Paul Barker', 'Paul Johnson', 'Paul Johnson Fine Books', 'Paul Knust', 'Paul Purman', 'Paul Shelley', 'Paul T. Libassi', 'Pauline Hammerbeck', 'Penny Van Kirk', 'Peter Dast', 'Peter Gambitsky', 'Peter Jones', 'Peter L. Stern & Co.', 'Peter Margenat', 'Peter Stern', 'Peter Tafuri', 'Phil Coleman', 'Phil Keener', 'Philadelphia Rare Books & Manuscripts Co.', 'Philip R. Bishop', 'Phillip Atkinson', 'Pieter van Woerkom', 'Pilgrim Reader Books', 'Pistil Books Online', 'PJK Books and Such Inc.', 'Poet\'s Pulpit', 'Poor Man\'s Books', 'Popeks Books', 'Post Horizon Booksellers', 'Posthoc Books', 'Powellbooksofsomerset', 'PRB&M', 'Precious Cache', 'Prestonshire Books', 'Quaint Book Shop', 'Quercus Books', 'Quiet Friends', 'Quill & Brush', 'Rachel Jagareski', 'Rachel Weinstein', 'Rare Book Sleuth', 'Rare Books Honolulu', 'Rare Collections', 'RareNonFiction.com', 'Ravenroost Books', 'ReadInk', 'Renee Magriel Roberts', 'Revere Books', 'Rhett Moran', 'Richard Bishop', 'Richard Bliss', 'Richard Erdmann', 'Richard G. Oates', 'Richardson Books', 'Rick Markell', 'Ridge Books', 'Riverwash Books', 'RJM Autographs and Antiques', 'Robert Chevalier', 'Robert D. Haines Jr.', 'Robert Evans', 'Robert Haines', 'Robert Metcalfe', 'Robert Minnocci', 'Robert Portwood', 'Robert Snyder', 'Robert Stenzel', 'Robert Whiteley', 'Robert\'s Bookshop', 'Robin Bridges', 'Robinson Street Books', 'Rodney Cooling', 'Roger Grimes', 'Ron Ramswick', 'Ron Ramswick Books', 'Ronald Lieberman', 'Rosario Beach Rare Books', 'Rose Books & Obscurities', 'Rose\'s Books', 'Ross Petras', 'Royal Books, Inc.', 'Ryan Petersen', 'S Shulman', 'Sage Rare & Collectible Books', 'Salopian Books', 'Sandra Hoekstra', 'Sandra L. Hoekstra', 'Sandra Lynch', 'Sanjar Farzaneh', 'Sara Armstrong', 'Scene of the Crime Books', 'Scorpio Books', 'Scott Brown', 'Scott Burns', 'Scott Cranin', 'Second Wind Books', 'Sephora di Elena Serru', 'Sephora Libri', 'Sequitur Books', 'Serendipitous Ink', 'Shane Taylor', 'Sharon Heimann', 'Shawn Purcell', 'Shelley and Son Books', 'Shep Iiams', 'Sherry Bruning', 'Sigedon LTD', 'SK Books', 'Sparrow\'s Bookshop', 'Squid Ink Books', 'Stan Korwin', 'Stan Shelley', 'Stanley Louis Remarkable Books', 'Stefan Baer', 'Stefan Kruger', 'Stephen A. Johnson', 'Stephen Clauser', 'Stephen Johnson', 'Stephen M. Clauser', 'Stephen Michael Clauser', 'Stephen Parker', 'Stephen Wurth', 'Steven de Joode', 'Steven Ericson', 'Stewart Klyne', 'Storbeck\'s', 'Structure, Verses, Agency Books', 'Stuart & Mary Manley', 'Stuart Manley', 'Summerhill Curiosities Inc.', 'Susan Eggleton', 'Susan Pav', 'Susan Walker', 'Susan White', 'Sutton Books', 'Suzanne Mantell', 'Swan\'s Fine Books', 'Sylvia Petras', 'Tarrington Books', 'Tavistock Books', 'Taylor Posey', 'TBCL', 'Ted Twyman', 'Teri Osborn', 'Terrence Gibbs', 'Tess Kindig', 'That Guy With The Books', 'The Avocado Pit', 'The Book Block', 'The Book Collector, Inc', 'The Book Faerie', 'The Book House', 'The Book Lair', 'The Usual Suspects', 'Theodore Jablonski', 'Third Floor Rare Books', 'Thomas A. Lyons', 'Thomas Davidson', 'Thomas Kullgren', 'Thomas Lyons', 'Thorn Books', 'Thorne Donnelley', 'Tim White', 'Timbuktu Books', 'Timothy Brancamp', 'Timothy Doyle', 'Tolkien Bookshelf', 'Tom and Heidi Congalton', 'Tom Congalton', 'Tom Davidson - Bookseller', 'Travis Metheny', 'Treasure & Relish', 'Treasured Books UK', 'Treasures & Goods', 'Trianglehead Books', 'Trillium Antiquarian Books', 'True Oak Books', 'Ulysses Books, Michael L. Muilenberg, Bookseller', 'Under The Covers Antique And Vintage Books', 'Underground Books', 'Valley Books', 'Vandello Books', 'Vanessa Parker', 'Vanessa Parker Rare Books', 'Veery Books', 'Vic Zoschak', 'Viceroy Books', 'Victor Vaivads', 'Volk & Iiams', 'Walden Books', 'Walkabout Books', 'Walker Bookstore', 'Walnut Street Paper', 'Warwick Books', 'Warwick Sven Jordan', 'Waugh Books', 'Wayside Books', 'Weinstein & Daughters Rare Books', 'Well-Stacked Books', 'Wendy Happel', 'Werlie Hendrix', 'Weysprings Books', 'White Eagle Books', 'Whiting Books', 'Wickham Books South', 'William Chrisant', 'William Chrisant & Sons\' Old Florida Book Shop', 'William Kemps', 'William R. Van Nest', 'William Wickham', 'Willy Stastny', 'WisdenShop.Com', 'Wise Street Books', 'Wonderful Books of Oz', 'Wonderland Books', 'Yarran Jenkins', 'Yarran L. Jenkins', 'Yesterday\'s Book Shop', 'Yesterday\'s Muse Books', 'Yoonjeong Lee', 'Yvonne Langenberg', 'Zachary Mooney', 'Zephyr Books', 'Zephyrus Books', 'ZH BOOKS', 'Zhenya Dzhavgova', 'Zubairul Islam'];

	function fixWord(word) {
		return word.replace(/&/g, '(?:&|and)').replace(/’|`/g, '(?:\'|’|`)').replace(/'/g, '(?:\'|’|`)').replace(/[\s-_]/g, '[\\s-_]*');
	}
	const fixedbookjackers = baddudes.map(fixWord);
	const fixedcooldudes = cooldudes.map(fixWord);
	const badList = new RegExp('(' + fixedbookjackers.join('|') + ')', 'gi');
	const coolList = new RegExp('(' + fixedcooldudes.join('|') + ')', 'gi');

	function highlightText(node) {
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
				highlightText(node.childNodes[i]);
			}
		}
	}

	function highlightPage() {
		highlightText(document.body);
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
		notification.innerText = 'Sellers Highlighted';
		document.body.appendChild(notification);
		setTimeout(() => {
			notification.style.transition = 'opacity 2s';
			notification.style.opacity = '0';
			setTimeout(() => {
				notification.remove();
			}, 2000);
		}, 2000);
	}
	setTimeout(highlightPage, 5000); // 5-second delay in milliseconds, adjust to taste.
})();
