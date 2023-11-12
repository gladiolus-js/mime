/**
 * Some types of files can be identified by the first few bytes of the file.
 */
class MimeFeature {
    /**
     * mime string
     */
    readonly mime: string

    /**
     * magic number of this type
     */
    readonly #headBytes: number[]

    /**
     * use filter to focus on the bytes that we care about and ignore the rest
     */
    readonly #filter: Set<number>

    constructor(mime: string, headBytes: number[], filter?: number[]) {
        this.mime = mime
        this.#headBytes = headBytes
        this.#filter = new Set<number>(filter)
    }

    public match(testBytes: number[]): boolean {
        // if the test bytes are shorter than the head bytes, it's not a match
        if(testBytes.length < this.#headBytes.length) {
            return false;
        }

        // if the test bytes are longer than the head bytes, we only care about the first few bytes
        const testLength = this.#headBytes.length

        for (let i = 0; i < testLength; i++) {
            // if the byte is in the filter, we don't care about it
            if(this.#filter.has(i)) continue

            // if the byte doesn't match, it's not a match
            if(this.#headBytes[i] !== testBytes[i]) return false
        }

        // finally it pass the test and it's a match
        return true
    }
}

export {}