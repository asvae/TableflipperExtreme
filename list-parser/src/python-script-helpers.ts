import { Deck } from './types'
import * as fs from 'fs'

export const generateTTSDecks = async (deck: Deck): Promise<string> => {
  const inputPath = `${__dirname}/../results/${deck.title}.txt`
  const outputPath = `${__dirname}/../tmp/decks/${deck.title}`

  if (!fs.existsSync(outputPath)){
    fs.mkdirSync(outputPath);
  }

  // Create temporary file for python script to work with
  fs.writeFileSync(inputPath, deck.cardSets.map(c => c.join(' ')).join('\n'))

  const { exec } = require('child_process');

  let resolve
  let reject
  exec(`python3 ${__dirname}/../../flipper.py -n="${deck.title}" -o="${outputPath}" --hires --reprint --ignoreMissing --basic=core --hostUrl=http://mtg.sub.asva.by "${inputPath}"`, (err, stdout, stderr) => {
    if (err) {
      //some err occurred
      reject(err)
    } else {
      // the *entire* stdout and stderr (buffered)
      // resolve(`stdout: ${stdout} \n stderr: ${stderr}`);
      resolve(outputPath);
    }
    // Delete temporary file
    fs.unlinkSync(inputPath)
  });

  return new Promise((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })
}
