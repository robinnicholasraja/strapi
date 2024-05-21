/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
              protocol: "https",
              hostname: "strapixcloud2-pm4voc2waa-uc.a.run.app",
            },
          ],
    }
};

export default nextConfig;
