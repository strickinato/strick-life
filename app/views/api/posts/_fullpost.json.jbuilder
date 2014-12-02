json.partial! 'api/posts/post', post: post
# json.tags do
#   json.array! post.tags, partial: 'api/taggable/tag', as: :tag
# end
# json.friends do
#   json.array! post.friends, partial: 'api/taggable/friend', as: :friend
# end
