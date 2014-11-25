json.post do
  json.partial! 'api/posts/post', post: @post
  json.tags do
    json.array! @tags, partial: 'api/taggable/tag', as: :tag
  end
  json.friends do
    json.array! @friends, partial: 'api/taggable/friend', as: :friend
  end
end
