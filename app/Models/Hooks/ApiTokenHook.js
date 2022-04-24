'use strict'

const ApiTokenHook = exports = module.exports = {}
const Hash = use('Hash')

ApiTokenHook.hashToken = async (modelInstance) => {
  if (modelInstance.dirty.key) {
    modelInstance.key = await Hash.make(modelInstance.key)
  }
}
