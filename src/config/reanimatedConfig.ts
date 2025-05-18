import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from "react-native-reanimated"

if (process.env.NODE_ENV !== "test") {
  // Configure the logger automatically on import
  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
  })
}

export { ReanimatedLogLevel }
