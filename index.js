#!/usr/bin/env node

import { get_package_command, all_types } from './utils.js'
const type = process.argv[2]?.slice(2)

const main = async () => {
  if (!type || !all_types.includes(type)) {
    console.log('🚨 Not a valid command, available args:')
    all_types.forEach((type) => {
      console.log(`↪  --${type}`)
    })
    process.exit(1)
  }

  const command = await get_package_command(type)
  console.log(command)
}

main().catch((err) => {
  console.log(err)
  process.exit(1)
})
