import { echoError } from "../helper/command";

import { getArizonaWeatherFromGoogle } from "./utils";

// sample
getArizonaWeatherFromGoogle().catch(echoError);
