import {} from '@cloudflare/workers-types'
import {
  getAssetFromKV,
  serveSinglePageApp,
} from '@cloudflare/kv-asset-handler'
import { handleRequest as server } from '../server/src'

const assetOptions = {
  mapRequestToAsset: serveSinglePageApp,
}

const handleProductionAssetRequest = async (
  event: FetchEvent
): Promise<Response> => {
  try {
    return await getAssetFromKV(event, assetOptions)
  } catch (e) {
    // TODO: Could also be an error thrown by the getAssetFromKV function: https://github.com/cloudflare/kv-asset-handler#return
    // TODO: Pretty 404 page
    return new Response(`Not Found`, {
      status: 404,
      headers: { 'Content-Type': `text/plain` },
    })
  }
}

const handleAssetRequest = async (event: FetchEvent): Promise<Response> => {
  if (process.env.CLOUDFLARED_TUNNEL) return await fetch(event.request)

  return await handleProductionAssetRequest(event)
}

const handleError = (event: FetchEvent, error: Error): void => {
  console.info(event.request)
  console.error(error)
}

const handleRequest = async (event: FetchEvent): Promise<Response> => {
  try {
    const { request } = event
    const response = await server(request)
    if (response.status !== 404) return response

    return handleAssetRequest(event)
  } catch (error) {
    event.waitUntil(handleError(event, error))

    return new Response(`Internal Server Error`, {
      status: 500,
      headers: { 'Content-Type': `text/plain` },
    })
  }
}

addEventListener(`fetch`, (event: Event & FetchEvent) => {
  event.respondWith(handleRequest(event))
})
