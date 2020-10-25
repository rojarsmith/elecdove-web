module.exports = {
  apps: [
    // First application
    {
      name: 'elecdove-web',
      script: 'serve',
      args: '',
      exec_mode: 'fork',
      // instance: 1,
      watch: false,
      max_memory_restart: '400M',
      time: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: '~/service/web/log',
      out_file: '~/service/web/log',
      autorestart: true,
      env: {
        PM2_SERVE_PATH: 'build',
        PM2_SERVE_PORT: 3010,
        COMMON_VARIABLE: "true",
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      },
      env_test: {
        NODE_ENV: 'test'
      }
    }
  ],
  deploy: {
    production: {
      user: 'root',
      host: '172.105.222.93',
      ref: 'origin/master',
      ssh_options: 'StrictHostKeyChecking=no',
      repo: 'git@github.com:rojarsmith/elecdove-web.git',
      path: '~/service/web/elecdove-web',
      'pre-deploy-local': '',
      'pre-setup': '',
      'post-deploy': 'npm install && npm install -g serve && npm run build && pm2 start ecosystem.config.js --env production',
      env_production: {
        NODE_ENV: 'production'
      }
    }
  }
};
