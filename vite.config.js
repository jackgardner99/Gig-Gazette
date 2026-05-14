import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/Gig-Gazette/", // add repository name here
  plugins: [react()],
})
