# using npx ts-node-dev src/server.ts to start server 

all the db levels function should return success as result than data and error 

type Result<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

| Expression                | Meaning                                                                     |
| ------------------------- | --------------------------------------------------------------------------- |
| `Promise<number>`         | Function will return a number (like `userId`) later                         |
| `Promise<Result<number>>` | Function will return `{ success, data, error }` and `data` will be a number |
