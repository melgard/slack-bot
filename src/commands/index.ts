import {setDate, setURL} from "./webinar";


export function getCommand(commandName: string): any{
  if(!commandName){
    return null;
  }
  let command;
  switch (commandName) {
    case '/webinar/set-date':
      command = setDate;
      break;
    case '/webinar/set-url':
      command = setURL;
      break;
  }
  return command;
}
