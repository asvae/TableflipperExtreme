import { Deck } from './types'
import * as fs from 'fs'

export const generateTTSDecks = (deck: Deck): Promise<void> => {
  const filePath = `${__dirname}/../results/${deck.title}.txt`
  fs.writeFileSync(filePath, deck.cardSets.map(c => c.join(' ')).join('\n'))

  const { exec } = require('child_process');

  let resolve
  let reject
  exec(`python3 ${__dirname}/../../flipper.py -n="packs/jmp/${deck.title}" --hires --reprint --basic=core --hostUrl=http://local.asva.by:8080 "${filePath}"`, (err, stdout, stderr) => {
    if (err) {
      //some err occurred
      reject(err)
    } else {
      // the *entire* stdout and stderr (buffered)
      resolve(`stdout: ${stdout} \n stderr: ${stderr}`);
    }

    fs.unlinkSync(filePath)
  });

  return new Promise((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })
}
