const errorHandler = (err, req, res, next) => {
  // Log the full error in development, simplified in production
  if (process.env.NODE_ENV === 'development') {
    console.error('\x1b[31m%s\x1b[0m', 'Error:', err.stack); // Red colored error
  } else {
    console.error('Error:', err.name, err.message);
  }

  // Response object structure
  const errorResponse = {
    success: false,
    message: err.message || 'Something went wrong',
    type: err.name || 'InternalError',
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      fullError: err
    })
  };

  // Handle different error types
  switch (true) {
    // Mongoose validation error
    case err.name === 'ValidationError':
      return res.status(400).json({
        ...errorResponse,
        message: 'Validation failed',
        errors: Object.values(err.errors).map(e => ({
          field: e.path,
          message: e.message
        }))
      });

    // Mongoose duplicate key error
    case err.code === 11000:
      return res.status(409).json({
        ...errorResponse,
        message: 'Duplicate key error',
        field: Object.keys(err.keyPattern)[0],
        value: err.keyValue[Object.keys(err.keyPattern)[0]]
      });

    // JWT errors
    case err.name === 'JsonWebTokenError':
      return res.status(401).json({
        ...errorResponse,
        message: 'Invalid authentication token',
        code: 'INVALID_TOKEN'
      });

    case err.name === 'TokenExpiredError':
      return res.status(401).json({
        ...errorResponse,
        message: 'Authentication token expired',
        code: 'TOKEN_EXPIRED'
      });

    // Gemini API errors
    case err.message.includes('API key not valid'):
      return res.status(401).json({
        ...errorResponse,
        message: 'Invalid AI service credentials',
        code: 'INVALID_AI_KEY'
      });

    case err.message.includes('safety'):
      return res.status(403).json({
        ...errorResponse,
        message: 'Content blocked by safety filters',
        code: 'CONTENT_BLOCKED'
      });

    case err.message.includes('429'):
      return res.status(429).json({
        ...errorResponse,
        message: 'AI service rate limit exceeded',
        code: 'RATE_LIMIT',
        retryAfter: '60s'
      });

    // Network-related errors
    case err.name === 'MongoNetworkError':
      return res.status(503).json({
        ...errorResponse,
        message: 'Database connection error',
        code: 'DB_CONNECTION_FAILED'
      });

    case err.name === 'TimeoutError':
      return res.status(504).json({
        ...errorResponse,
        message: 'Request timeout',
        code: 'TIMEOUT'
      });

    // Default error handling
    default:
      return res.status(err.statusCode || 500).json({
        ...errorResponse,
        message: errorResponse.message,
        code: 'INTERNAL_ERROR'
      });
  }
};

module.exports = {
  errorHandler
};