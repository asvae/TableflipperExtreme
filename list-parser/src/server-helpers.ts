export const sendDeckToServer = (path: string): Promise<void> => {
  const { exec } = require('child_process');

  let resolve
  let reject
  const command = `scp -i /mnt/c/Users/Asva/asva_do_id_rsa -r ${path}/*.jpg root@178.62.215.76:/var/www/html/mtg`
  exec(command, (err, stdout, stderr) => {
    if (err) {
      //some err occurred
      reject(err)
    } else {
      // the *entire* stdout and stderr (buffered)
      resolve(`stdout: ${stdout} \n stderr: ${stderr}`);
    }
  });

  return new Promise((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })
}

export const sendDeckToGameFiles = (path: string, title): Promise<void> => {
  const { exec } = require('child_process');

  let resolve
  let reject
  const TTS_PATH = '/mnt/c/Users/Asva/Documents/My Games/Tabletop Simulator/Saves/Saved Objects/Generated/'

  const command = `cp "${path}/${title}.json" "${TTS_PATH}"`
  exec(command, (err, stdout, stderr) => {
    if (err) {
      //some err occurred
      reject(err)
    } else {
      // the *entire* stdout and stderr (buffered)
      resolve(`stdout: ${stdout} \n stderr: ${stderr}`);
    }
  });

  return new Promise((_resolve, _reject) => {
    resolve = _resolve
    reject = _reject
  })
}
