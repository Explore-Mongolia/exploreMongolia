import { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      "res.cloudinary.com",
      "img.clerk.com",
      "images.unsplash.com",
      "example.com",
      "www.escapetomongolia.com",
      "mongoliaretreats.com",
      "www.globalnationalparks.com"
    ],
  },
  transpilePackages: ['leaflet', 'react-leaflet'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpg|jpeg|gif)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '/_next',
            name: 'static/media/[name].[hash].[ext]',
          },
        },
      ],
    });

    return config;
  }
};

module.exports = nextConfig;
