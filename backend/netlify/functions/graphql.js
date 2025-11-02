exports.handler = async (event, context) => {
  // Set CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  // Handle GraphQL requests
  if (event.httpMethod === 'POST') {
    try {
      const body = JSON.parse(event.body || '{}');
      const { query } = body;

      // Simple GraphQL response
      if (query && query.includes('hello')) {
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            data: {
              hello: 'Hello from OShop Netlify API!'
            }
          }),
        };
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          data: {
            message: 'OShop GraphQL API is running'
          }
        }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({
          error: 'Internal server error',
          message: error.message
        }),
      };
    }
  }

  // Handle GET requests (GraphQL playground)
  if (event.httpMethod === 'GET') {
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>OShop GraphQL API</title>
        </head>
        <body>
          <h1>OShop GraphQL API</h1>
          <p>GraphQL endpoint is running!</p>
          <p>Send POST requests to this endpoint with GraphQL queries.</p>
        </body>
        </html>
      `,
    };
  }

  return {
    statusCode: 405,
    headers,
    body: JSON.stringify({ error: 'Method not allowed' }),
  };
};