import { findMime } from "../dist/index.mjs"
import { readFileSync } from "node:fs"

const buffer = readFileSync("png.html").slice(0, 10)

console.log(findMime("png.html", buffer))
// image/png