json.extract! tag, :id, :name
json.posts do
  json.array! tag.posts, partial: 'api/posts/post', as: :post
end
