class Tagging < ActiveRecord::Base
  belongs_to :taggable, polymorphic: true

  belongs_to(
    :post,
    class_name: "Post",
    primary_key: :id,
    foreign_key: :post_id
  )
end
