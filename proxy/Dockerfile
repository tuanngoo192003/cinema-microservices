FROM openresty/openresty:alpine

# Install Lua and LuaRocks
RUN apk add --no-cache lua5.1 luarocks && \
    ln -s /usr/bin/luarocks-5.1 /usr/bin/luarocks && \
    luarocks install lua-resty-core && \
    luarocks install lua-resty-lrucache && \
    luarocks install lua-resty-jwt

# Copy Nginx config
COPY conf /etc/nginx/conf.d/default.conf

# Copy Lua authentication module
COPY auth.lua /etc/nginx/lua/auth.lua

# Ensure Lua module path is set correctly
ENV LUA_PATH "/etc/nginx/lua/?.lua;;"

# Expose port 80
EXPOSE 80

CMD ["openresty", "-g", "daemon off;"]
