const config = require('./tailwind.config.js'); config.plugins = [...(config.plugins || []), require('@tailwindcss/line-clamp')]; module.exports = config;
