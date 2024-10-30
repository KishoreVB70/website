import dotenv from "dotenv";

dotenv.config();

const staticBuildEnabled = process.env.STATIC_BUILD_ENABLED === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: staticBuildEnabled ? "export" : undefined,
};

export default nextConfig;
