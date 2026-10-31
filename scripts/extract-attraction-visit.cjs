// One-time, reproducible supplement from the already downloaded official dataset.
// Never changes attractions.json or its IDs/slugs.
const fs = require('node:fs')
const path = require('node:path')
const root = path.resolve(__dirname, '..')
const source = require(path.join(root, 'output/attraction-source/AttractionList.json')).Attractions
const attractions = require(path.join(root, 'src/data/attractions.json'))
const byOfficialId = new Map(source.map(item => [item.AttractionID, item]))
const visit = {}
for (const attraction of attractions) {
  const item = byOfficialId.get(attraction.officialId)
  if (!item) throw new Error(`Missing official record: ${attraction.officialId}`)
  const address = item.PostalAddress
  const fullAddress = address?.StreetAddress
    ? [address.City, address.Town, address.StreetAddress].filter(Boolean).join('')
    : undefined
  const officialWebsite = typeof item.WebsiteURL === 'string' && /^https:\/\//.test(item.WebsiteURL)
    ? item.WebsiteURL : undefined
  if (fullAddress || officialWebsite) visit[attraction.id] = {
    ...(fullAddress ? { address: fullAddress } : {}),
    ...(officialWebsite ? { officialWebsite } : {}),
  }
}
fs.writeFileSync(path.join(root, 'src/data/attraction-visit.json'), JSON.stringify(visit, null, 2) + '\n')
console.log(`Wrote ${Object.keys(visit).length} visit records; ${Object.values(visit).filter(item => item.address).length} addresses.`)
