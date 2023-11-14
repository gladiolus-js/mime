/**
 * Some types of files can be identified by the first few bytes of the file.
 */
class MimeBeginBytes {
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

const magicSet: Set<MimeBeginBytes> = new Set<MimeBeginBytes>([
    /// AIFF is based on the EA IFF 85 Standard for Interchange Format Files.
    /// -> 4 bytes have the ASCII characters 'F' 'O' 'R' 'M'
    /// -> 4 bytes indicating the size of the file
    /// -> 4 bytes have the ASCII characters 'A' 'I' 'F' 'F'
    new MimeBeginBytes('audio/x-aiff', [ 0x46, 0x4F, 0x52, 0x4D, 0x00, 0x00, 0x00, 0x00, 0x41, 0x49, 0x46, 0x46 ], [ 4, 5, 6, 7 ]),

    /// -> 4 bytes have the ASCII characters 'f' 'L' 'a' 'C'.
    new MimeBeginBytes('audio/x-flac', [ 0x66, 0x4C, 0x61, 0x43 ]),

    /// The WAVE file format is based on the RIFF document format.
    /// -> 4 bytes have the ASCII characters 'R' 'I' 'F' 'F'
    /// -> 4 bytes indicating the size of the file
    /// -> 4 bytes have the ASCII characters 'W' 'A' 'V' 'E'
    new MimeBeginBytes('audio/x-wav', [ 0x52, 0x49, 0x46, 0x46, 0x00, 0x00, 0x00, 0x00, 0x57, 0x41, 0x56, 0x45 ], [ 4, 5, 6, 7 ]),

    /// -> 3 bytes of 0x00
    /// -> 1 bytes not care
    /// -> 4 bytes have the ASCII characters 'f' 't' 'y' 'p'
    /// -> 4 bytes have the ASCII characters '3' 'g' 'p' '5'
    new MimeBeginBytes('video/3gpp', [ 0x00, 0x00, 0x00, 0x00, 0x66, 0x74, 0x79, 0x70, 0x33, 0x67, 0x70, 0x35 ], [ 3 ]),

    /// -> 4 bytes not care
    /// -> 4 bytes have the ASCII characters 'f' 't' 'y' 'p'
    /// -> 4 bytes have the ASCII characters 'a' 'v' 'c' '1'
    new MimeBeginBytes('video/mp4', [ 0x00, 0x00, 0x00, 0x00, 0x66, 0x74, 0x79, 0x70, 0x61, 0x76, 0x63, 0x31 ], [ 0, 1, 2, 3 ]),

    /// -> 4 bytes not care
    /// -> 4 bytes have the ASCII characters 'f' 't' 'y' 'p'
    /// -> 4 bytes have the ASCII characters 'i' 's' 'o' '2'
    new MimeBeginBytes('video/mp4', [ 0x00, 0x00, 0x00, 0x00, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6F, 0x32 ], [ 0, 1, 2, 3 ]),

    /// -> 4 bytes not care
    /// -> 4 bytes have the ASCII characters 'f' 't' 'y' 'p'
    /// -> 4 bytes have the ASCII characters 'i' 's' 'o' 'm'.
    new MimeBeginBytes('video/mp4', [ 0x00, 0x00, 0x00, 0x00, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6F, 0x6D ], [ 0, 1, 2, 3 ]),

    /// -> 4 bytes not care
    /// -> 4 bytes have the ASCII characters 'f' 't' 'y' 'p'
    /// -> 4 bytes have the ASCII characters 'm' 'p' '4' '1'.
    new MimeBeginBytes('video/mp4', [ 0x00, 0x00, 0x00, 0x00, 0x66, 0x74, 0x79, 0x70, 0x6D, 0x70, 0x34, 0x31 ], [ 0, 1, 2, 3 ]),

    /// -> 4 bytes not care
    /// -> 4 bytes have the ASCII characters 'f' 't' 'y' 'p'
    /// -> 4 bytes have the ASCII characters 'm' 'p' '4' '2'.
    new MimeBeginBytes('video/mp4', [ 0x00, 0x00, 0x00, 0x00, 0x66, 0x74, 0x79, 0x70, 0x6D, 0x70, 0x34, 0x32 ], [ 0, 1, 2, 3 ]),

    /// The WebP file format is based on the RIFF document format.
    /// -> 4 bytes have the ASCII characters 'R' 'I' 'F' 'F'.
    /// -> 4 bytes indicating the size of the file
    /// -> 4 bytes have the ASCII characters 'W' 'E' 'B' 'P'.
    new MimeBeginBytes('image/webp', [ 0x52, 0x49, 0x46, 0x46, 0x00, 0x00, 0x00, 0x00, 0x57, 0x45, 0x42, 0x50 ], [ 4, 5, 6, 7 ]),

    // ========== ========== ========== ========== ==========
    // ========== ========== separator ========== ==========
    // ========== ========== ========== ========== ==========

    new MimeBeginBytes('application/pdf', [ 0x25, 0x50, 0x44, 0x46 ]),
    new MimeBeginBytes('application/postscript', [ 0x25, 0x51 ]),
    new MimeBeginBytes('audio/aac', [ 0xFF, 0xF1 ]),
    new MimeBeginBytes('audio/aac', [ 0xFF, 0xF9 ]),
    new MimeBeginBytes('audio/weba', [ 0x1A, 0x45, 0xDF, 0xA3 ]),
    new MimeBeginBytes('audio/mpeg', [ 0x49, 0x44, 0x33 ]),
    new MimeBeginBytes('audio/mpeg', [ 0xFF, 0xFB ]),
    new MimeBeginBytes('audio/ogg', [ 0x4F, 0x70, 0x75 ]),
    new MimeBeginBytes('font/woff2', [ 0x77, 0x4f, 0x46, 0x32 ]),
    new MimeBeginBytes('image/gif', [ 0x47, 0x49, 0x46, 0x38, 0x37, 0x61 ]),
    new MimeBeginBytes('image/gif', [ 0x47, 0x49, 0x46, 0x38, 0x39, 0x61 ]),
    new MimeBeginBytes('image/jpeg', [ 0xFF, 0xD8 ]),
    new MimeBeginBytes('image/png', [ 0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A ]),
    new MimeBeginBytes('image/tiff', [ 0x49, 0x49, 0x2A, 0x00 ]),
    new MimeBeginBytes('image/tiff', [ 0x4D, 0x4D, 0x00, 0x2A ]),
    new MimeBeginBytes('model/gltf-binary', [ 0x46, 0x54, 0x6C, 0x67 ]),
])

/**
 * Any type that can be converted into `number[]`
 */
export type ToBeginBytes = ArrayLike<number> | Iterable<number>

function arrayGuard(array: ToBeginBytes): number[] {
    return Array.from(array, (v, idx) => {
        // since this is ts, we must check the type of each element
        if(typeof v !== 'number') {
            throw new TypeError(`begin bytes must be number[], but got ${ typeof v } at index ${ idx }`)
        }
        return v
    })
}

function findMimeByBeginBytes(bytes: ToBeginBytes): string | null {
    const flattenBytes = arrayGuard(bytes)

    for (const magic of magicSet) {
        if(magic.match(flattenBytes)) return magic.mime
    }

    return null
}

export {
    findMimeByBeginBytes
}
