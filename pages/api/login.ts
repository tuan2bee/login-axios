import type { NextApiRequest, NextApiResponse } from "next";
import httpProxy, { ProxyResCallback } from "http-proxy";
import Cookies from "cookies";

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const proxy = httpProxy.createProxyServer();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  req.url = req.url?.replace("api", "auth");
  //res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method !== "POST") {
    return res.status(404).json({ message: "method not supported" });
  }

  return new Promise((resolve) => {
    // don't send cookies to API server
    req.headers.cookie = "";

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      let body = "";
      proxyRes.on("data", function (chunk) {
        body += chunk;
      });

      proxyRes.on("end", function () {
        try {
          const { access_token, message } = JSON.parse(body);
          //console.log(body);
          //console.log(access_token);

          if (access_token == undefined) {
            (res as NextApiResponse).status(401).json({ message: message });
          } else {
            var date = new Date();
            date.setDate(date.getDate() + 10);
            // convert token to cookies
            const cookies = new Cookies(req, res, {
              secure: process.env.NODE_ENV !== "development",
            });
            cookies.set("access_token", access_token, {
              httpOnly: true,
              sameSite: "lax",
              expires: date,
            });
            (res as NextApiResponse)
              .status(200)
              .json({ message: "login successfully" });
          }
        } catch (error) {
          (res as NextApiResponse)
            .status(500)
            .json({ message: "something went wrong" });
        }

        resolve(true);
      });
    };

    proxy.once("proxyRes", handleLoginResponse);
    proxy.web(req, res, {
      target: process.env.NEXT_PUBLIC_API_URL,
      changeOrigin: true,
      selfHandleResponse: true,
    });
  });
}
