// module http

const { resolve } = require("dns");
const http = require("http");
const { findPackageJSON } = require("module");
const { buffer } = require("stream/consumers");

// main server

const server = http.createServer((request, response) => {
  // CORS

  let ALLOWED_ORIGIN = "*";

  res.setHeader("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // main

  // POST baru, bikin sendiri

  if (request.method === "POST" && request.url === "/post/bob") {
    let body = [];

    request.on("data", (chunk) => {
      body.push(chunk);
    });

    request.on("end", () => {
      const bodyToString = Buffer.concat(body).toString();
      let dataJadi;
      try {
        dataJadi = JSON.parse(bodyToString);

        // berhasil

        response.writeHead(200, { "content-type": "application/json" });
        response.end(
          JSON.stringify({ info: "data berhasil!", data: dataJadi }),
        );
      } catch (err) {
        console.error(err);

        // mengembalikan error

        response.writeHead(400, { "content-type": "application/json" });
        response.end(JSON.stringify({ pesan: "format tidak valid" }));
        console.log(err);
        return 0;
      }
    });
  } else {
    response.writeHead(400, { "content-type": "application/json" });
    response.end(JSON.stringify({ pesan: "url ini tidak tersedia" }));
  }

  if (request.method === "GET" && request.url === "/get/bob") {
    const dataDiri = {
      nama: "habibi",
      namaPanggilan: "bob/habibop",
      role: "Fullstack Dev (aamiin)",
      ciriCiri: "Ganteng",
    };

    response.writeHead(200, { "content-type": "application/json" });
    response.end(JSON.stringify(dataDiri));
  } else {
    response.writeHead(404, { "content-type": "application/json" });
    response.end(JSON.stringify({ info: "url ini tidak tersedia" }));
  }

  if (request.method === "POST" && request.url === "/tambah") {
    // logic

    let body = [];

    request.on("data", (chunk) => {
      body.push(chunk);
    });

    request.on("end", () => {
      const bodyString = Buffer.concat(body).toString();
      let dataSiap;
      try {
        dataSiap = JSON.parse(bodyString);
      } catch (err) {
        console.error(err);
        response.writeHead(400, { "content-type": "application/json" });
        response.end(JSON.stringify({ error: "Format JSON tidak valid" }));
        return 0;
      }

      let pesan = {
        info: "halo " + dataSiap.nama + " role kamu sebagai " + dataSiap.role,
      };

      response.writeHead(200, { "content-type": "application/json" });
      response.end(JSON.stringify(pesan));
    });
  } else {
    response.writeHead(404, { "content-type": "application/json" });
    response.end(
      JSON.stringify({ status: "maaf, data dalam url ini tidak ada" }),
    );
  }
});

server.listen(3000, () => {
  console.log(3000);
});
  
