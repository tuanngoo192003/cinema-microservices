local jwt = require "resty.jwt"
local cjson = require "cjson"

local _M = {}

local secret_key = "a-string-secret-at-least-256-bits-long"  -- Change this to a strong key

local permissions = {
    ["/users"] = { permission = "READ_USER", role = { "ADMIN", "MANAGER" } },
    ["/users/{id}"] = { permission = "READ_USER", role = { "ADMIN", "MANAGER" } },
    ["/users/existed/{id}"] = { permission = "READ_USER", role = { "ADMIN", "MANAGER" } },
    ["/cinema/auditoriums"] = { permission = "READ_AUDITORIUMS", role = { "ADMIN", "MANAGER", "CUSTOMER" } },
    ["/cinema/auditoriums/{id}"] = { permission = "READ_AUDITORIUM", role = { "ADMIN", "MANAGER", "CUSTOMER" } },
    ["/cinema/seats"] = { permission = "READ_SEATS", role = { "ADMIN", "CUSTOMER" } },
    ["/cinema/seats/{id}"] = { permission = "READ_SEAT", role = { "ADMIN", "MANAGER", "CUSTOMER" } }, 
    ["/cinema/seats/available"] = { permission = "READ_SEAT", role = { "ADMIN", "MANAGER", "CUSTOMER" } },
    ["/cinema/seats/reservations/{id}"] = { permission = "WRITE_SEAT_RESERVE", role = { "ADMIN", "MANAGER", "CUSTOMER" } },
    ["/cinema/movies"] = { permission = "READ_MOVIES", role = { "ADMIN", "MANAGER", "CUSTOMER" } }, 
    ["/cinema/movies/{id}"] = { permission = "READ_MOVIE", role = { "ADMIN", "MANAGER", "CUSTOMER" } },
    ["/cinema/movie-schedules"] = { permission = "WRITE_MOVIE_SCHEDULE", role = { "ADMIN", "MANAGER" } },
    ["/cinema/schedules"] = { permission = "READ_MOVIE_SCHEDULES", role = { "ADMIN", "MANAGER", "CUSTOMER" } },
    ["/booking/{id}"] = { permission = "READ_BOOKING", role = { "ADMIN", "MANAGER", "CUSTOMER" } },
    ["/booking"] = { permission = "WRITE_BOOKING", role = { "CUSTOMER" } },
}

-- Function to check JWT authentication & role-based access
function _M.check_jwt_role()
    local token = ngx.var.http_Authorization
    if not token or not token:match("^Bearer%s+(.+)$") then
        ngx.log(ngx.ERR, "Missing or malformed Authorization header")
        ngx.exit(ngx.HTTP_UNAUTHORIZED)
    end

    -- Extract actual token (remove "Bearer ")
    token = token:match("^Bearer%s+(.+)$")
    local jwt_obj = jwt:verify(secret_key, token)

    if not jwt_obj.verified then
        ngx.log(ngx.ERR, "JWT verification failed" .. jwt_obj.reason)
        ngx.exit(ngx.HTTP_UNAUTHORIZED)
    end

    -- Extract requested URI
    local requested_uri = ngx.var.uri
    local permission_entry = permissions[requested_uri]

    if not permission_entry then
    -- Try matching dynamic routes
        for route, entry in pairs(permissions) do
            local pattern = route:gsub("{id}", "([^/]+)") -- Convert `/user/{id}` to `/user/([^/]+)`
                if requested_uri:match("^" .. pattern .. "$") then
                    permission_entry = entry
                break
            end
        end
    end

    if not permission_entry then
        ngx.log(ngx.ERR, "Access denied for URI..." .. requested_uri)
        ngx.exit(ngx.HTTP_FORBIDDEN) -- No access defined, deny by default
    end

    -- Extract required roles as a lookup table
    local required_roles = {}
    for _, role in ipairs(permission_entry.role) do
        required_roles[role] = true
    end

    -- Extract required roles from CSV
    local user_roles = jwt_obj.payload.roles or {}
    for _, role in ipairs(user_roles) do
        if required_roles[role] then 
            return 
        end 
    end

    ngx.log(ngx.ERR, "User does not have the required role for " .. requested_uri)
    return ngx.exit(ngx.HTTP_FORBIDDEN)
end

-- Function to generate a JWT token with roles
function _M.generate_token(role)
    local jwt_token = jwt:sign(secret_key, {
        header = { typ = "JWT", alg = "HS256" },
        payload = {
            sub = "user123", -- Example subject
            roles = { role }, -- Assign a role dynamically
            iat = ngx.time(),
            exp = ngx.time() + 3600 -- 1 hour expiry
        }
    })

    return jwt_token
end

return _M
