import type express from "express";

export const detectHostAndProtocolFromRequest = (req: express.Request) => {
  let protocol: string;

  const cfVisitor = req.get("cf-visitor");

  if (cfVisitor) {
    try {
      const parsed = JSON.parse(cfVisitor);
      protocol = parsed.scheme || "https";
    } catch {
      protocol = "https";
    }
  } else {
    const isCloudflare = Boolean(req.get("cf-connecting-ip") || req.get("cf-ray"));

    if(isCloudflare) {
      protocol = "https";
    } else {
      protocol = req.get("x-forwarded-proto") || req.protocol || "http";
    }
  }

  const host = req.get("x-forwarded-host") || req.get("host");

  return {
    host,
    protocol,
  };
};
