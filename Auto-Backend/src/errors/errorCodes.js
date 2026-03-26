// Error middleware - Request lifecycle error handling
export const ERROR_CODES = {
  USER_ALREADY_EXISTS: {
    code: "USER_ALREADY_EXISTS",
    status: 409,
    message: "User already exists",
  },

  OWNER_MISMATCH: {
    code: "OWNER_MISMATCH",
    status: 422,//Unprocessable Entity :format is valid,syntax valid but business validation fail so 422
    message: "Owner name mismatch with registered owner"
  },

  VEHICLE_NOT_VERIFIED: {
    code: "VEHICLE_NOT_VERIFIED",
    status: 400,
    message: "Could not verify RC with RTO"
  },
  VEHICLE_NOT_FOUND: {
    code: "VEHICLE_NOT_FOUND",
    status: 404,
    message: "Vehicle not found"
  },
  SIGNUP_FAILED: {
    code: "SIGNUP_FAILED",
    status: 500,
    message: "Signup failed",
  },

  INTERNAL_ERROR: {
    code: "INTERNAL_ERROR",
    status: 500,
    message: "Internal server error",
  },

  SEANEB_ID_REQUIRED: {
    code: "SEANEB_ID_REQUIRED",
    status: 400,
    message: "Seaneb ID is required",
  },

  SEANEB_ID_ALREADY_EXISTS: {
    code: "SEANEB_ID_ALREADY_EXISTS",
    status: 409,
    message: "Seaneb ID already taken",
  },

  INVALID_SEANEB_ID_FORMAT: {
    code: "INVALID_SEANEB_ID_FORMAT",
    status: 400,
    message: "Invalid Seaneb ID format",
  },

  SEANEB_ID_MUST_CONTAIN_LETTER: {
    code: "SEANEB_ID_MUST_CONTAIN_LETTER",
    status: 400,
    message: "Seaneb ID must contain at least one letter",
  },

  SEANEB_ID_LENGTH_INVALID: {
    code: "SEANEB_ID_LENGTH_INVALID",
    status: 400,
    message: "Seaneb ID must be between 6 and 30 characters",
  },

  PRODUCT_KEY_REQUIRED: {
    code: "PRODUCT_KEY_REQUIRED",
    status: 400,
    message: "Product key is required",
  },

  PRODUCT_NOT_FOUND: {
    code: "PRODUCT_NOT_FOUND",
    status: 404,
    message: "Product not found or inactive",
  },

  PRODUCT_ALREADY_EXISTS: {
    code: "PRODUCT_ALREADY_EXISTS",
    status: 409,
    message: "Product already exists",
  },

  INVALID_PRODUCT: {
    code: "INVALID_PRODUCT",
    status: 401,
    message: "Invalid or inactive product",
  },

  INVALID_PHONE_NUMBER: {
    code: "INVALID_PHONE_NUMBER",
    status: 400,
    message: "Invalid country code or mobile number",
  },

  REQUIRED_FIELDS_MISSING: {
    code: "REQUIRED_FIELDS_MISSING",
    status: 400,
    message: "Required fields are missing",
  },

  DOB_REQUIRED: {
    code: "DOB_REQUIRED",
    status: 400,
    message: "Date of birth is required",
  },

  INVALID_DOB: {
    code: "INVALID_DOB",
    status: 400,
    message: "Invalid date of birth format",
  },

  INVALID_DOB_RANGE: {
    code: "INVALID_DOB_RANGE",
    status: 400,
    message: "Invalid date of birth range",
  },

  AGE_BELOW_13: {
    code: "AGE_BELOW_13",
    status: 403,
    message: "You must be at least 13 years old to register",
  },

  LOCATION_REQUIRED: {
    code: "LOCATION_REQUIRED",
    status: 400,
    message: "Location is required",
  },

  LOCATION_RESOLVE_FAILED: {
    code: "LOCATION_RESOLVE_FAILED",
    status: 422,
    message: "Unable to resolve city",
  },

  TIMEZONE_RESOLVE_FAILED: {
    code: "TIMEZONE_RESOLVE_FAILED",
    status: 422,
    message: "Unable to resolve timezone",
  },

  EMAIL_NOT_VERIFIED: {
    code: "EMAIL_OTP_NOT_VERIFIED",
    status: 400,
    message: "Email OTP not verified",
  },

  EMAIL_ALREADY_EXISTS: {
    code: "EMAIL_ALREADY_EXISTS",
    status: 409,
    message: "Email already registered",
  },

  MOBILE_ALREADY_EXISTS: {
    code: "MOBILE_ALREADY_EXISTS",
    status: 409,
    message: "Mobile number already registered",
  },

  OTP_NOT_VERIFIED: {
    code: "MOBILE_OTP_NOT_VERIFIED",
    status: 400,
    message: "Mobile OTP not verified",
  },

  INVALID_OTP: {
    code: "INVALID_OTP",
    status: 400,
    message: "Invalid OTP",
  },

  OTP_EXPIRED: {
    code: "OTP_EXPIRED",
    status: 400,
    message: "OTP has expired",
  },

  OTP_ALREADY_USED: {
    code: "OTP_ALREADY_USED",
    status: 400,
    message: "OTP already used",
  },

  OTP_NOT_FOUND: {
    code: "OTP_NOT_FOUND",
    status: 400,
    message: "OTP not found",
  },

  OTP_TOO_MANY_ATTEMPTS: {
    code: "OTP_TOO_MANY_ATTEMPTS",
    status: 429,
    message: "Too many invalid attempts. Try again later",
  },

  OTP_RATE_LIMITED: {
    code: "OTP_RATE_LIMITED",
    status: 429,
    message: "Too many requests. Try again later",
  },

  ACCOUNT_NOT_ACTIVE: {
    code: "ACCOUNT_NOT_ACTIVE",
    status: 403,
    message: "Account not active",
  },

  UNAUTHORIZED: {
    code: "UNAUTHORIZED",
    status: 401,
    message: "Unauthorized access",
  },

  SESSION_EXPIRED: {
    code: "SESSION_EXPIRED",
    status: 401,
    message: "Session expired. Please login again",
  },

  CSRF_TOKEN_REQUIRED: {
    code: "CSRF_TOKEN_REQUIRED",
    status: 403,
    message: "CSRF token is required",
  },

  INVALID_CSRF_TOKEN: {
    code: "INVALID_CSRF_TOKEN",
    status: 403,
    message: "Invalid CSRF token",
  },

  CATEGORY_NAME_REQUIRED: {
    code: "CATEGORY_NAME_REQUIRED",
    status: 400,
    message: "Category name is required",
  },

  CATEGORY_ALREADY_EXISTS: {
    code: "CATEGORY_ALREADY_EXISTS",
    status: 409,
    message: "Category with this name already exists",
  },

  INVALID_CATEGORY: {
    code: "INVALID_CATEGORY",
    status: 400,
    message: "Invalid  category Name",
  },

  PROFESSION_ALREADY_EXISTS: {
    code: "PROFESSION_ALREADY_EXISTS",
    status: 409,
    message: "Profession with this name already exists for this product",
  },

  BUSINESS_ALREADY_EXISTS: {
    code: "BUSINESS_ALREADY_EXISTS",
    status: 409,
    message: "Business already exists for this mobile or email",
  },

  BUSINESS_ALREADY_EXISTS_FOR_PRODUCT: {
    code: "BUSINESS_ALREADY_EXISTS_FOR_PRODUCT",
    status: 400,
    message: "Business already exists for this product",
  },

  BUSINESS_NOT_ACTIVE: {
    code: "BUSINESS_NOT_ACTIVE",
    status: 403,
    message: "Business is not active",
  },

  PAN_REQUIRED: {
    code: "PAN_REQUIRED",
    status: 400,
    message: "PAN number is required",
  },

  PAN_VERIFICATION_FAILED: {
    code: "PAN_VERIFICATION_FAILED",
    status: 422,
    message: "PAN verification failed",
  },

  GST_REQUIRED: {
    code: "GST_REQUIRED",
    status: 400,
    message: "GSTIN is required",
  },

  GST_VERIFICATION_FAILED: {
    code: "GST_VERIFICATION_FAILED",
    status: 422,
    message: "GST verification failed",
  },

  INVALID_COUNTRY: {
    code: "INVALID_COUNTRY",
    status: 404,
    message: "Country not found",
  },

  INVALID_STATE: {
    code: "INVALID_STATE",
    status: 404,
    message: "State not found under given country",
  },

  INVALID_CITY: {
    code: "INVALID_CITY",
    status: 404,
    message: "City not found under given state",
  },

  INVALID_AREA: {
    code: "INVALID_AREA",
    status: 404,
    message: "Area not found under given city",
  },

  BUSINESS_NOT_FOUND: {
    code: "BUSINESS_NOT_FOUND",
    status: 404,
    message: "Business not found",
  },

  BUSINESS_NOT_REGISTERED_FOR_PRODUCT: {
    code: "BUSINESS_NOT_REGISTERED_FOR_PRODUCT",
    status: 403,
    message: "This business is not registered under the selected product",
  },

  NO_BUSINESSES_IN_LOCATION: {
    code: "NO_BUSINESSES_IN_LOCATION",
    status: 200,
    message:
      "Grab opportunity! Be first to register business in this location.",
  },

  AREA_LEVEL_NOT_ALLOWED: {
    code: "AREA_LEVEL_NOT_ALLOWED",
    status: 403,
    message: "Area-level business listing is not allowed for this product",
  },

  CITY_LEVEL_NOT_ALLOWED: {
    code: "CITY_LEVEL_NOT_ALLOWED",
    status: 403,
    message: "City-level business listing is not allowed for this product",
  },
};
