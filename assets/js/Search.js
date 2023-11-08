/********************************************************************************************
 * 
 * MIT License
 * 
 * Copyright (c) 2020 Raghuveer S
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 * 
 * File: Search.js
 * Author: Raghuveer S
 * 
 * Preface: I take loads of inspiration from just-the-docs to implement this.
 * This can be easily ported to suit your needs. There is very little project specific stuff
 * in this.
 * 
 * How to customize this for your own project:
 * --------------------------------------------
 * 1. Lunr takes json fields for indexing, so create a json file with all the fields
 *      you want searched by Lunr. For eg. In my case, it is title, content, url for my 
 *      blog posts.
 *      Note: In this project, the json gets automatically generated. (SEE: search-data.json)
 * 2. Change the field names below accordingly. (SEE: this.field)
 * 3. Create a HTML Page with an input box(with id='search-input') and a div beneath it
 *     with id='search-results'. Also, don't forget to embed this script using the script
 *     tag.
 * 4. You are good to go. If you need additional customization you can change the boost 
 *      values, layout, colors etc by tinkering with the correponding parts of the code.
 *********************************************************************************************/

(function (sj) {
    "use strict";

    sj.addEvent = function(el, type, handler) {
        if (el.attachEvent) el.attachEvent('on'+type, handler); else el.addEventListener(type, handler);
    }
    sj.removeEvent = function(el, type, handler) {
        if (el.detachEvent) el.detachEvent('on'+type, handler); else el.removeEventListener(type, handler);
    }

    // Simplify document ready
    sj.onReady = function(ready) {
        if (document.readyState !== 'loading') {
            ready();
        } else {
            document.addEventListener('DOMContentLoaded', ready);
        }
    }

    // Async function to fetch and parse JSON data
    async function getSearchData(dataUrl) {
        const response = await fetch(dataUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    }

    // Create and show search results
    function createSearchResults(docs, results) {
        const searchResults = document.getElementById('search-results');
        searchResults.innerHTML = ''; // Clear current results
        if (results.length === 0) {
            searchResults.innerText = 'No results found';
            return;
        }
        // Create results document fragment
        const resultsFragment = document.createDocumentFragment();
        // ... construct each result's DOM and append to resultsFragment ...
        searchResults.appendChild(resultsFragment);
    }

    // Initialize search functionality
    async function searchInit() {
        try {
            const dataUrl = "/SearchData.json";
            const docs = await getSearchData(dataUrl);

            // Create the search index
            const index = new FlexSearch({
                tokenize: "forward",
                doc: {
                    id: "id",
                    field: ["title", "content", "url"]
                }
            });

            index.add(docs);

            const searchInput = document.getElementById('search-input');

            // Event listener for input
            searchInput.addEventListener('input', () => {
                // console.log('Input event triggered'); // 确认事件是否被触发
                const input = searchInput.value;
                // console.log('Current input:', input); // 显示当前输入的值
                if (input === '') {
                    // Hide search if input is empty
                    document.documentElement.classList.remove('search-active');
                } else {
                    // Show search otherwise
                    document.documentElement.classList.add('search-active');
                    const results = index.search(input); // Perform search
                    createSearchResults(docs, results); // Display results
                }
            });

            // Other event listeners here...
            
        } catch (error) {
            console.error("Error initializing search: ", error);
        }
    }

    // Document ready
    sj.onReady(searchInit);

})(window.sj = window.sj || {});
