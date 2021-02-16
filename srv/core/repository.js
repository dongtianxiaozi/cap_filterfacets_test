// libraries

// exports
module.exports = {

    /**
     * addSortingBeforeReadEntityOperations.
     *
     * We add the 'order by' clause depending on an entity value (for test purposes).
     *
     * @since      1.0.0
     * @access     private
     */
    addSortingBeforeReadEntityOperations: function (req) {

        const { where } = req.query.SELECT

        if (!where) return

        const workCenterID = this.getFilterValueFromIncomingRequest(where, 'toWorkCenter_ID')

        // Tenemos el ID del centro de coste por el que hemos filtrado, ahora iriamos a buscar
        // el criterio de ordenación para ese centro de coste

        // Y finalmente aplicariamos el filtro, deseado, por ejemplo, por operacion
        req.query.SELECT.orderBy[0] = { ref: ['operation'], sort: 'desc' }
    },

    /**
     * getFilterValueFromIncomingRequest.
     *
     * Search for a filter in an incoming request and returns the value.
     *
     * @since      1.0.0
     * @access     private
     * 
     * @param {String} whereClause       Incoming where clause.
     * @param {String} property          Property to search.
     *
     * @return {String} Value of the propoerty provided as parameter.
     */
    getFilterValueFromIncomingRequest: function (whereClause, property) {

        let index = whereClause.findIndex(x => x.ref && x.ref[0] && x.ref[0] === property)

        if (index === -1) return

        index++

        if (whereClause[index] != '=') return

        index++

        return whereClause[index].val
    },

    /**
     * queryIsSortedImplicitly. TODO.
     *
     * Returns true if a query is sorted by the key field.
     *
     * @since      1.0.0
     * @access     private
     * @param {String} query       Incoming query.
     *
     * @return {boolean} Query is sorted by key field.
     */
    queryIsSortedImplicitly: function (query) {
        return true
    }
}


/**
 * Summary. (use period)
 *
 * Description. (use period)
 *
 * @since      x.x.x
 * @deprecated x.x.x Use new_function_name() instead.
 * @access     private
 *
 * @class
 * @augments parent
 * @mixes    mixin
 *
 * @alias    realName
 * @memberof namespace
 *
 * @see  Function/class relied on
 * @link URL
 * @global
 *
 * @fires   eventName
 * @fires   className#eventName
 * @listens event:eventName
 * @listens className~event:eventName
 *
 * @param {type}   var           Description.
 * @param {type}   [var]         Description of optional variable.
 * @param {type}   [var=default] Description of optional variable with default variable.
 * @param {Object} objectVar     Description.
 * @param {type}   objectVar.key Description of a key in the objectVar parameter.
 *
 * @yield {type} Yielded value description.
 *
 * @return {type} Return value description.
 */