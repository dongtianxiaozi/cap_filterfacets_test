// libraries
const moment = require('moment')
const { retrieveJwt } = require('@sap-cloud-sdk/core')

// exports
module.exports = {

    addDays : function (date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;      
    },

    formatDateToABAPTimestamp : function (date) {
        return moment(date).format("YYYYMMDDhhmmss")
        //return date.replace(/T/, '').replace(/\..+/, '').replace(/-/gi, '').replace(/:/gi, '')
    },

    formatABAPTimestampToDate : function (timestamp) {
        return moment(timestamp,"YYYYMMDDhhmmss").toDate();
    },
    
    getUserEmailFromReq: function(req){
    /*
    version for cds 3.x 
    return ( for cloud || for local )
    return (typeof req.user.emails === 'undefined' ? false : req.user.emails[0].value) || (typeof req.user.attr.email === 'undefined' ? false : req.user.attr.email) || 'anonymous'         
    */      
    // return ( local execution || cloud execution )
    return (typeof req.user.attr.email === 'undefined' ? false : req.user.attr.email) || (req.user.id) || 'anonymous'         
    },



    getCallerTenant: function(req){
    return req.user.tenant || req.user.attr.tenant;  //second argument is for local development
    },

    getToken: function(req){
    return retrieveJwt(req._.req)
    }
}