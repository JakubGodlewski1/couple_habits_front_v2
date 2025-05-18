import dotenv from "dotenv"
import { resolve } from "path"

// Load the environment variables from .env.test
dotenv.config({ path: resolve(process.cwd(), ".env.test") })
