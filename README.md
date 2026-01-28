This is a simple userscript which merely uses a list of the names of common sellers on Abebooks known to the community as "bookjackers" to highlight the names in red to make them more visible, and to remind you to be wary. It also highlights members of the IOBA in green, I may add AABA to the list too I just found IOBA's database easier to navigate so it took less time, it'd probably be easier if there was an API somewhere to talk to to get names but that's probably asking too much.

Works on:

* AbeBooks
* Ebay
* Amazon
* Biblio
* Bookshop (Which isn't really necessary but it was requested)
* ViaLibri

### What is a "Bookjacker" and why do I care?
A bookjacker is an online seller who lists books for sale that they don't actually have. They usually profess higher qualities, they might even outright lie about the edition you'll get, and they're not to be trusted under any circumstances. In truth, they *can't* guarantee the quality or accuracy of their listings. They list books for sale that they don't have, then when you buy the book from them, they will order the book from another seller to deliver to you. This is, as it happens, against the Abebooks terms of service, but Amazon doesn't care.

A more in-depth explanation can be read here:

https://www.zubalbooks.com/article-bookjacking.jsp

The only thing you can do is be aware, and that's why I made this. Originally it was for myself, but I saw a few posts on Reddit and decided I'd chuck it up here, which should go some way towards explaining some eccentricities in the script.

### How to use
Simply install [Tampermonkey](https://www.tampermonkey.net/) or a similar extension and install the userscript.

https://github.com/DoctorFudge/Bookjackers/releases/download/v1.5/Bookjackers-1.5.user.js

On visiting one of the relevant websites, the script will attempt to read the sellers.json file in this github, and prompt you to allow the cross-domain reference. It's just a text file containing json-formatted lists of seller names, and does nothing nefarious.
