import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
 testDir:'./tests', testMatch:'**/*.e2e.ts', fullyParallel:true, retries:1,
 reporter:[['list'],['html',{open:'never'}]],
 use:{baseURL:'http://127.0.0.1:4173',trace:'retain-on-failure',screenshot:'only-on-failure',reducedMotion:'reduce'},
 webServer:{command:'npm run dev -- --host 127.0.0.1 --port 4173',url:'http://127.0.0.1:4173',reuseExistingServer:!process.env.CI,env:{VITE_REGISTRATION_ENABLED:'true',VITE_DATA_CONTROLLER:'Equipo de prueba',VITE_CONTACT_EMAIL:'qa@example.com'}},
 projects:[{name:'desktop',use:{...devices['Desktop Chrome'],viewport:{width:1400,height:900}}},{name:'mobile',use:{...devices['iPhone 13'],defaultBrowserType:'chromium'}}]
});
