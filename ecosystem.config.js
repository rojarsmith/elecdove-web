module.exports = {
  apps: [
    // First application
    {
      name: 'elecdove-web',
      script: 'bin/www',
      exec_mode: 'fork',
      // instance: 1,
      watch: false,
      max_memory_restart: '200M',
      time: true,
      log_date_format: 'YYYY-MM-DD HH:mm Z',
      error_file: '~/service/web/log',
      out_file: '~/service/web/log',
      autorestart: true,
      env: {
        COMMON_VARIABLE: "true",
        NODE_ENV: 'development',
        "PORT": "3010"
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
      'post-deploy': 'cp ~/service/web/.env.production.local ~/service/web/elecdove-web/current/ && npm install && npm audit fix && pm2 reload ecosystem.config.js',
      'pre-setup': '',
      env_production: {
        NODE_ENV: 'production'
      }
    }
  }
};
