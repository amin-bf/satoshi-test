import { app } from "./app";
import { dbConnection } from "./util/database";
import { natsWrapper } from "./nats-wrapper";
import { DatabaseConnectionError, NatsConnectionError } from "@satoshi/common";

// Application initialization
const start = async () => {
  // Check essential app variables
  if (!process.env.DB_HOST) throw new Error("No DB_HOST variable.");
  if (!process.env.DB_NAME) throw new Error("No DB_NAME variable.");
  if (!process.env.DB_USER) throw new Error("No DB_USER variable.");
  if (!process.env.DB_PASSWORD) throw new Error("No DB_PASSWORD variable.");
  if (!process.env.NATS_CLUSTER_ID)
    throw new Error("No NATS_CLUSTER_ID variable.");
  if (!process.env.NATS_CLIENT_ID)
    throw new Error("No NATS_CLIENT_ID variable.");
  if (!process.env.NATS_URL) throw new Error("No NATS_URL variable.");

  // Connect to Database
  if (!(await dbConnection())) throw new DatabaseConnectionError();

  // Connect to event-bus
  if (
    !(await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    ))
  )
    throw new NatsConnectionError();

  // Run server
  app.listen(3000, () => {
    console.log("Auth service started listening.");
  });
};

// Start application
start();
