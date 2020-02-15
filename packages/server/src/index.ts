import {} from '@cloudflare/workers-types'

export const handleRequest = async (request: Request): Promise<Response> => {
  // Intercept image request
  if (request.url.endsWith(`.jpg`)) {
    // Fetch a high-res image from Unsplash
    const resp = await fetch(`https://source.unsplash.com/random/1200x1200`, {
      // TODO: This seems to be ignored for some reason.
      // cf: {
      //   // Use Cloudflare's Image Resizing API to reduce its size and add a watermark
      //   image: {
      //     width: 800,
      //     height: 800,
      //   },
      //   draw: [
      //     {
      //       url: `https://via.placeholder.com/150.png`,
      //       bottom: 5,
      //       right: 5,
      //       fit: `contain`,
      //       width: 150,
      //       height: 150,
      //       opacity: 0.8,
      //     },
      //   ],
      // } as any,
    })
    return resp
  }
  return new Response(`Not Found`, { status: 404 })
}
