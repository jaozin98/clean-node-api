import { MongoHelper } from "../infra/db/mongodb/helpers/mongo-helper"
import env from "./config/env"

MongoHelper.connect(env.mongoUrl)
 .then(async () => {
const app = (await import("./config/app")).default
  // eslint-disable-next-line no-console
  app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
 })
// eslint-disable-next-line no-console
.catch(console.error)
