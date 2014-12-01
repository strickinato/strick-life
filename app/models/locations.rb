class Location < ActiveRecord::Base
  has_many(
  :posts,
  class_name: "Post",
  primary_key: :id,
  foreign_key: :post_id
  )

  belongs_to :user
  has_many :tags, through: :taggings, source: :taggable, source_type: "Tag"
  has_many :friends, through: :taggings, source: :taggable, source_type: "Friend"
end
