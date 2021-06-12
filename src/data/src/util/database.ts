import mongoose from "mongoose"

export const dbConnection = async (): Promise<boolean> => {
  try {
    mongodb: await mongoose.connect(
      `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?authSource=admin`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    )

    console.log("Connected to database!")
    return true
  } catch (error) {
    console.log("Database Error", error)

    return false
  }
}
