const path = require('path');

module.exports = {
  async rewrites() {
    return [
       {
        source: '/user-dashboard/:path*',
        destination: '/components/Dashboards/user-dashboard',
      },
     
      {
        source: '/service-provider-dashboard/:path*',
        destination: '/components/Dashboards/service-provider-dashboard',
      },
    ];
  },
};
