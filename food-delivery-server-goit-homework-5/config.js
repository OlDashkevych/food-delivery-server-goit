const dbUser = "dashkevych";
const dbPassword = "DLVxw8FJ6qjW4sn";

const config = {
  port: 8000,
  dbUser,
  dbPassword,
  databaseUrl: `mongodb+srv://${dbUser}:${dbPassword}@cluster0-zad2d.azure.mongodb.net/test?retryWrites=true&w=majority`,
};

module.exports = config;
