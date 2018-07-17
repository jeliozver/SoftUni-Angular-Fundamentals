import Requester from "./Request";

const Data = new Requester(
  "GET",
  "http://google.com",
  "HTTP/1.1",
  "",
);

console.log(Data);