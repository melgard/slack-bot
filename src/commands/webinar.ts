import moment from "moment";
const usersList: Array<string> = [];


export async function setDate(command: string, userId: string, date: string) {
  let response: string = `muy bien! fecha ${date} actualizada :smile:`;
  if (usersList.indexOf(userId) === -1) {
    response = `:thinking_face: parece que no tienes permisos para ejecutar el comando "${command}".`;
    return Promise.resolve(response);
  }
  const fecha = moment(date.split('/').join('-'), 'DD-MM-YYYY', true);
  if ( !fecha || !fecha.isValid() ) {
    response = `:thinking_face: parece que la fecha ingresada no es una fecha válida.`;
    return Promise.resolve(response);
  }
  return Promise.resolve(response);
}

export async function setURL (command: string, userId: string, url: string) {
  const regex = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;
  let response: string = `muy bien! url "${url}" actualizada :smile:`;
  if (usersList.indexOf(userId) === -1) {
    response = `:thinking_face: parece que no tienes permisos para ejecutar el comando "${command}".`;
    return Promise.resolve(response);
  }
  if ( !url || !regex.test(url) ) {
    return Promise.resolve(`:thinking_face: parece que la url ${url} ingresada no es válida.`);
  }
  return Promise.resolve(response);
}
