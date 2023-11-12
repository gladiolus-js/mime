/**
 * Find mime type of file by filename
 */
function findMime(filename: string): string | null
/**
 * Find mime type of file by begin bytes
 */
function findMime(beginBytes: number[]): string | null
/**
 * Find mime type of file by filename or begin bytes.
 */
function findMime(filename: string, beginBytes: number[]): string | null
/**
 * Try to find the mime-type of file, if failed, return null.
 */
function findMime(filenameOrBeginBytes: string | number[], beginBytes?: number[]): string | null {
    if(typeof filenameOrBeginBytes === 'string') {
        // use begin bytes first, then filename if any
        // TODO
    } else {
        // use begin bytes
        // TODO
    }
}

export {
    findMime
}