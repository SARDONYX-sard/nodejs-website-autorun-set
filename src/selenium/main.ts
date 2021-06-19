import { getDateFromGoogle } from "./libs";
import { echoError } from "./../libs/command";

// sample
getDateFromGoogle().catch(echoError);
