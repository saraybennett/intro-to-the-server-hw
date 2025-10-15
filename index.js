let express = require("express");
let app = express();

let fandoms = {
  data: [
    {
      name: "Supernatural",
      cached_count: 310300,
    },
    {
      name: "Avatar: The Last Airbender",
      cached_count: 33306,
    },
    {
      name: "Stargate Atlantis",
      cached_count: 37689,
    },
    {
      name: "Grey's Anatomy",
      cached_count: 5396,
    },
  ],
};

// app.get("/", (request, response) => {
//   response.send("hello");

//static fandom v fandom shows up on page load
app.use("/", express.static("public"));

//new static page shown at the /data route -- works but couldn't get it to work with the special data route but for some reason this page still shows when i go to localhost:3000/data soo not sure what is happening
// app.use("/data", express.static("public/data/index.html"));

app.get("/data", (request, response) => {
  response.json("./data/500 novels.json");
});

//serve the special data route
// app.get("/data/genre:", (request, response) => {
//   console.log(request.params.fandoms);
//   let user_fandom = request.params.fandoms;
//   let user_obj;
//   for (let i = 0; i < fandoms.data.length; i++) {
//     if (user_fandom == fandoms.data[i].name) {
//       user_obj = fandoms.data[i];
//     }
//   }
//   console.log(user_obj);
//   if (user_obj) {
//     response.json(user_obj);
//   } else {
//     response.json({ status: "info not present" });
//   }
//   response.send("thank you");
// });

app.get("/about", (request, response) => {
  response.send("this is an about page!");
});

app.get("/fandoms", (request, response) => {
  response.json(fandoms);
});

app.get("/fandoms/:fandoms", (request, response) => {
  console.log(request.params.fandoms);
  let user_fandom = request.params.fandoms;
  let user_obj;
  for (let i = 0; i < fandoms.data.length; i++) {
    if (user_fandom == fandoms.data[i].name) {
      user_obj = fandoms.data[i];
    }
  }
  console.log(user_obj);
  if (user_obj) {
    response.json(user_obj);
  } else {
    response.json({ status: "info not present" });
  }
  response.send("thank you");
});

app.listen(3000, () => {
  console.log("the app is listening at local host 3000");
});
