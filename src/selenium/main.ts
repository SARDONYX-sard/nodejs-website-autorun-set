import { getArizonaWeatherFromGoogle } from "./utils";
import { echoError } from "../helper/command";

// sample
getArizonaWeatherFromGoogle().catch(echoError);
