const qs = require("querystring");
const fs = require("fs");
const path = require("path");

const saveUser = user => {
  const userName = user.username;
  const fileUser = path.join(
    __dirname,
    "../../",
    "db",
    "/users",
    `${userName}.json`
  );
  fs.writeFile(fileUser, JSON.stringify(user), function(err) {
    if (err) throw err;
    console.log(`${userName}.json was created`);
  });
};

const verificateUser = user => {
  const userName = user.username;
  const userTelephone = user.telephone.replace(/\s/g, "");
  const userPassword = user.password;
  const userEmail = user.email;
  if (
    typeof userName === "string" &&
    !isNaN(Number(userTelephone)) &&
    typeof userPassword === "string" &&
    typeof userEmail === "string"
  )
    return true;
  else return false;
};

const signUpRoute = (request, response) => {
  if (request.method === "POST") {
    let body = "";

    request.on("data", function(data) {
      body = body + data;
      console.log("Incoming data!!!!");
    });

    request.on("end", function() {
      const user = JSON.parse(body);
      console.log(user);
      if (verificateUser(user)) {
        saveUser(user);
        const success = {
          status: "success: user saved",
          user: user
        };

        response.writeHead(200, {
          "Content-type": "application/json"
        });
        response.write(JSON.stringify(success));
        response.end();
      } else {
        const error = {
          status: "error: not valid data"
        };
        response.writeHead(403, {
          "Content-type": "application/json"
        });
        response.write(JSON.stringify(error));
        response.end();
      }
    });
  }
};

module.exports = signUpRoute;
