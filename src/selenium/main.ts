import { getArizonaWeatherFromGoogle } from "./libs";
import { echoError } from "./../libs/command";

// sample
getArizonaWeatherFromGoogle().catch(echoError);
