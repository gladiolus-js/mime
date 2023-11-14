import test from "ava";
import { readFileSync } from "node:fs"
import { resolvePath } from "./helper.mjs";
import { findMime } from "../dist/index.mjs"

test('begin bytes', t => {
    const bytes = readFileSync(resolvePath('./png.html')).slice(0, 20)

    t.is(findMime('png.html', bytes), 'image/png')
})