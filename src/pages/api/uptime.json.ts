export const prerender = false; // このファイルはビルド時ではなく実行時に動く

export async function GET() {
  try {
    const res = await fetch('https://uptime.onji.cc/api/status-page/heartbeat/general', {
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!res.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch from Uptime Kuma' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
