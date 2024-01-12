# Use official nginx image as the base image
FROM nginx:stable

# Copy the build output to replace the default nginx contents.
 COPY dist/poke-app /usr/share/nginx/html/poke-web

# Copy the default nginx.conf
 COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80
