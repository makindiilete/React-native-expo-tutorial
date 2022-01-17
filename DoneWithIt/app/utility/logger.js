import Bugsnag from "@bugsnag/expo";

export const log = (error) => Bugsnag.notify(error);

export const start = () => Bugsnag.start();
