import { Server } from "http";
import app from "./app";

const port = process.env.PORT || 5001;

async function bootstrap() {
  const server: Server = app.listen(port, () => {
    console.log(`welcome to watch server`);
  });

  const exitHandler = () => {
    if (server) {
      server.close(() => {});
    }
    process.exit(1);
  };

  const unexpectedErrorHandler = (error: unknown) => {
    exitHandler();
  };

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);
}

bootstrap();
