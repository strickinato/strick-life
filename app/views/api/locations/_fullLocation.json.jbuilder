json.partial! 'api/locations/location', location: location
json.posts do
  json.array! location.posts, partial: 'api/posts/post', as: :post
end
