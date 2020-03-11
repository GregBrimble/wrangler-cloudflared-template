import {} from '@cloudflare/workers-types'

export const handleRequest = async (request: Request): Promise<Response> => {
  // Intercept image request
  if (request.url.endsWith(`.jpg`)) {
    // Fetch a high-res image from Unsplash
    const resp = await fetch(`https://source.unsplash.com/random/1200x1200`)
    return resp
  }
  return new Response(`Not Found`, { status: 404 })
}
