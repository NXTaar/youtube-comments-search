const mapping = require('config').get('mapping')

const _get = require('lodash.get')

let collectionRegex = new RegExp(mapping.collectionRegex, 'g')

const parse = (scheme, target) => Object.keys(scheme).reduce((res, address) => {
    let responseValue = _get(target, address)
    res = {
        ...res,
        [scheme[address]]: responseValue
    }
    return res
}, {})

const mapResponse = schemeType => {
    let scheme = mapping[schemeType]

    let initState = {
        collection: {},
        single: {}
    }

    let parsingScheme = Object.keys(scheme).reduce((res, resultPropName) => {
        let apiPath = scheme[resultPropName]
        let type = collectionRegex.test(apiPath) ? 'collection' : 'single'
        let getString = {
            'collection': () => apiPath.replace(collectionRegex, '').split('/').join('.'),
            'single': () => apiPath.split('/').join('.')
        }
        res[type] = {
            ...res[type],
            [getString[type]()]: resultPropName
        }
        return res
    }, initState)

    return response => {
        let { single, collection } = parsingScheme
        let singleProps = parse(single, response)
        let items = response.items.map(item => parse(collection, item))
        return {
            ...singleProps,
            items
        }
    }
}

module.exports = mapResponse

