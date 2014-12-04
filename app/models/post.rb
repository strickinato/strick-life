class Post < ActiveRecord::Base

  has_many(
    :taggings,
    class_name: "Tagging",
    primary_key: :id,
    foreign_key: :post_id
    )

  belongs_to :location

  belongs_to :user
  has_many :tags, through: :taggings, source: :taggable, source_type: "Tag"
  has_many :friends, through: :taggings, source: :taggable, source_type: "Friend"

  # def self.tagged_with(name)
  #   Tag.find_by_name!(name).posts
  # end

  def all_tags=(names)
    self.tags = names.split(",").map do |name|
      Tag.where(name: name.strip).first_or_create!
    end
  end

  def all_tags
    self.tags.map(&:name).join(", ")
  end

  def set_location=(params)
    Location.where(address: params[:address]).first_or_create! do |location|
      location.place_id = params[:place_id]
      location.latitude = params[:latitude]
      location.longitude = params[:longitude]
    end
  end
end
