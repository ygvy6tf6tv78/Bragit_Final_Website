import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Buffer } from 'node:buffer'

const rootDir = path.dirname(fileURLToPath(import.meta.url))
const contentFile = path.join(rootDir, 'src/data/siteContent.json')
const uploadDir = path.join(rootDir, 'public/admin-uploads')

const readBody = (request, limit = 20 * 1024 * 1024) => new Promise((resolve, reject) => {
  let body = ''
  request.setEncoding('utf8')
  request.on('data', (chunk) => {
    body += chunk
    if (body.length > limit) reject(new Error('Request is too large'))
  })
  request.on('end', () => resolve(body))
  request.on('error', reject)
})

const sendJson = (response, status, payload) => {
  response.statusCode = status
  response.setHeader('Content-Type', 'application/json')
  response.end(JSON.stringify(payload))
}

const localContentAdmin = () => ({
  name: 'local-content-admin',
  configureServer(server) {
    server.middlewares.use(async (request, response, next) => {
      const url = request.url?.split('?')[0]
      if (!url?.startsWith('/api/admin/')) return next()

      try {
        if (url === '/api/admin/content' && request.method === 'GET') {
          const content = JSON.parse(await fs.readFile(contentFile, 'utf8'))
          return sendJson(response, 200, content)
        }

        if (url === '/api/admin/content' && request.method === 'POST') {
          const content = JSON.parse(await readBody(request, 5 * 1024 * 1024))
          if (!Array.isArray(content.services) || !Array.isArray(content.caseStudies)) {
            return sendJson(response, 400, { error: 'Invalid content structure' })
          }

          const tempFile = `${contentFile}.tmp`
          await fs.writeFile(tempFile, `${JSON.stringify(content, null, 2)}\n`, 'utf8')
          await fs.rename(tempFile, contentFile)
          return sendJson(response, 200, { ok: true })
        }

        if (url === '/api/admin/upload' && request.method === 'POST') {
          const { name, type, data } = JSON.parse(await readBody(request))
          const extensions = {
            'image/jpeg': 'jpg',
            'image/png': 'png',
            'image/webp': 'webp',
            'image/avif': 'avif',
          }
          const extension = extensions[type]
          if (!extension || typeof data !== 'string') {
            return sendJson(response, 400, { error: 'Use a JPG, PNG, WebP or AVIF image' })
          }

          const buffer = Buffer.from(data, 'base64')
          if (!buffer.length || buffer.length > 12 * 1024 * 1024) {
            return sendJson(response, 400, { error: 'Image must be smaller than 12 MB' })
          }

          const safeName = String(name || 'image')
            .replace(/\.[^.]+$/, '')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
            .slice(0, 60) || 'image'
          const fileName = `${Date.now()}-${safeName}.${extension}`
          await fs.mkdir(uploadDir, { recursive: true })
          await fs.writeFile(path.join(uploadDir, fileName), buffer)
          return sendJson(response, 200, { path: `/admin-uploads/${fileName}` })
        }

        return sendJson(response, 404, { error: 'Admin endpoint not found' })
      } catch (error) {
        return sendJson(response, 500, { error: error.message || 'Admin request failed' })
      }
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), localContentAdmin()],
})
