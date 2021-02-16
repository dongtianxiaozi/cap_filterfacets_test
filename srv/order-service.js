const cds = require('@sap/cds')

// Utilities
const utils = require('./core/utils')
const repo = require('./core/repository')

// entities

module.exports = cds.service.impl((srv) => {

  srv.before('READ', '*', _BeforeReadAnyEntityWriteLogs)

  srv.before('READ', 'Operations', _BeforeReadEntityOperations)

  srv.after('READ', 'Operations', (each)=>{_AfterReadEntityOperations(each)})

})

/**
 * _AfterReadEntityOperations. 
 *
 * Seteo de campos necesarios para la UI.
 *
 * @since      1.0.0
 * @access     private
 *
*/
async function _AfterReadEntityOperations  (each){

    if(typeof each.toOrder_ID !== 'undefined') {
      if(each.toOrder_ID !== null) {
        each.semanticURLtoOrder = `#order-display&/Orders(ID=guid'${each.toOrder_ID}',IsActiveEntity=true)`
      }
      // console.log(each.semanticURLtoAuthor)
    }
}

/**
 * _BeforeReadEntityOperations. 
 *
 * Al hacer un READ sobre la entidad Operations, si filtramos por centro de coste,
 * queremos que la ordenación dependa del tipo de ordenación parametrizada en el centro de coste.
 * Esta función mira si hay filtro por centro de costa y realiza dicha ordenación.
 * Para permitir que en la UI se pueda ordenar según desee el usuario, sólo fijaremos esta
 * ordenación si el filtro que nos llega es el implícito que CAP añade automáticamente, que
 * siempre es por el campo clave.
 *
 * @since      1.0.0
 * @access     private
 *
*/
async function _BeforeReadEntityOperations  (req){

  if ( repo.queryIsSortedImplicitly) 
    repo.addSortingBeforeReadEntityOperations(req)

}

/**
 * _BeforeReadAnyEntityWriteLogs. 
 *
 * Function called before reading an Entity that consoles some information
 *
 * @since      1.0.0
 * @access     private
 *
*/
async function _BeforeReadAnyEntityWriteLogs  (req){
    console.log( 'My token', utils.getToken(req) )
    console.log( 'Is user?', req.user.is("user") )
    console.log( 'Is authenticated?', req.user.is("authenticated") )
}

/**
 * _BeforeReadAnyEntityWriteLogs. 
 *
 * Function called before reading an Entity that consoles some information
 *
 * @since      1.0.0
 * @access     private
 *
*/
async function _BeforeReadAnyEntityWriteLogs  (req){
  console.log( 'My token', utils.getToken(req) )
  console.log( 'Is user?', req.user.is("user") )
  console.log( 'Is authenticated?', req.user.is("authenticated") )
}

