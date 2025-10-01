import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/configjs/
export default defineConfig ({
    base: "/sharks-from-space/",
    plugins: [react()],
})