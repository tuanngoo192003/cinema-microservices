local jwt = require "resty.jwt"
local cjson = require "cjson"

local _M = {}

local secret_key = "your-secret-key"  -- Change this to a strong key

local permissions_json = {
    ["/users/list"] = { permission = "READ_USER", role = "ADMIN;MANAGER" },
    ["/booking/{id}"] = { permission = "READ_BOOKING", role = "CUSTOMER" },
    ["/booking/list"] = { permission = "READ_BOOKING", role = "ADMIN;MANAGER;CUSTOMER" }
}

-- Function to check JWT authentication & role-based access
function _M.check_jwt_role()
    local token = ngx.var.http_Authorization
    if not token then
        ngx.exit(ngx.HTTP_UNAUTHORIZED)
    end

    -- Extract actual token (remove "Bearer ")
    token = token:sub(8)
    local jwt_obj = jwt:verify(secret_key, token)

    if not jwt_obj.verified then
        ngx.exit(ngx.HTTP_UNAUTHORIZED)
    end

    local permissions = permissions_json

    -- Extract requested URI
    local requested_uri = ngx.var.uri
    local permission_entry = permissions[requested_uri]

    if not permission_entry then
        ngx.exit(ngx.HTTP_FORBIDDEN) -- No access defined, deny by default
    end

    -- Extract required roles from CSV
    local required_roles = {}
    for role in permission_entry.role:gmatch("[^;]+") do
        required_roles[role] = true
    end

    -- Extract user roles from JWT
    local user_roles = jwt_obj.payload.roles or {}

    -- Check if the user has at least one required role
    local has_role = false
    for _, role in ipairs(user_roles) do
        if required_roles[role] then
            has_role = true
            break
        end
    end

    if not has_role then
        ngx.exit(ngx.HTTP_FORBIDDEN)
    end
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
