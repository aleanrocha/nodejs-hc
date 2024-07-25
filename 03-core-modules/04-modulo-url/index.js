const Url = require('url')
const address = 'https://www.meusite.com/catalog?produtos=cadeira'
const parseURL = new Url.URL(address)

console.log('Host => ', parseURL.host)
console.log('Href => ', parseURL.href)
console.log('Origin => ', parseURL.origin)
console.log('Pathname => ', parseURL.pathname)
console.log('Protocol => ', parseURL.protocol)
console.log('Search => ', parseURL.search)
console.log('SearchParams => ', parseURL.searchParams)
console.log('SearchParams get => ', parseURL.searchParams.get('produtos'))


