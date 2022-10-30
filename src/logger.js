const IS_DEBUGGING = true;
export const log = (title = "", data1 = null, type = "debug") => {
    if (IS_DEBUGGING && type === "debug") {
        console.debug(title, data1);
    }
    if (IS_DEBUGGING && type === "error") {
        console.error(title, data1);
    }
    if (IS_DEBUGGING && type === "info") {
        console.info(title, data1);
    }
};
