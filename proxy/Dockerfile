FROM openresty/openresty:alpine

# Install Lua and LuaRocks
RUN apk add --no-cache lua5.1 luarocks && \
    ln -s /usr/bin/luarocks-5.1 /usr/bin/luarocks && \
    luarocks install lua-resty-core && \
    luarocks install lua-resty-lrucache && \
    luarocks install lua-resty-jwt

# Copy the Nginx config
COPY conf /etc/nginx/conf.d/default.conf
