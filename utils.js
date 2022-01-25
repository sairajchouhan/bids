import fs from 'fs/promises'

export const all_types = ['code', 'install', 'build', 'dev', 'test', 'start']
const packge_manager_identifiers = ['package-lock.json', 'yarn.lock']
const commands = {
  npm: ['_', 'install', 'run build', 'run dev', 'run test', 'run start'],
  yarn: ['_', 'install', 'build', 'dev', 'test', 'start'],
}

export const get_package_manger = async () => {
  const dir_contents = await fs.readdir('./')
  const return_val = []
  packge_manager_identifiers.forEach((manager) => {
    if (dir_contents.includes(manager)) {
      return_val.push(manager)
    }
  })

  if (return_val.length > 1) {
    console.log(
      '🚨 More than one lock files are found which is not recommended'
    )
    console.log('\nFound lock files: ')
    return_val.forEach((managers) => {
      console.log(` ↪  ${managers}`)
    })
    process.exit(1)
  }

  if (return_val[0] === packge_manager_identifiers[0]) return 'npm'
  if (return_val[0] === packge_manager_identifiers[1]) return 'yarn'
  return null
}

export const get_package_command = async (type) => {
  const current_manager = await get_package_manger()
  if (!current_manager) {
    console.log(
      '🚨 No lock files found, try running in a different directory which has lock files'
    )
    process.exit(1)
  }

  if (type === 'code') {
    return `code .`
  }

  const type_index = all_types.indexOf(type)
  return `${current_manager} ${commands[current_manager][type_index]}`
}
