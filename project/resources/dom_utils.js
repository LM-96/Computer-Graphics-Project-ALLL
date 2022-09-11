function DomElementUtils() {

    let _elements = new Object();

    /**
     * Returns the element with the given id by looking for it into the loaded
     * elements. If the element has not been previously loaded, this function try
     * to retrieve it. If the DOM has been changed, this function tries to reload the
     * element automatically.
     * @param {string} id the id of the element
     * @returns the loaded element or null if no element has the required id
     */
    this.getElementById = (id) => {
        let element = _elements[id];
        if(element == null || element == undefined) {
            element = this.loadElementById(id);
        }

        return element;
    }

    /**
     * Returns the element with the given id if previously loaded
     * @param {string} id the id of the element to retrieve
     * @returns the element to retrieve of undefined if no element has the
     * required id
     */
    this.retrieveElementById = (id) => {
        return _elements[id];
    }

    /**
     * Loads the element with the given id into this manager by calling the 'document.getElemementById'
     * function. If the element has already been loaded, this call override the previous element
     * @param {string} id the id of the element to load
     * @returns the loaded element or 'null' if no element with the given id is found
     */
    this.loadElementById = (id) => {
        let element = document.getElementById(id);
        if(element != null) {
            _elements[id] = element;
        }
        return element;
    }
 
    /**
     * Appends the text passed as param to the 'innerHTML' of the element with the
     * given id
     * @param {string} id the id of the element
     * @param {string} html the text to be added via 'innerHTML' function
     */
    this.appendHtmlTo = (id, html) => {
        _elements[id].innerHTML += html;
        reloadElements();
    }

    /**
     * Sets the value of the element with the given id that is loaded into this
     * manager
     * @param {string} id the id of the element
     * @param {string} value the value to be set
     */
    this.setValueOf = (id, value) => {
        _elements[id].value = value;
    }

    /**
     * Sets the attribute of the element with the given id that is loaded into
     * this manager to the value passed as parameter
     * @param {string} id the id of the element
     * @param {string} attribute the name of the attribute
     * @param {*} value 
     */
    this.setAttributeOf = (id, attribute, value) => {
        _elements[id][attribute] = value;
    }

    /**
     * Sets the 'innerHTML' of the element with the given id
     * @param {string} id the id of the element
     * @param {string} html the text to be added via 'innerHTML' function
     */
    this.setHtmlOf = (id, html) => {
        _elements[id].innerHTML = html;
        reloadElements();
    }

    /**
     * Reloads all the element saved into this manager
     */
    this.reloadElements = () => {
        for(const id of _elements) {
            _elements[id] = document.getElementById(id);
        }
    }
}

/**
 * Creates a new DomElementUtils and load the elements with the given ids
 * @param  {...any} ids the ids of the elements to load
 * @returns a new DomElementUtils with the loaded elements specified
 * by the ids passed as parameters
 */
DomElementUtils.withLoadedElements = function(...ids) {
    let domElementUtils = new DomElementUtils();
    for(const id of ids) {
        domElementUtils.loadElementById(id);
    }

    return domElementUtils;
}