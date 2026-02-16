import type express from "express";

export const detectHostAndProtocolFromRequest = (req: express.Request) => {
  let protocol = "http";

  const cfVisitor = req.get("cf-visitor");

  if (cfVisitor) {
    try {
      const parsed = JSON.parse(cfVisitor);
      protocol = parsed.scheme || "https";
    } catch {
      protocol = "https";
    }
  } else {
    const isCloudflare = req.get("cf-connecting-ip") || req.get("cf-ray");

    protocol = isCloudflare ? "https" : req.get("x-forwarded-proto") || req.protocol || "http";
  }

  const host = req.get("x-forwarded-host") || req.get("host");

  return {
    host,
    protocol,
  };
};
